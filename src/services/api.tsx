import axios from 'axios';

const url = 'http://localhost:3000/';

const api = axios.create({
    baseURL: url,  // Altere para a URL do seu back-end
});

//PROFESSORS
export const createProfessorApi = async (body: object) => {
    try {
        const response = await api.post('professors', body);
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const updateProfessorApi = async (id: string, body: object, token: string) => {
    try {
        const response = await api.put(`professors/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const getProfessorApi = async (id: string, token: string) => {
    try {
        const response = await api.post(`professors/${id}`, {
            headers: {
                'apiKey': supaBaseKey,
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status == 200)
            localStorage.setItem(`token`, response.data.access_token);
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const getPosts = async () => {
    try {
        const response = await api.get(postURL, {
            headers: {
                'apiKey': supaBaseKey,
                'Authorization': `Bearer ${localStorage.getItem(`token`)}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

//STUDENTS
export const createStudentApi = async (body: object) => {
    try {
        const response = await api.post('professors', body);
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const updateStudentApi = async (id: string, body: object, token: string) => {
    try {
        const response = await api.put(`students/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const getStudentApi = async (id: string, token: string) => {
    try {
        const response = await api.post(`students/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

//USERS
export const userLoginApi = async (body: object) => {
    try {
        const response = await api.post('users/login', body);
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const refreshTokenApi = async (body: object) => {
    try {
        const response = await api.post('users/regresh-token', body);
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

//CLASSES
export const createClassApi = async (body: object, token: string) => {
    try {
        const response = await api.post('classes', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const updateClassApi = async (id: string, body: object, token: string) => {
    try {
        const response = await api.put(`classes/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const getClassApi = async (id: string, token: string) => {
    try {
        const response = await api.get(`classes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

//POSTS
export const createPostApi = async (body: object, token: string) => {
    try {
        const response = await api.post('posts', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const updatePostApi = async (id: string, body: object, token: string) => {
    try {
        const response = await api.put(`posts/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const getPostApi = async (id: string, token: string) => {
    try {
        const response = await api.get(`posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const getPostsApi = async (token: string) => {
    try {
        const response = await api.get('posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const deletePostApi = async (id: string, token: string) => {
    try {
        const response = await api.delete(`posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};