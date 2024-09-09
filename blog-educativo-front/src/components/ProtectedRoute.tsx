import React, {ReactNode} from "react";
import {useAuth} from "../auth/authContent.tsx";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return<Navigate to="/login" />;
    }

    return <>children</>;
};

export default ProtectedRoute;