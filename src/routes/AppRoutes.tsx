import React from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import {useAuth} from '../auth/authContext';
import HomePage from '../pages/HomePage';
import PostDetail from '../pages/Post-pages/postDetail';
import LoginPage from '../pages/LoginPage';
import CreatePost from '../pages/Post-pages/createPost';
import EditPost from '../pages/Post-pages/editPost';
import AdminPage from '../pages/professors-pages/Admin-page';


const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({children, role}) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/login"/>
    }

    if (role && user.role !== role) {
        return <Navigate to="/"/>
    }

    return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/posts/:id" element={<PostDetail/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
                path="/create"
                element={
                    <ProtectedRoute role="professor">
                        <CreatePost/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <ProtectedRoute role="professor">
                        <EditPost/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="professor">
                        <AdminPage/>
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

export default AppRoutes