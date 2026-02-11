import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/UseAuth.jsx";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import getTimeGreeting from "../utils/getTimeGreeting";
import SubscriptionCard from "../components/Home/SubscriptionCard";
import RequestsRemaining from "../components/Home/RequestsRemaining";
import StatCards from "../components/Home/StatCards";
import BrandIdentityCard from "../components/Home/BrandIdentityCard";
import RequestServiceGrid from "../components/Home/RequestServiceGrid";
import RecentRequests from "../components/Home/RecentRequests";


export default function Home() {
    const { currentUser } = useAuth();
    const greeting = getTimeGreeting();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Redirect logged out users
    if (!currentUser) {
        return <Navigate to="/auth/login" replace />;
    }

    useEffect(() => {
        if (!currentUser) return;

        const fetchUser = async () => {
            try {
                const ref = doc(db, "users", currentUser.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setUserData(snap.data());
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [currentUser]);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                {/* Greeting */}
                <div>
                    <h1 className="text-md mb-2 font-semibold">
                        {loading ? (
                            <p className="text-gray-600">Loading dashboard...</p>
                        ) : (
                            <>
                                {greeting},{" "}
                                <span className="font-semibold">
                                    {userData?.name || userData?.email}
                                </span>
                            </>
                        )}

                    </h1>
                    <p className="text-sm text-gray-500 mb-2">
                        Managing <span className="text-emerald-600">My Creative Brand</span>
                    </p>
                </div>

                <SubscriptionCard />

                <RequestsRemaining />

                <StatCards />

                <BrandIdentityCard />

                <RequestServiceGrid />

                <RecentRequests />
            </div>
        </div>
    );
}
