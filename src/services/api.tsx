import axios from 'axios';


const url = 'http://localhost:3000/';
const api = axios.create({
    baseURL: url,  // Altere para a URL do seu back-end
});

export const getProfessorByUserApi = async (id: string, token: string) => {
    try {
        const response = await api.get(`Users/Professor/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const userLoginApi = async (body: object) => {
    try {
        const response = await api.post('users/login', body);
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};