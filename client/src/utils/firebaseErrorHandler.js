import toast from "react-hot-toast";

export const handleFirebaseError = (error) => {
    console.error(error);

    const code = error.code;
    let message = "Something went wrong.";

    switch (code) {
        case "auth/email-already-in-use":
            message = "This email is already in use.";
            break;
        case "auth/invalid-email":
            message = "Invalid email address.";
            break;
        case "auth/invalid-credential":
            message = "Invalid Credential, Please try again.";
            break;
        case "auth/user-not-found":
            message = "No account found with this email.";
            break;
        case "auth/wrong-password":
            message = "Incorrect password.";
            break;
        case "auth/weak-password":
            message = "Password must be at least 6 characters.";
            break;
        default:
            message = error.message || message;
    }

    toast.error(message);
};
