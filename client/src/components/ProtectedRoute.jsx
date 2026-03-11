import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/UseAuth";

const ProtectedRoute = ({ children }) => {

    const { currentUser, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!currentUser) {
        return <Navigate to="/auth/login" replace />;
    }

    const twoFactorVerified = sessionStorage.getItem("2fa_verified");

    if (!twoFactorVerified) {
        return <Navigate to="/auth/2fa" replace />;
    }

    return children;
};

export default ProtectedRoute;