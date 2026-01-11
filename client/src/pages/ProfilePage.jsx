// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext/UseAuth.jsx"; // adjust path if needed
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import AvatarCropper from "../components/AvatarCropper";
// import toast, { Toaster } from "react-hot-toast";
import { handleFirebaseError } from "../utils/firebaseErrorHandler.js";
import { toast } from "react-hot-toast";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "../components/Auth/PasswordStrengthBar";
import { evaluatePassword } from "../utils/passwordStrength";

export default function ProfilePage() {
    const { currentUser, loading } = useAuth();
    const [userDoc, setUserDoc] = useState(null);
    const [edit, setEdit] = useState({ name: "", brandName: "" });
    const [saving, setSaving] = useState(false);

    // security form
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwSaving, setPwSaving] = useState(false);

    const STATUS_BADGE_STYLES = {
        active:
            "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
        inactive:
            "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
        cancelled:
            "bg-gradient-to-r from-red-500 to-rose-600 text-white",
    };
    const PLAN_BADGE_STYLES = {
        starter:
            "bg-linear-to-r from-[#0F221F] to-[#13BF9E] text-white",
        presence:
            "bg-linear-to-r from-[#0F221F] to-[#13BF9E] text-white",
        live:
            "bg-linear-to-r from-[#0F221F] to-[#13BF9E] text-white",
        creator:
            "bg-linear-to-r from-[#0F221F] to-[#13BF9E] text-white",
        labs:
            "bg-linear-to-r from-[#0F221F] to-[#13BF9E] text-white",

    };


    useEffect(() => {
        if (!loading && currentUser) fetchUserDoc();
        // eslint-disable-next-line
    }, [currentUser, loading]);

    async function fetchUserDoc() {
        try {
            const ref = doc(db, "users", currentUser.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setUserDoc(snap.data());
                setEdit({ name: snap.data().name || "", brandName: snap.data().brandName || "" });
            } else {
                setUserDoc({ name: currentUser.displayName || "", email: currentUser.email });
            }
        } catch (err) {
            handleFirebaseError(err);
        }
    }

    async function savePersonalInfo(e) {
        e.preventDefault();
        if (!userDoc) return;
        setSaving(true);
        try {
            await setDoc(
                doc(db, "users", currentUser.uid),
                {
                    name: edit.name,
                    brandName: edit.brandName,
                    updatedAt: new Date(),
                },
                { merge: true }
            );
            await fetchUserDoc();
            toast.success("Profile updated");
        } catch (err) {
            handleFirebaseError(err);
        } finally {
            setSaving(false);
        }
    }

    async function changePassword(e) {
        e.preventDefault();
        const { isValid } = evaluatePassword(newPassword);

        if (!isValid) {
            return toast.error(
                "Password must be at least 10 characters, include one uppercase letter and one special character."
            );
        }

        if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
        setPwSaving(true);
        try {
            const cred = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, cred);
            await updatePassword(currentUser, newPassword);
            toast.success("Password updated successfully");
            setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch (err) {
            handleFirebaseError(err);
        } finally {
            setPwSaving(false);
        }
    }

    const hasPasswordProvider = () => {
        if (!currentUser || !currentUser.providerData) return false;
        return currentUser.providerData.some((p) => p.providerId === "password");
    };

    const triggerResetForGoogle = async () => {
        try {
            await sendPasswordResetEmail(auth, currentUser.email);
            toast.success("Password setup email sent. Check your inbox.");
        } catch (err) {
            handleFirebaseError(err);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-lg font-semibold mb-1">Profile Settings</h2>
                <p className="text-sm text-[#6B7280] mb-6">Manage your account and brand profiles</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={savePersonalInfo} className="bg-white border border-[#E6E9EE] rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-medium">Personal Information</h3>
                                    <p className="text-sm text-[#6B7280]">Update your personal details</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:items-start gap-4 w-full">
                                <div className="w-full">
                                    <AvatarCropper userDoc={userDoc} onUpload={fetchUserDoc} />
                                </div>

                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                                    <circle cx="12" cy="8" r="4" />
                                                    <path d="M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6" />
                                                </svg>
                                            </div>
                                            <input
                                                value={edit.name}
                                                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                                                placeholder="Full name"
                                                required
                                                className="w-full h-10 px-12 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] transition-all bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">Email</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                                    <path d="m2 7 10 7 10-7" />
                                                </svg>
                                            </div>
                                            <input
                                                className="w-full mt-1 px-12 py-2 border border-[#E6E9EE] rounded-md text-sm bg-gray-50"
                                                value={userDoc?.email || currentUser?.email}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {/* <div>
                                        <label className="text-xs font-medium text-[#374151]">Brand</label>
                                        <input
                                            className="w-full mt-1 px-3 py-2 border border-[#E6E9EE] rounded-md text-sm bg-white"
                                            value={edit.brandName}
                                            onChange={(e) => setEdit({ ...edit, brandName: e.target.value })}
                                            placeholder="Brand name"
                                        />
                                    </div> */}

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="inline-flex items-center px-4 py-2 bg-[#0DBF8C] text-white rounded-xl text-sm shadow-sm hover:opacity-95 cursor-pointer"
                                        >
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="bg-white border border-[#E6E9EE] rounded-3xl p-6 shadow-sm">
                            <div className="mb-4">
                                <h3 className="font-medium">Security</h3>
                                <p className="text-sm text-[#6B7280]">Manage your account security settings</p>
                            </div>

                            {hasPasswordProvider() ? (
                                <form onSubmit={changePassword} className="space-y-4">
                                    <div>
                                        <label className="text-xs text-[#374151]">Current Password</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full h-10 pl-13 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-[#374151]">New Password</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full h-10 pl-13 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <PasswordStrengthBar password={newPassword} />

                                    <div>
                                        <label className="text-xs text-[#374151]">Confirm New Password</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            </div>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full h-10 pl-13 pr-4 border border-[#E5E5E5] rounded-lg text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#87A29C] focus:border-transparent transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-[#6B7280]">Two-Factor Authentication <span className="text-xs">(optional)</span></div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="form-checkbox h-4 w-4" />
                                                <span className="ml-2 text-sm text-[#6B7280]">Enable</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" disabled={pwSaving} className="px-4 py-2 bg-[#111827] text-white rounded-md text-sm">
                                            {pwSaving ? "Updating..." : "Update Password"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-sm text-[#6B7280]">
                                    You signed in with Google and do not have a password set.
                                    <div className="mt-3">
                                        <button
                                            onClick={triggerResetForGoogle}
                                            className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md text-sm"
                                        >
                                            Send password setup email
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="bg-white border border-[#E6E9EE] rounded-3xl p-4">
                            <h4 className="font-medium">Brand Profiles</h4>
                            <p className="text-xs text-[#6B7280] mb-3">Switch between your brands</p>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between border border-[#E6E9EE] rounded-md px-3 py-2">
                                    <div className="text-sm">My Creative Brand</div>
                                    <div className="text-xs bg-green-50 text-[#0DBF8C] px-2 py-0.5 rounded-full">Active</div>
                                </div>

                                <div className="flex items-center justify-between border border-[#E6E9EE] rounded-md px-3 py-2">
                                    <div className="text-sm">Tech Startup Co</div>
                                </div>

                                <div className="flex items-center justify-between border border-[#E6E9EE] rounded-md px-3 py-2">
                                    <div className="text-sm">Design Agency</div>
                                </div>

                                <button className="w-full text-sm mt-2 px-3 py-2 border border-[#E6E9EE] rounded-md">+ Create New Brand</button>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-[#FBEAFF] to-white border border-[#F3E8FF] rounded-3xl p-4">
                            <h4 className="font-medium">Current Brand</h4>
                            <p className="text-xs text-[#6B7280] mb-3">Brand Name</p>
                            <div className="bg-white p-3 rounded-md">
                                <div className="text-sm font-semibold">My Creative Brand</div>
                                <button className="mt-3 px-3 py-2 border rounded-md text-sm">Manage Brand Identity</button>
                            </div>
                        </div>

                        <div className="bg-white border border-emerald-400 rounded-2xl p-5 w-full max-w-sm">
                            {/* Header */}
                            <h4 className="text-sm font-semibold text-gray-900">Subscription</h4>
                            <p className="mt-1 text-xs text-gray-500">Your current plan details</p>

                            {/* Plan Card */}
                            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                                <span
                                    className={`inline-flex items-center mb-2 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm ${PLAN_BADGE_STYLES[userDoc?.subscription?.plan] || "bg-linear-to-r from-gray-300 to-gray-400 text-white"}`}
                                >
                                    Baraly – {userDoc?.subscription?.plan || "unknown"}
                                </span>


                                <div className="text-sm font-medium text-gray-900">
                                    {userDoc?.subscription?.plan || "No active subscription"} – {userDoc?.subscription?.tier || "No tier"}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    ${userDoc?.subscription?.price || "—"}/month
                                </div>
                            </div>

                            <div className="my-4 h-px w-full bg-gray-200" />

                            <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-gray-500">
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Next Billing
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {userDoc?.subscription?.expiresAt?.toDate().toLocaleDateString() || "—"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Status</span>
                                    <span className={`rounded-full px-3 py-0.5 text-[11px] font-semibold 
                                    ${userDoc?.subscription?.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                            userDoc?.subscription?.status === 'inactive' ? 'bg-gray-200 text-gray-600' :
                                                userDoc?.subscription?.status === 'past_due' ? 'bg-yellow-100 text-yellow-700' :
                                                    userDoc?.subscription?.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        userDoc?.subscription?.status === 'cancelling' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-500' // default fallback
                                        }`}>
                                        {userDoc?.subscription?.status || 'unknown'}
                                    </span>
                                </div>
                            </div>

                            <Link to="/app/subscription" className="mt-4 block">
                                <button className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                    Manage Subscription
                                </button>
                            </Link>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
