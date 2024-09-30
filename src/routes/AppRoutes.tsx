import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAuth} from '../auth/authContext';
import PostDetail from '../pages/Post/postDetail';
import LoginPage from '../pages/LoginPage';
import CreatePost from '../pages/professors/createPost.tsx';
import EditPost from '../pages/professors/editPost.tsx';
import PrincipalPage from '../pages/PrincipalPage.tsx';
import {Post} from '../types/types-post';

interface AppRoutesProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (newPost: Omit<Post, 'id'>) => void;
}

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
const AppRoutes: React.FC<AppRoutesProps> = ({posts, setPosts, addPost}) => {
    const {user} = useAuth();
    return (
        <Routes>
            <Route path="/" element={<PrincipalPage/>}/>
            <Route path="/posts/:id" element={<PostDetail posts={posts} canEdit={user?.role === `professor`}/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
                path="/create"
                element={
                    <ProtectedRoute role="professor">
                        <CreatePost addPost={addPost}/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <ProtectedRoute role="professor">
                        <EditPost posts={posts} setPosts={setPosts}/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="professor">
                        <PrincipalPage/>
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

export default AppRoutes