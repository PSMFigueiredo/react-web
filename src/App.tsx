import React, {useEffect, useState} from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider} from "./contexts/authContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Post} from "./types/types-post.ts";
import Header from "./components/Header/Header.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import {BrowserRouter} from "react-router-dom";


const App: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(JSON.parse(localStorage.getItem(`posts`) ?? `[]`));

    const addPost = (newPost: Omit<Post, 'id'>) => {
        const newPostWithId = {...newPost, id: posts.length + 1};
        setPosts([...posts, newPostWithId]);
        const parse: Post[] = JSON.parse(localStorage.getItem(`posts`) ?? `[]`);
        parse.push(newPostWithId);
        localStorage.setItem(`posts`, JSON.stringify(parse))
    };
    return (
        <AuthProvider>
            <BrowserRouter>
            <div className="app-container">
                <Header/>
                    <MainContent>
                        <AppRoutes posts={posts} setPosts={setPosts} addPost={addPost}/>
                    </MainContent>
            </div>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App
