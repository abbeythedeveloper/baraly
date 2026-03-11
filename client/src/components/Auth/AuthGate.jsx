import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/UseAuth";

export default function AuthGate({ children }) {

    const { currentUser, emailVerified } = useAuth();

    if (!currentUser)
        return <Navigate to="/auth/login" />;

    if (!emailVerified)
        return <Navigate to="/auth/verify-email" />;

    return children;
}