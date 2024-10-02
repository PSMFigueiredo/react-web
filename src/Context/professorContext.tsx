import React, {createContext, useContext, useState} from "react";
import {getUserById} from "../services/api.tsx";

interface Professor {
    id: string,
    user: User,
    role:string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export interface ProfContextType {
    professor: Professor | null;
    getProfessorByUser: (id: string, token: string) => Promise<Professor>;
}

export const ProfessorContext = createContext<ProfContextType | undefined>({} as ProfContextType);
export const useProf = (): ProfContextType => {
    const context = useContext(ProfessorContext);
    if (!context) {
        throw new Error('\'useProf deve ser usado dentro de um AuthProvider\'')
    } return context;
};

// Crie o componente AuthProvider
export const ProfessorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [professor, setProfessor] = useState<Professor | null>(null);

    const getProfessorByUser = async (id: string, token: string) => {
        return getUserById(id, token).then((res) => {
            console.log(res)
            if (res && res.data) {
                const retorno = res.data;

                if(retorno.role === 'PROFESSOR') {
                    const response: Professor = {
                        id: id,
                        user: {
                            id: res.data.id,
                            name: res.data.name,
                            email: res.data.email
                        },
                        role: 'professor',
                    }
                    setProfessor(response);
                    return response;
                } else {
                    const response: Professor = {
                        id: id,
                        user: {
                            id: res.data.id,
                            name: res.data.name,
                            email: res.data.email
                        },
                        role: 'aluno',
                    }
                    setProfessor(response);
                    return response;
                }

            }
        });
    }

    return (
        <ProfessorContext.Provider value={{ professor, getProfessorByUser }}>
            {children}
        </ProfessorContext.Provider>
    );
};

