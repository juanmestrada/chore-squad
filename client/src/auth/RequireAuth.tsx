import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();
    
    return (
        user
            ? <Outlet />
            : <Navigate to="/choresquad/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;