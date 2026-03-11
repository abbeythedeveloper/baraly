import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function ensureUserDocument(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await setDoc(
        userRef,
        {
            uid: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? "",
            avatar: user.photoURL ?? null,
            brandName: "",
            twoFactorEnabled: false,
            subscription: {
                status: "inactive",
                planCode: null,
                subscriptionCode: null,
                startedAt: null,
                expiresAt: null,
                autoRenew: false,
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
}
