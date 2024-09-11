import React from "react";
import {useAuth} from "../auth/authContext.tsx";
import {Link, Route, Routes} from "react-router-dom";
import PostDetail from "../pages/postDetail.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import ProtectedRoute from "../pages/ProtectedRoute.tsx";
import CreatePost from "../pages/createPost.tsx";
import EditPost from "../pages/editPost.tsx";
import AdminPage from "../pages/Admin-page.tsx";
import PostList from "../pages/postList.tsx";
import {Post} from "../types/types-post.ts";

interface AppRoutesProps {
    posts: Post[];
    addPost: (post: Omit<Post, 'id'>) => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ posts}) => {
    const {isAuthenticated, logout} = useAuth();

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/create">Criar novo Post</Link>
                <Link to="/admin">Pagina Admin</Link>
                {!isAuthenticated ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}
            </nav>


            <Routes>
                <Route path="/" element={<PostList posts={posts}/>}/>
                <Route path="/posts/:id" element={<PostDetail posts={posts}/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/create" element={
                    <ProtectedRoute>
                        <CreatePost addPost={function(): void {
                            throw new Error("Function not implemented.");
                        } }/>
                    </ProtectedRoute>
                }/>
                <Route path="/edit/:id" element={
                    <ProtectedRoute>
                        <EditPost posts={[]} updatePost={function(): void {
                            throw new Error("Function not implemented.");
                        } }/>
                    </ProtectedRoute>
                }/>
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminPage posts={[]} deletePost={function(id: number): void {
                            throw new Error("Function not implemented.");
                        } }/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </>
    );
};

export default AppRoutes