import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import HomePage from '../pages/HomePage';
import PostDetail from '../pages/Post-pages/postDetail';
import LoginPage from '../pages/LoginPage';
import CreatePost from '../pages/Post-pages/createPost';
import EditPost from '../pages/Post-pages/editPost';
import AdminPage from '../pages/professors-pages/Admin-page';
import PostList from '../pages/Post-pages/postList';

interface AppRoutesProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (newPost: Omit<Post, 'id'>) => void;
}

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({children, role}) => {
    const {user} = useAuth();

const ProtectedRoute: React.FC<{children: JSX.Element; role?: string}> = ({children, role}) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/" />
    }

    if (role && user.role !== role) {
        return <Navigate to="/"/>
    }

    return <>{children}</>;
};
const AppRoutes: React.FC<AppRoutesProps> = ({posts, setPosts, addPost}) => {
    const {user} = useAuth();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/posts/create"
                    element={
                        <ProtectedRoute role="professor">
                            <CreatePost />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/posts/edit"
                    element={
                        <ProtectedRoute role="professor">
                            <EditPost />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="professor">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/posts"
                    element={
                            <PostList />
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes