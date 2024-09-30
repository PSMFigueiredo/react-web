import axios from 'axios';


const url = 'https://ftwznzgyxsjakblzabqk.supabase.co';
const supaBaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0d3puemd5eHNqYWtibHphYnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3MzA2NjQsImV4cCI6MjA0MzMwNjY2NH0.DWNuZh3A_oQBlAWOwk_ezfHEV4c-urGjS-gMdeu3VsI`;
const token = 'some-token';

const api = axios.create({
    baseURL: url,  // Altere para a URL do seu back-end
});

const postURL = `/rest/v1/post`;

export const userLogin = async (body: object) => {
    try {
        const response = await api.post('/auth/v1/token?grant_type=password', body, {
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


