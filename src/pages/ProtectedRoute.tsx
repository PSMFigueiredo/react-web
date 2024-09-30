
import {useAuth} from "../Context/authContext.tsx";
import {Navigate} from "react-router-dom";
import {ProtectedRouteProps} from "../types/ProtectedRoutesProps.ts";



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return<Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;