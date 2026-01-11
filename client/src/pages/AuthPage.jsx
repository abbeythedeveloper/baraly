// pages/AuthPage.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignupPage.jsx";
import EmployeeLoginPage from "./EmployeeLoginPage.jsx";

const AuthPage = () => {
    return (
        <div className="min-h-screen w-full">
            <Routes>
                {/* <Route index element={<Navigate to="/auth/login" replace />} /> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin" element={<EmployeeLoginPage />} />
            </Routes>
        </div>
    );
};

export default AuthPage;
