import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import { MdOutlinePalette } from "react-icons/md"; // Brand icon (example)

const ProfileButton = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === "/app/profile"; // active state detection

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const snap = await getDoc(doc(db, "users", currentUser.uid));
                if (snap.exists()) setUserData(snap.data());
            }
        });

        return () => unsub();
    }, []);

    if (!userData) return null;

    const firstLetter = userData.name?.charAt(0).toUpperCase();

    return (
        <button
            onClick={() => navigate("/app/profile")}
            className={` w-full text-left p-2 rounded-2xl relative transition-all overflow-hidden cursor-pointer duration-200 hover:bg-gray-50 ${location.pathname === "/app/profile" ? "bg-gray-50 text-[#0dbf8c] " : "text-black/70"}`}
        >
            <div className="flex items-center gap-3 mb-2">
                {/* Avatar */}
                {userData.avatar ? (
                    <img
                        src={userData.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full border-[0.5px] border-[#0DBF8C]/60 object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 bg-[#0DBF8C]/20 text-[#0DBF8C] rounded-full flex items-center justify-center font-semibold text-lg">
                        {firstLetter}
                    </div>
                )}

                {/* Name + Email */}
                <div>
                    <h4 className="text-sm font-semibold">{userData.name}</h4>
                    <p className="text-xs text-black/50">{userData.email}</p>
                </div>
            </div>

            {/* Brand Name */}
            <div className="flex items-center text-xs text-black/60 gap-1 mb-2">
                <MdOutlinePalette size={14} />
                <span>{userData.brand || "My Creative Brand"}</span>
            </div>

            {/* Subscription Badge */}
            <span
                className="
                inline-block text-[10px]
                px-3 py-1 rounded-full font-medium
                bg-linear-to-l from-[#0F221F] to-[#13BF9E]
                text-white
                "
            >
                {userData.subscription?.plan || "No Active Plan"} - {userData.subscription?.tier || "No Active Tier"}
            </span>
        </button>
    );
};

export default ProfileButton;
