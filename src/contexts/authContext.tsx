import React, { createContext, useContext, useState } from "react";
import { userLoginApi } from "../services/api.tsx";
import {verify} from "jsonwebtoken";


interface RefreshToken {
    createdAt: string;
    expiresIn: number;
    id: string;
    userId: string;
}

interface Auth {
    token: string;
    refreshToken: RefreshToken;
}

interface RefreshedToken {
    token: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    auth: Auth | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const authSample = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc2MzYzNjEsImV4cCI6MTc0NTYzNjM2MSwic3ViIjoiZjdiOWI1MmQtNDhjZC00MTk4LTk3OGYtMWJiMDZiNzliZTI2In0.BaHaHgY9fUcNCgjffiM7AU48mKCDHnPpRkyBu8QniPc",
    refreshToken: {
      id: "39c9da3a-f311-4a24-8a59-35ddd0b2111a",
      userId: "f7b9b52d-48cd-4198-978f-1bb06b79be26",
      expiresIn: 1727639961,
      createdAt: "2024-09-29T18:59:21.789Z"
    }
}


export const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('\'useAuth deve ser usado dentro de um AuthProvider\'')
    } return context;
};

// Crie o componente AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(authSample);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [tokenActive, setTokenActive] = useState<boolean>(true);
    
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
            verify(auth.token, import.meta.env.VITE_JWT_KEY, (err,)=> {
                if(err) {
                    setTokenActive(false);
                }
            })

        }
    });

    React.useEffect(() => {
        const tokenRefresh = async (refreshTokenId: string) => {
            await userLoginApi({ refreshTokenId }).then((res) => {
                if (res) {
                    const tokenResponse: RefreshedToken = {
                        token: res.data.token,
                    }
                    if(auth){
                        auth.token = tokenResponse.token;
                    }
                    setAuth(auth);
                    setIsAuthenticated(true);
                    setTokenActive(true);
                }else{
                    logout();
                }
            });
        };
    }, [auth, tokenActive]);

    const login = async (email: string, password: string) => {
        await userLoginApi({ email, password }).then((res) => {
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

            }
        });
    }

    const logout = () => {
        setAuth(null);
        setIsAuthenticated(false);
        setTokenActive(false);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

