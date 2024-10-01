import { User } from "./User";

export interface Professor {
    id: string,
    professorNumber: number,
    user: User
}

export interface ProfessorReduced {
    id: string;
    professorNumber: number;
}