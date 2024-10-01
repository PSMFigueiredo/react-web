import React, {useEffect, useState} from "react";
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider} from "./Context/authContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Post} from "./types/types-post.ts";
import Header from "./components/Header/Header.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import Footer from "./components/Footer/footer.tsx";
//import { createProfessor, login } from "./services/api.tsx";
import { ProfessorProvider } from "./Context/professorContext.tsx";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

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
        
        <Router>
            <AuthProvider>
                <ProfessorProvider>
                    <div className="app-container">
                    <Header/>
                    <MainContent>
                        <AppRoutes posts={posts} setPosts={setPosts} addPost={addPost}/>
                    </MainContent>
                    </div>
            </ProfessorProvider>
            </AuthProvider>
        </Router>

);
};

export default App
