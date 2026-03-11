import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { generateTOTP, verifyTOTP } from "../Services/totp.service";
import TwoFactorInput from "../components/Auth/TwoFactorInput";
import toast from "react-hot-toast";

const Setup2FA = () => {

    const navigate = useNavigate();

    const [qr, setQr] = useState(null);
    const [secret, setSecret] = useState(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const check2FA = async () => {

            const snap = await getDoc(doc(db, "users", currentUser.uid));
            const data = snap.data();

            if (data?.twoFactorEnabled) {
                navigate("/auth/2fa");
                return;
            }

            // Only generate secret if user has none
            if (!data?.twoFactorSecret) {

                const { secret, qr } = await generateTOTP(currentUser.email);

                setSecret(secret);
                setQr(qr);

            }

        };

        check2FA();

    }, []);

    useEffect(() => {

        const setup = async () => {

            const email = auth.currentUser?.email;

            const { secret, qr } = await generateTOTP(email);

            setSecret(secret);
            setQr(qr);

        };

        setup();

    }, []);

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

            const uid = auth.currentUser.uid;

            await updateDoc(doc(db, "users", uid), {
                twoFactorEnabled: true,
                twoFactorSecret: secret,
            });

            toast.success("Two-factor authentication enabled");

            navigate("/app/dashboard");

        } catch (error) {

            console.error(error);
            toast.error("Failed to enable 2FA");

        }

        setLoading(false);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-[448px] bg-white rounded-2xl shadow-lg p-8">

                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-emerald-600">
                        BARALY
                    </h1>
                </div>

                <h2 className="text-center text-xl font-semibold mb-2">
                    Set Up Two-Factor Authentication
                </h2>

                <p className="text-center text-sm text-gray-500 mb-6">
                    Scan this QR code using Google Authenticator
                </p>

                {qr && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={qr}
                            alt="2FA QR Code"
                            className="w-40 h-40"
                        />
                    </div>
                )}

                <p className="text-center text-sm text-gray-500 mb-4">
                    Enter the 6-digit code from your authenticator
                </p>

                <TwoFactorInput value={code} onChange={setCode} />

                <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="
                    mt-6 w-full
                    bg-emerald-600
                    hover:bg-emerald-700
                    text-white
                    font-medium
                    py-3
                    rounded-xl
                    transition
                    "
                >
                    {loading ? "Verifying..." : "Confirm & Enable"}
                </button>

            </div>

        </div>
    );
};

export default Setup2FA;