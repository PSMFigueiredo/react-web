import React, {createContext, ReactNode, useContext, useState} from "react";
import {AuthContextType} from "../types/AuthContextType.ts";


interface User {
    id: number;
    name: string;
    role: string;
}
export interface AuthContextType{
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('\'useAuth deve ser usado dentro de um AuthProvider\'')
    } return context;
};

// Crie o componente AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string): boolean => {
        // Implemente sua lógica de autenticação aqui
        // Para demonstração, vamos aceitar qualquer username/password
        const authenticatedUser: User = {
            id: 1,
            name: username,
            role: 'professor', // ou 'aluno', baseado na sua lógica
        };
        setUser(authenticatedUser);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};