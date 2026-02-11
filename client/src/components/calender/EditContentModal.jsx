import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLATFORM_COLORS = {
    Instagram: "#EC4899",
    Facebook: "#3B82F6",
    Twitter: "#0EA5E9",
    TikTok: "#000000",
    YouTube: "#EF4444",
};

const EditContentModal = ({ open, eventData, onClose, onSave, onConvert }) => {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    // Load existing data when modal opens
    useEffect(() => {
        if (eventData) {
            setTitle(eventData.title || "");
            setPlatform(eventData.platform || "");
            setType(eventData.type || "");
            setDate(eventData.date ? formatDateToInput(eventData.date) : "");
            setDescription(eventData.description || "");
        }
    }, [eventData]);

    const formatDateToInput = (value) => {
        if (!value) return "";
        const [yyyy, mm, dd] = value.split("-");
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleSubmit = () => {
        onSave({
            title,
            platform,
            type,
            description,
            date,
            color: PLATFORM_COLORS[platform] ?? "#6366F1",
        });
    };

    if (!open) {
        console.log("Modal is closed");
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white w-[550px] rounded-2xl p-8 shadow-xl relative"
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-6 text-xl text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>

                    {/* HEADER */}
                    <h2 className="text-2xl font-semibold mb-1">Edit Content</h2>
                    <p className="text-gray-500 mb-6">
                        Update your content details or convert to a Baraly request
                    </p>

                    {/* INPUTS */}
                    <label className="text-sm font-medium">Content Name *</label>
                    <input
                        className="w-full border rounded-lg p-2 mt-1 mb-5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                            <label className="text-sm font-medium">Platform</label>
                            <select
                                className="w-full border rounded-lg p-2 mt-1"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            >
                                <option value=""></option>
                                <option>Instagram</option>
                                <option>Facebook</option>
                                <option>Twitter</option>
                                <option>YouTube</option>
                                <option>TikTok</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Content Type</label>
                            <select
                                className="w-full border rounded-lg p-2 mt-1"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>Post</option>
                                <option>Reel</option>
                                <option>Story</option>
                                <option>Thread</option>
                                <option>Video</option>
                            </select>
                        </div>
                    </div>

                    <label className="text-sm font-medium">Scheduled Date</label>
                    <input
                        className="w-full border rounded-lg p-2 mt-1 mb-5"
                        value={date}
                        placeholder="dd/mm/yyyy"
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <label className="text-sm font-medium">Description (Optional)</label>
                    <textarea
                        className="w-full border rounded-lg p-2 mt-1 h-24 mb-6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add notes about your content idea, goals, audience..."
                    />

                    {/* CONVERT BOX */}
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                        <p className="text-sm font-semibold text-purple-800 mb-1">
                            Convert to Request:
                        </p>
                        <p className="text-sm text-purple-700">
                            Need Baraly to create this content? Convert this calendar entry
                            into a service request.
                        </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleSubmit}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium"
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={() => onConvert(eventData)}
                            className="px-5 py-2 border rounded-lg font-medium"
                        >
                            Convert to Request
                        </button>

                        <button
                            onClick={onClose}
                            className="px-5 py-2 text-gray-600 rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditContentModal;
