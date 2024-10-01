import React, { createContext, useContext, useState } from "react";
import { getProfessorByUserApi } from "../services/api.tsx";
import { AxiosResponse } from "axios";

interface Professor{
    id: string,
    professorNumber: number,
    user:{
        id: string,
        name: string,
        email: string
    }
}

export interface ProfContextType {
    Professor: Professor | null;
    getProfessor: (id:string, token: string) => void;
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
    const [Professor, setProfessor] = useState<Professor | null>(null);

    const getProfessor = async (id: string, token: string) => {
        await getProfessorByUserApi(id, token).then((res: AxiosResponse<any, any>) => {
            if (res) {
                const response: Professor = {
                    id: res.data.id,
                    professorNumber: res.data.professorNumber,
                    user: {
                        id: res.data.user.id,
                        name: res.data.user.name,
                        email: res.data.user.email
                    }
                }
                setProfessor(response);
            }
        });
    }

    return (
        <ProfessorContext.Provider value={{ Professor, getProfessor }}>
            {children}
        </ProfessorContext.Provider>
    );
};

