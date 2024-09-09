import React, {Fragment, useState} from 'react'
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import SearchBar from "./components/searchBar.tsx";
import PostList from "./components/postList.tsx";
import PostDetail from "./components/post/postDetail.tsx";
import CreatePost from "./components/post/createPost.tsx";
import EditPost from "./components/post/editPost.tsx";
import {Post} from "./types/types-post.ts";
import AdminPage from "./components/Admin-page.tsx";
import {AuthProvider} from "./auth/authContent.tsx";
import LoginPage from "./auth/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";



const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [posts, setPosts] = useState<Post []>([
        {id: 1, title: 'Testando react', author: 'Priscyla', description: 'Testando frontend, sera que vai dar bom', content: 'Aqui ficaria o conteudo completo da postagem'},
        {id: 2, title: 'Vite Setup', author: 'Jane Smith', description: 'How to set up a React project with Vite.', content: 'This is the full content of the React Hooks post.'},
        {id: 3, title: 'Functional Components', author: 'James Bond', description: 'Using functional components in React.', content: 'This is the full content of the Vite Setup post.'},
        {id: 4, title: 'React Hooks', author: 'John Doe', description: 'A deep dive into React hooks.', content: 'This is the full content of the React Hooks post.' },
    ]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addPost = (newPost: Omit<Post, 'id'>) => {
        const newPostWithId = {...newPost, id: posts.length +1};
        setPosts([...posts, newPostWithId]);
    };


    const updatePost = (updatedPost: Post) => {
        setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    };

    const deletePost = (postId: number) => {
        setPosts(posts.filter(post => post.id !== postId))
    }

    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <h1>Post List</h1>
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                            <PostList posts={filteredPosts}/>
                            <Link to="/create">Criar Novo Post</Link>
                            <Link to="/admin">Admin Page</Link>
                            <Link to="/login">Login</Link>
                        </>
                    }
                    />
                <Route path="/posts/:id" element={<PostDetail posts={posts}/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/create"
                       element={
                    <ProtectedRoute>
                        <CreatePost addPost={addPost} />
                    </ProtectedRoute>
                       }
                       />
                <Route path="/edit/:id" element={
                    <ProtectedRoute>
                    <EditPost posts={posts} updatePost={updatePost}/>
                    </ProtectedRoute>
                    }/>
                <Route path="/admin" element={
                    <ProtectedRoute>
                    <AdminPage posts={posts} deletePost={deletePost}/>
                    </ProtectedRoute>
                    }/>
            </Routes>
        </Router>
        </AuthProvider>
);
};

export default App
