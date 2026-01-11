import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/UseAuth";

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return null; // or spinner
    }

    if (!currentUser) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
