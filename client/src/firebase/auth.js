import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { ensureUserDocument } from "./ensureUserDocument";

// ==========================
// SIGN UP (Email + Password)
// ==========================
export const doCreateUserWithEmailAndPassword = async (
    email,
    password,
    name
) => {

    const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await ensureUserDocument({
        ...userCred.user,
        displayName: name,
    });

    toast.success("Account created successfully!");

    return userCred;
};


// ==========================
// SIGN IN (Email + Password)
// ==========================
export const doSignInWithEmailAndPassword = async (email, password) => {

    const userCred = await signInWithEmailAndPassword(auth, email, password);

    if (!userCred.user.emailVerified) {
        await signOut(auth);
        throw new Error("Please verify your email first.");
    }

    const snap = await getDoc(doc(db, "users", userCred.user.uid));
    const data = snap.data();

    return {
        user: userCred.user,
        twoFactorEnabled: data?.twoFactorEnabled || false
    };

};


// ==========================
// GOOGLE SIGN IN
// ==========================
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await ensureUserDocument(result.user);
    // Google users skip 2FA — mark as verified immediately
    sessionStorage.setItem("2fa_verified", "true");
    toast.success("Signed in with Google!");
    return result;
};
// ==========================
// SIGN OUT
// ==========================
export const doSignOut = async () => {

    sessionStorage.removeItem("2fa_verified");

    await signOut(auth);

    toast.success("You have been logged out.");

};