import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const RedirectUser = () => {
    const { user } = useAuth();
    const location = useLocation();
    
    return (
        !user
            ? <Outlet />
            : <Navigate to="/chore-squad/map" state={{ from: location }} replace />
    );
}

export default RedirectUser;