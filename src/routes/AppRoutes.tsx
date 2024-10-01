import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import HomePage from '../pages/HomePage';
import PostDetail from '../pages/Post-pages/postDetail';
import LoginPage from '../pages/LoginPage';
import CreatePost from '../pages/Post-pages/createPost';
import EditPost from '../pages/Post-pages/editPost';
import AdminPage from '../pages/professors-pages/Admin-page';
import { useProf } from '../Context/professorContext';
import PostList from '../pages/Post-pages/postList';



const ProtectedRoute: React.FC<{ children: JSX.Element; role?: string }> = ({ children, role }) => {
    const { isAuthenticated } = useAuth();
    const { professor } = useProf();

    if (!isAuthenticated) {
        <Navigate to="/login" />
    }
    console.log(professor);
    if(role == 'professor' && !professor){
        <Navigate to="/" />
    }

    return children;

};

const AppRoutes: React.FC = () => {
    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/list" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/post/create"
                element={
                    <ProtectedRoute role="professor">
                        <CreatePost />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/post/edit/:id"
                element={
                    <ProtectedRoute role="professor">
                        <EditPost />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/post/admin"
                element={
                    <ProtectedRoute role="professor">
                        <AdminPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    );
};

export default AppRoutes