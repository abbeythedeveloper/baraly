import { useState } from "react";
import TwoFactorInput from "../components/Auth/TwoFactorInput";
import { verifyTOTP } from "../Services/totp.service";
import { useAuth } from "../contexts/authContext/UseAuth";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Verify2FA = () => {
    const [code, setCode] = useState("");
    const [trustDevice, setTrustDevice] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleVerify = async () => {

        try {

            const snap = await getDoc(doc(db, "users", currentUser.uid));

            if (!currentUser) {
                toast.error("User not Loaded yet.")
            }

            if (!snap.exists()) {
                toast.error("User record not found.");
                return;
            }

            const data = snap.data();

            if (!data?.twoFactorSecret) {
                toast.error("2FA not configured for this user.");
                return;
            }

            if (!code || code.length !== 6) {
                toast.error("Enter the 6-digit code.");
                return;
            }

            const valid = verifyTOTP(code, data.twoFactorSecret);

            if (!valid) {
                toast.error("Invalid or Expired code");
                return;
            }

            sessionStorage.setItem("2fa_verified", "true");

            navigate("/app/dashboard");

        } catch (err) {
            console.error(err);
            toast.error("Verification failed.");
        }

    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[448px] bg-white rounded-2xl shadow-lg p-8">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-emerald-600">
                        BARALY
                    </h1>
                </div>

                {/* Shield Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-2xl">🛡️</span>
                    </div>
                </div>

                <h2 className="text-center text-xl font-semibold mb-2">
                    Two-Factor Authentication
                </h2>

                <p className="text-center text-sm text-gray-500 mb-6">
                    Enter the 6-digit code from your authenticator app
                </p>

                <TwoFactorInput value={code} onChange={setCode} />

                {/* Trust Device */}
                <div className="flex items-center mt-6 gap-2">
                    <input
                        type="checkbox"
                        checked={trustDevice}
                        onChange={() => setTrustDevice(!trustDevice)}
                        className="w-4 h-4 accent-emerald-600"
                    />
                    <label className="text-sm text-gray-600">
                        Trust this device for 30 days
                    </label>
                </div>

                {/* Button */}
                <button
                    onClick={handleVerify}
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
                    Verify Code
                </button>

                {/* Trouble */}
                <div className="mt-4 text-center">
                    <button className="text-sm text-emerald-600 hover:underline">
                        Having trouble?
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-xs text-gray-400 text-center">
                    Protected by enterprise-grade security
                </div>
            </div>
        </div>
    );
};

export default Verify2FA;