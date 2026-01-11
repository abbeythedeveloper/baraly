// pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/UseAuth.jsx";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";

const UserDashboard = () => {
    const { currentUser } = useAuth();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Redirect logged out users
    if (!currentUser) {
        return <Navigate to="/auth/login" replace />;
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const ref = doc(db, "users", user.uid);
                    const snap = await getDoc(ref);

                    if (snap.exists()) {
                        setUserData(snap.data());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }

            setLoading(false);
        });

        return () => unsub();
    }, []);

    return (
        <div className="min-h-screen bg-[#EFFFFC]">
            <Header />

            <div className="p-6">
                {/* Loading State */}
                {loading && <p className="text-gray-600">Loading dashboard...</p>}

                {/* Once loaded */}
                {!loading && userData && (
                    <h2 className="text-xl font-semibold">
                        Hello {userData?.name || userData?.email}, you are logged in!
                    </h2>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
