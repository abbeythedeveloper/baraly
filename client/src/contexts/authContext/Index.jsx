import { createContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                setEmailVerified(user.emailVerified);

                try {
                    const snap = await getDoc(doc(db, "users", user.uid));
                    setUserData(snap.exists() ? snap.data() : null);
                } catch (err) {
                    console.error("Firestore user fetch failed:", err);
                    setUserData(null);
                }
            } else {
                setCurrentUser(null);
                setUserData(null);
                setEmailVerified(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userData,
                emailVerified: currentUser?.emailVerified ?? false,
                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};