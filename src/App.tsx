import React, {useEffect, useState} from "react";
import {AuthProvider} from "./auth/authContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Post} from "./types/types-post.ts";
import Header from "./components/Header/Header.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import Footer from "./components/Footer/footer.tsx";
import {BrowserRouter} from "react-router-dom";

import { createProfessor, login } from "./services/api.tsx";

const App: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    // useEffect(() => {
        // const loginData = {
        //     email: "criar2@gmail.com",
        //     password: "123456"
        // };

    //     login(loginData);
    // }, []);

    const addPost = (newPost: Omit<Post, 'id'>) => {
        const newPostWithId = {...newPost, id: posts.length + 1};
        setPosts([...posts, newPostWithId]);
    };
    return (
        <AuthProvider>
            <BrowserRouter>
            <div className="app-container">
                <Header/>
                    <MainContent>
                        <AppRoutes />
                    </MainContent>
                <Footer/>
            </div>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App
