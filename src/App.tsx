import React, {useState} from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider} from "./auth/authContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Post} from "./types/types-post.ts";


const App: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (newPost: Omit<Post, 'id'>) => {
        const newPostWithId = {...newPost, id: posts.length + 1};
        setPosts([...posts, newPostWithId]);
    };
     return (
        <AuthProvider>
        <Router>
            <AppRoutes posts={posts} addPost={addPost} />
        </Router>
        </AuthProvider>
);
};

export default App
