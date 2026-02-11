import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContentIdeaModal = ({ onClose, onSubmit }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("Instagram");
    const [type, setType] = useState("Post");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const COLORS = {
        Instagram: "#EC4899",
        Facebook: "#3B82F6",
        Twitter: "#0EA5E9",
        TikTok: "#000000",
        YouTube: "#EF4444",
    };

    const handleSubmit = () => {
        onSubmit({
            // id: crypto.randomUUID(), 
            title,
            platform,
            type,
            date,
            description,
            color: COLORS[platform] ?? "#6366F1",
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[550px] h-[calc(100vh-4rem)] rounded-2xl p-8 shadow-xl relative">

                {/* Header */}
                <h2 className="text-2xl font-semibold mb-6">Add Content to Calendar</h2>

                {/* Note Box */}
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-sm mb-6 leading-relaxed">
                    <strong>Note:</strong> Adding content here is for your personal planning only.
                    It does not create a service request or trigger any action on Baraly’s end.
                </div>

                {/* Content Name */}
                <label className="text-sm font-medium">Content Name *</label>
                <input
                    className="w-full border rounded-lg p-2 mt-1 mb-5"
                    placeholder="e.g., Holiday Campaign Post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Platform + Type */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                        <label className="text-sm font-medium">Platform</label>
                        <select
                            className="w-full border rounded-lg p-2 mt-1"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        >
                            <option>Instagram</option>
                            <option>Facebook</option>
                            <option>YouTube</option>
                            <option>TikTok</option>
                            <option>Twitter</option>
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

                {/* Scheduled Date */}
                <label className="text-sm font-medium">Scheduled Date</label>
                <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-full border rounded-lg p-2 mt-1 mb-5"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                {/* Description */}
                <label className="text-sm font-medium">Description (Optional)</label>
                <textarea
                    className="w-full border rounded-lg p-2 mt-1 h-24 mb-5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Cards Section */}
                <div className="bg-gray-50 border rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">
                        Need creative services for this content?
                    </p>

                    <button
                        onClick={() => navigate("/app/requests/new")}
                        className="border px-4 py-2 cursor-pointer rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 w-full text-left"
                    >
                        Go to New Request →
                    </button>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        className="px-6 py-2 bg-green-600 cursor-pointer text-white rounded-lg"
                        onClick={handleSubmit}
                    >
                        Add to Calendar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddContentIdeaModal;
