import React, {createContext, useContext, useState} from "react";
import {userLoginApi} from "../services/api.tsx";
import {jwtDecode} from "jwt-decode";
import {Auth} from "../types/Token.ts";

export interface AuthContextType {
    isAuthenticated: boolean;
    auth: Auth | null;
    login: (email: string, password: string) => Promise<Auth>;
    logout: () => void;
}



// const authSample = {
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc2MzYzNjEsImV4cCI6MTc0NTYzNjM2MSwic3ViIjoiZjdiOWI1MmQtNDhjZC00MTk4LTk3OGYtMWJiMDZiNzliZTI2In0.BaHaHgY9fUcNCgjffiM7AU48mKCDHnPpRkyBu8QniPc",
//     refreshToken: {
//       id: "39c9da3a-f311-4a24-8a59-35ddd0b2111a",
//       userId: "f7b9b52d-48cd-4198-978f-1bb06b79be26",
//       expiresIn: 1727639961,
//       createdAt: "2024-09-29T18:59:21.789Z"
//     }
// }


export const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('\'useAuth deve ser usado dentro de um AuthProvider\'')
    } return context;
};

// Crie o componente AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    
    React.useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    React.useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data) {
            setAuth(JSON.parse(data));
        }
    }, []);

  

    React.useEffect(() => {
        if(auth){
            if (isTokenExpired(auth.token)) {
                setIsAuthenticated(false);
            }
        }
    }, [auth]);

    const isTokenExpired = (token: string) => {
        if (!token) return true;
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if(decodedToken.exp){
              return decodedToken.exp < currentTime;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      };



    const login = async (email: string, password: string) => {
        return userLoginApi({ email, password }).then((res) => {
            if (res) {
                const authResponse: Auth = {
                    token: res.data.token,
                    refreshToken: {
                        createdAt: res.data.refreshToken.createdAt,
                        expiresIn: res.data.refreshToken.expiresIn,
                        id: res.data.refreshToken.id,
                        userId: res.data.refreshToken.userId
                    }

                }
                setAuth(authResponse);
                setIsAuthenticated(true);
                return authResponse;
            }
        });
    }

    const logout = () => {
        setAuth(null);
        setIsAuthenticated(false);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

