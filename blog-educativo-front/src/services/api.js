import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',  // Altere para a URL do seu back-end
});

export const getPosts = () => api.get('/posts');
export const createPost = (post) => api.post('/posts', post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;
