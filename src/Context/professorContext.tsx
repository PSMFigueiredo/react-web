import React, { createContext, useContext, useState } from "react";
import { getProfessorByUserApi } from "../services/api.tsx";
import { AxiosResponse } from "axios";

interface Professor {
    id: string,
    professorNumber: number,
    user: User
}

interface User {
    id: string;
    name: string;
    email: string;
}

export interface ProfContextType {
    professor: Professor | null;
    getProfessorByUser: (id: string, token: string) => void;
}

export const ProfessorContext = createContext<ProfContextType | undefined>({} as ProfContextType);
export const useProf = (): ProfContextType => {
    const context = useContext(ProfessorContext);
    if (!context) {
        throw new Error('\'useAuth deve ser usado dentro de um AuthProvider\'')
    } return context;
};

// Crie o componente AuthProvider
export const ProfessorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [professor, setProfessor] = useState<Professor | null>(null);

    const getProfessorByUser = async (id: string, token: string) => {
        await getProfessorByUserApi(id, token).then((res) => {
            if (res) {
                const response: Professor = {
                    id: res.data.professor.id,
                    professorNumber: res.data.professor.professorNumber,
                    user: {
                        id: res.data.professor.user.id,
                        name: res.data.professor.user.name,
                        email: res.data.professor.user.email
                    }
                }
                setProfessor(response);
            }
        });
    }

    return (
        <ProfessorContext.Provider value={{ professor, getProfessorByUser }}>
            {children}
        </ProfessorContext.Provider>
    );
};

