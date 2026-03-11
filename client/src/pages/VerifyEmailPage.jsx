import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { applyActionCode, sendEmailVerification } from "firebase/auth";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {

    const navigate = useNavigate();

    const [verifying, setVerifying] = useState(true);

    useEffect(() => {

        const verifyEmail = async () => {

            try {

                const params = new URLSearchParams(window.location.search);

                const mode = params.get("mode");
                const oobCode = params.get("oobCode");

                if (mode === "verifyEmail" && oobCode) {

                    await applyActionCode(auth, oobCode);

                    await auth.currentUser?.reload();

                    toast.success("Email verified successfully");

                    navigate("/auth/setup-2fa", { replace: true });

                }

            } catch (error) {

                if (error.code === "auth/invalid-action-code") {
                    console.warn("Verification code already used.");
                    navigate("/auth/setup-2fa", { replace: true });
                    return
                }

                toast.error("Email Verification Failed")

            } finally {

                setVerifying(false);

            }

        };

        verifyEmail();

    }, [navigate]);

    const resendEmail = async () => {

        try {

            await sendEmailVerification(auth.currentUser);

            toast.success("Verification email sent again.");

        } catch (error) {

            toast.error("Failed to resend email.");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#EFFFFC]">

            <div className="bg-white p-8 rounded-xl w-[420px] text-center space-y-4">

                <h1 className="text-xl font-semibold">
                    Verify your email
                </h1>

                {verifying ? (

                    <p className="text-gray-600 text-sm">
                        Verifying your email...
                    </p>

                ) : (

                    <p className="text-gray-600 text-sm">
                        Check your inbox and click the verification link.
                    </p>

                )}

                <button
                    onClick={resendEmail}
                    className="bg-[#13BF9E] text-white px-4 py-2 rounded-lg"
                >
                    Resend Email
                </button>

            </div>

        </div>

    );

};

export default VerifyEmailPage;