import React, {createContext, useContext, useState} from "react";


interface User {
    id: number;
    name: string;
    role: string;
    username: string;
    password: string;
}

export interface AuthContextType{
    user: Omit<User, 'password'> | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("'useAuth' deve ser usado dentro de um 'AuthProvider'")
    }
    return context;
};

// Crie o componente AuthProvider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

    const users: User[] = [
        {
            id: 1,
            name: 'Professor João',
            role: 'professor',
            username: 'professor',
            password: 'senha123',
        },
        {
            id: 2,
            name: 'Aluno Maria',
            role: 'aluno',
            username: 'aluno',
            password: 'senha456',
        },
    ];

    const login = (username: string, password: string): boolean => {
        // Implemente sua lógica de autenticação aqui
        const authenticatedUser= users.find(
        (user) => user.username === username && user.password === password
        );
        if (authenticatedUser) {
            const {password, ...userWithoutPassword} = authenticatedUser;
            setUser(userWithoutPassword);
            return true;
        } else {
            return false;
        }
    }

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider