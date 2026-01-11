import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
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
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, userData, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
