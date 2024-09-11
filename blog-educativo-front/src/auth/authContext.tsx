import React, {createContext, ReactNode, useContext, useState} from "react";
import {AuthContextType} from "../types/AuthContextType.ts";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export  const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const fakeUser = {
        username: 'teacher',
        password: 'password123',
    };


    const login = (username: string, password: string): boolean => {
        if (username === fakeUser.username && password === fakeUser.password){
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
