import React, {useState} from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider} from "./auth/authContext.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Post} from "./types/types-post.ts";
import Header from "./components/Header/Header.tsx";
import MainContent from "./components/MainContent/MainContent.tsx";
import Footer from "./components/Footer/footer.tsx";


const App: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (newPost: Omit<Post, 'id'>) => {
        const newPostWithId = {...newPost, id: posts.length + 1};
        setPosts([...posts, newPostWithId]);
    };
     return (
         <div className="app-container">
             <Header />
             <div>
             <MainContent>
        <AuthProvider>
            <AppRoutes posts={posts} addPost={addPost} />
        </AuthProvider>
             </MainContent>
             </div>
             <Footer />
    </div>
);
};

export default App
