import axios from 'axios';


const url = 'http://localhost:3000/';
const token = 'some-token';

const api = axios.create({
    baseURL: url,  // Altere para a URL do seu back-end
});

export const createProfessor = async (body: object) => {
    console.log(body);
    try {
        const response = await api.post('professors', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

export const userLogin = async (body: object) => {
    try {
        const response = await api.post('users/login', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Ocorreu um erro:", error);
    }
};

// const login = async () => {
//     try {
//         const response = await axios.post('users/login', {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         console.log(response.data);
//     } catch (error) {
//         console.log("Ocorreu um erro:", error);
//     }
// };

// export const login = (body) => api.post('/users/login', body);

// export const getPosts = () => api.get('/posts');
// export const createPost = (post) => api.post('/posts', post);
// export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
// export const deletePost = (id) => api.delete(`/posts/${id}`);

