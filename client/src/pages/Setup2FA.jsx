import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { generateTOTP, verifyTOTP } from "../Services/totp.service";
import TwoFactorInput from "../components/Auth/TwoFactorInput";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/authContext/UseAuth";

const Setup2FA = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [qr, setQr] = useState(null);
    const [secret, setSecret] = useState(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const check2FA = async () => {
            try {
                const snap = await getDoc(doc(db, "users", currentUser.uid));
                const data = snap.data();

                if (data?.twoFactorEnabled) {
                    sessionStorage.setItem("2fa_verified", "true");
                    navigate("/app/dashboard");
                    return;
                }

                const { secret, qr } = await generateTOTP(currentUser.email);
                setSecret(secret);
                setQr(qr);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load 2FA setup");
            } finally {
                setChecking(false);
            }
        };

        check2FA();
    }, [currentUser, navigate]);

    const handleConfirm = async () => {
        if (!secret) return;
        setLoading(true);

        const valid = verifyTOTP(code, secret);

        if (!valid) {
            toast.error("Invalid authentication code");
            setLoading(false);
            return;
        }

        try {
            await updateDoc(doc(db, "users", currentUser.uid), {
                twoFactorEnabled: true,
                twoFactorSecret: secret,
            });

            sessionStorage.setItem("2fa_verified", "true");
            toast.success("Two-factor authentication enabled");
            navigate("/app/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to enable 2FA");
        } finally {
            setLoading(false);
        }
    };

    if (checking) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[448px] bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-emerald-600">BARALY</h1>
                </div>
                <h2 className="text-center text-xl font-semibold mb-2">
                    Set Up Two-Factor Authentication
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Scan this QR code using Google Authenticator
                </p>
                {qr && (
                    <div className="flex justify-center mb-6">
                        <img src={qr} alt="2FA QR Code" className="w-40 h-40" />
                    </div>
                )}
                <p className="text-center text-sm text-gray-500 mb-4">
                    Enter the 6-digit code from your authenticator
                </p>
                <TwoFactorInput value={code} onChange={setCode} />
                <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition"
                >
                    {loading ? "Verifying..." : "Confirm & Enable"}
                </button>
            </div>
        </div>
    );
};

export default Setup2FA;