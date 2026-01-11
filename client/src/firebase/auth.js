import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
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
    const result = await signInWithEmailAndPassword(auth, email, password);

    // Ensure document exists even for legacy users
    await ensureUserDocument(result.user);

    toast.success("Logged in successfully!");
    return result;
};

// ==========================
// GOOGLE SIGN IN
// ==========================
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await ensureUserDocument(result.user); // 🔑 SINGLE SOURCE OF TRUTH

    toast.success("Signed in with Google!");
    return result;
};

// ==========================
// SIGN OUT
// ==========================
export const doSignOut = async () => {
    await signOut(auth);
    toast.success("You have been logged out.");
};
