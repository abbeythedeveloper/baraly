import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Check, ChevronDown } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // adjust path if needed
import { useAuth } from "../../../contexts/authContext/UseAuth"; // adjust path


const PLATFORM_OPTIONS = [
    "Instagram",
    "Facebook",
    "Twitter / X",
    "LinkedIn",
    "TikTok",
    "YouTube",
    "Other",
];

const AddToCalendarModal = ({
    isOpen,
    onClose,
    generatedIdea,
}) => {

    const { currentUser } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        platform: "Instagram",
        description: "",
        date: "",
    });

    const [isPlatformOpen, setIsPlatformOpen] = useState(false);
    const [error, setError] = useState(null);

    // 🔁 Hydrate from generatedIdea
    useEffect(() => {
        if (generatedIdea) {
            const numberedTips = (generatedIdea.tips || [])
                .map((tip, index) => `${index + 1}. ${tip}`)
                .join("\n");

            const combinedDescription = `
${generatedIdea.summary || ""}

Suggested Caption:
${generatedIdea.caption || ""}

Tips:
${numberedTips}
`.trim();

            setFormData({
                title: generatedIdea.title || "",
                platform: generatedIdea.platforms?.[0] || "Instagram",
                description: combinedDescription,
            });
        }
    }, [generatedIdea]);


    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTipChange = (index, value) => {
        const updatedTips = [...formData.tips];
        updatedTips[index] = value;
        setFormData((prev) => ({
            ...prev,
            tips: updatedTips,
        }));
    };

    const handleSubmit = async () => {
        setError(null);

        if (!formData.title.trim()) {
            setError("Content Name is required.");
            return;
        }

        if (!formData.date) {
            setError("Please select a date.");
            return;
        }

        if (!currentUser) {
            setError("User not authenticated.");
            return;
        }

        try {
            setIsSaving(true);

            const payload = {
                title: formData.title,
                platform: formData.platform,
                description: formData.description,
                date: formData.date,
                type: generatedIdea?.mediaType || "Post",
                color: "#13BF9E",
                userId: currentUser.uid,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "calendarEvents"), payload);

            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to save to calendar.");
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Add Post Ideas to Calendar
                                </h2>
                                <p className="text-sm text-slate-600 mt-1">
                                    Add this generated ideas to your content calendar
                                </p>
                            </div>
                            <button onClick={onClose}>
                                <X className="h-5 w-5 text-slate-500 hover:text-slate-900" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 space-y-5">

                            {/* Info Notice */}
                            <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                                <Info className="h-5 w-5 mt-0.5" />
                                Adding to the calendar is for personal planning only. To have Baraly create this content, submit a service request.
                            </div>

                            {/* Content Name */}
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Content Name *
                                </label>
                                <input
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                />
                                {error && (
                                    <p className="text-xs text-red-600 mt-1">{error}</p>
                                )}
                            </div>

                            {/* Platform Dropdown */}
                            <div className="relative flex">
                                <div className="w-[70%] pr-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Platform
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => setIsPlatformOpen((prev) => !prev)}
                                        className="mt-1 flex w-full items-center justify-between rounded-md border border-slate-300 px-3 py-2 text-sm"
                                    >
                                        {formData.platform}
                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                    </button>

                                    <AnimatePresence>
                                        {isPlatformOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg"
                                            >
                                                {PLATFORM_OPTIONS.map((platform) => (
                                                    <button
                                                        key={platform}
                                                        type="button"
                                                        onClick={() => {
                                                            handleChange("platform", platform);
                                                            setIsPlatformOpen(false);
                                                        }}
                                                        className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-slate-100"
                                                    >
                                                        {platform}
                                                        {formData.platform === platform && (
                                                            <Check className="h-4 w-4 text-emerald-600" />
                                                        )}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                date: e.target.value,
                                            }))
                                        }
                                        className="mt-1 w-full cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    />
                                </div>

                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    rows={8}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                />
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                            <button
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="rounded-md bg-[#13BF9E] px-4 py-2 text-sm font-medium text-white hover:bg-[#13BF9E]/90 disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Add to Calendar"}
                            </button>
                            <button
                                onClick={onClose}
                                className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddToCalendarModal;
