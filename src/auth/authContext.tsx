import React, { createContext, ReactNode, useContext, useState } from "react";
import { userLogin } from "../services/api.tsx";

import React, {createContext, useContext, useState} from "react";

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

export interface AuthContextType {
    isAuthenticated: boolean;
    auth: Auth | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("'useAuth' deve ser usado dentro de um 'AuthProvider'")
    }
    return context;
};

// Crie o componente AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        await userLogin({ email, password }).then((res) => {
            if (res) {
                const authResponse: Auth = {
                    token: res?.data.token,
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
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider