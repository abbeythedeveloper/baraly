import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase/firebase";

const functions = getFunctions(app);
const generatePostIdeaFn = httpsCallable(functions, "generatePostIdea");

export const generatePostIdea = async ({ mediaType, ideaPrompt }) => {
    const result = await generatePostIdeaFn({ mediaType, ideaPrompt });
    return result.data;
};