import React, { useState } from "react";
import { format } from "date-fns";

const EventModal = ({ date, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("Instagram");
    const [type, setType] = useState("Post");
    const [description, setDescription] = useState("");

    const COLORS = {
        Instagram: "#A855F7",
        Facebook: "#3B82F6",
        YouTube: "#EF4444",
        TikTok: "#000000",
        X: "#111111"
    };

    const handleSubmit = () => {
        onSubmit({
            title,
            platform,
            type,
            description,
            date,
            color: COLORS[platform] ?? "#6366F1",
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-[450px] rounded-2xl p-6 shadow-xl">

                <h2 className="text-2xl font-semibold mb-4">Add Content to Calendar</h2>

                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-sm mb-4">
                    Adding content here is for your personal planning only.
                    It does not create a service request or notify any team.
                </div>

                <label className="text-sm font-medium">Content Name*</label>
                <input
                    className="w-full border p-2 rounded mt-1 mb-4"
                    placeholder="e.g. Holiday Campaign Post"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Platform</label>
                        <select
                            className="w-full border p-2 rounded mt-1"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        >
                            <option>Instagram</option>
                            <option>Facebook</option>
                            <option>YouTube</option>
                            <option>TikTok</option>
                            <option>X</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Content Type</label>
                        <select
                            className="w-full border p-2 rounded mt-1"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option>Post</option>
                            <option>Reel</option>
                            <option>Story</option>
                            <option>Video</option>
                        </select>
                    </div>
                </div>

                <label className="text-sm font-medium mt-4 block">Description</label>
                <textarea
                    className="w-full border p-2 rounded mt-1 h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex justify-end mt-6 gap-3">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Add to Calendar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventModal;

