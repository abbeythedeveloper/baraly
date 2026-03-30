// src/pages/SignUpPage.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logo } from "../assets/assets.js";
import {
    doCreateUserWithEmailAndPassword,
    doSignInWithGoogle,
} from "../firebase/auth.js";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../contexts/authContext/UseAuth.jsx";
import toast from "react-hot-toast";
import { evaluatePassword } from "../utils/passwordStrength";
import PasswordStrengthBar from "../components/Auth/PasswordStrengthBar";

const SignUpPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === "/" || location.pathname === "/auth/login";

    // form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // UI state
    const [isRegistering, setIsRegistering] = useState(false);

    // ripple
    const [rippleX, setRippleX] = useState(0);
    const [rippleKey, setRippleKey] = useState(0);
    const containerRef = useRef(null);

    const handleRipple = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        const x = rect ? e.clientX - rect.left : 0;
        setRippleX(x);
        setRippleKey((prev) => prev + 1);
    };

    // Handle email/password registration
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering) return; // avoid duplicate submissions

        // basic validations
        if (!name.trim()) {
            toast.error("Please enter your full name.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        if (!agreedToTerms) {
            toast.error("Please agree to the Terms and Privacy Policy");
            return;
        }

        const { isValid } = evaluatePassword(password);

        if (!isValid) {
            toast.error(
                "Password must be at least 10 characters, include one uppercase letter and one special character."
            );
            return;
        }


        try {
            setIsRegistering(true);

            // IMPORTANT: pass the name as the third argument
            // doCreateUserWithEmailAndPassword(email, password, name)
            const userCred = await doCreateUserWithEmailAndPassword(
                email,
                password,
                name
            );

            await sendEmailVerification(userCred.user);
            navigate("/auth/verify-email", { replace: true });
        } catch (err) {
            console.error("Sign up error:", err);
            toast.error(err?.message || "Failed to create account. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    // Handle Google sign-in
const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (isRegistering) return;

    try {
        setIsRegistering(true);
        await doSignInWithGoogle();
        // no navigate here — page redirects to Google automatically
    } catch (err) {
        console.error("Google sign in error:", err);
        toast.error(err?.message || "Google sign-in failed. Please try again.");
        setIsRegistering(false);
    }
};

    // Already signed in -> redirect
    useEffect(() => {
        if (currentUser) {
            navigate("/app/dashboard", { replace: true });
        }
    }, [currentUser, navigate]);

    return (
        <div className="min-h-screen bg-[#EFFFFC] flex items-center justify-center px-2 py-5">
            <div className="w-full max-w-[448px] space-y-2.5">
                {/* Logo */}
                <div className="text-center space-y-2.5 mb-4">
                    <div className="flex justify-center mb-3">
                        <img src={logo} alt="Logo" className="w-16 h-16" />
                    </div>
                    <h1 className="text-xl tracking-normal font-bold text-black">Baraly Project Hub</h1>
                    <p className="text-md text-[#4A5565]">Manage your creative services with ease</p>
                </div>

                {/* Tab Switcher with Ripple */}
                <div ref={containerRef} className="relative bg-[#F4F4F5] h-[36px] p-1 rounded-full flex overflow-hidden">
                    <motion.div
                        className="absolute inset-1 w-1/2 bg-[#E4E4E74D] rounded-full shadow-sm"
                        initial={false}
                        animate={{ x: isLoginPage ? 0 : "calc(100% - 8px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />

                    <motion.div
                        key={rippleKey}
                        initial={{ opacity: 0.5, scale: 0 }}
                        animate={{ opacity: 0, scale: 3 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            left: rippleX - 100,
                            top: "50%",
                            transform: "translateX(-50%)",
                        }}
                        className="absolute w-[200px] h-[200px] bg-[#13BF9E]/30 rounded-full pointer-events-none z-5"
                    />

                    <Link
                        to="/auth/login"
                        onClick={(e) => handleRipple(e)}
                        className={`flex-1 text-center py-1.5 rounded-full text-[12px] font-medium z-10 transition-all ${isLoginPage ? "text-black" : "text-black/50 hover:text-black/70"
                            }`}
                    >
                        Login
                    </Link>

                    <Link
                        to="/auth/signup"
                        onClick={(e) => handleRipple(e)}
                        className={`flex-1 text-center py-1.5 rounded-full text-[12px] font-medium z-10 transition-all ${!isLoginPage ? "text-black" : "text-black/50 hover:text-black/70"
                            }`}
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-[20px] p-5 space-y-2.5">
                    <div className="space-y-1">
                        <h2 className="text-[16px] font-semibold text-black">Create your account</h2>
                        <p className="text-xs text-black/70">Sign up to get started with Baraly Project Hub</p>
                    </div>

                    {/* SIGN-UP FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-[12px] font-medium text-black mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-10 px-12 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[12px] font-medium text-black mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m2 7 10 7 10-7" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-10 pl-12 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-black mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] transition-all"
                                    required
                                    minLength="8"
                                />
                            </div>
                        </div>
                        <PasswordStrengthBar password={password} />

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-black mb-2">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] transition-all"
                                    required
                                    minLength="8"
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded cursor-pointer border-gray-300 focus:ring-2 focus:ring-[#87A29C]"
                            />
                            <label htmlFor="terms" className="text-[13px] text-black/70">
                                I agree to the{" "}
                                <a href="#" className="text-black font-medium hover:underline">Terms of Service</a>{" "}
                                and{" "}
                                <a href="#" className="text-black font-medium hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full h-12 bg-[#13BF9E] text-white rounded-lg font-semibold text-[15px] cursor-pointer hover:bg-[#27f1b1] transition-colors mt-6 disabled:opacity-60"
                        >
                            {isRegistering ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#E5E5E5]" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-[11px] text-black/40 tracking-wider">
                                OR CONTINUE WITH
                            </span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={onGoogleSignIn}
                        disabled={isRegistering}
                        className="w-full h-12 bg-white border cursor-pointer border-[#E5E5E5] rounded-lg font-medium text-[14px] text-black hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M19.8055 10.2292C19.8055 9.55156 19.7501 8.86719 19.6323 8.19531H10.2002V12.0492H15.6014C15.3734 13.2911 14.6571 14.3898 13.6177 15.0875V17.5867H16.8249C18.7175 15.8445 19.8055 13.2727 19.8055 10.2292Z" fill="#4285F4" />
                            <path d="M10.2002 20.0008C12.9515 20.0008 15.2708 19.1056 16.8295 17.5867L13.6223 15.0875C12.7362 15.6979 11.5865 16.0437 10.2047 16.0437C7.5463 16.0437 5.28947 14.2828 4.51763 11.9102H1.2168V14.4819C2.81531 17.6555 6.34277 20.0008 10.2002 20.0008Z" fill="#34A853" />
                            <path d="M4.51312 11.9102C4.06312 10.6683 4.06312 9.33547 4.51312 8.09359V5.52188H1.21762C-0.164062 8.16719 -0.164062 11.836 1.21762 14.4812L4.51312 11.9102Z" fill="#FBBC04" />
                            <path d="M10.2002 3.95781C11.6643 3.93594 13.0784 4.47188 14.1455 5.46875L17.0178 2.60156C15.1806 0.904687 12.7362 -0.0210938 10.2002 0.000781252C6.34277 0.000781252 2.81531 2.34609 1.2168 5.52187L4.51231 8.09359C5.27947 5.71484 7.5363 3.95781 10.2002 3.95781Z" fill="#EA4335" />
                        </svg>
                        {isRegistering ? "Please wait..." : "Sign up with Google"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
