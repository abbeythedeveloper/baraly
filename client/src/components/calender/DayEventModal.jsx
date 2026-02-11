import React from "react";

const DayEventModal = ({ dateLabel, events = [], onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] rounded-2xl p-6 shadow-xl relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-lg"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-1">{dateLabel}</h2>
                <p className="text-gray-500 mb-5">
                    {events.length} item{events.length !== 1 ? "s" : ""} scheduled for this day
                </p>

                <div className="space-y-4">
                    {events.map((ev) => (
                        <div
                            key={ev.id}
                            className="bg-purple-50 border-l-4 border-purple-400 px-4 py-3 rounded-lg"
                        >
                            <div className="font-semibold text-purple-900">{ev.title}</div>

                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                                    Posting Date
                                </span>

                                <span
                                    className="text-xs px-3 py-1 rounded-full text-white"
                                    style={{ backgroundColor: ev.color }}
                                >
                                    {ev.platform}
                                </span>

                                <span className="text-xs text-gray-700">{ev.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayEventModal;
