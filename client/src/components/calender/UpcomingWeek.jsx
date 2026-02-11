import React, { useState, useEffect, useRef } from "react";
import { isWithinInterval, addDays, startOfToday, format } from "date-fns";
import EventOptionsDropdown from "./EventOptionsDropdown";

const UpcomingWeek = ({ events, onEdit, onConvert, onDelete }) => {
    const today = startOfToday();
    const next7 = addDays(today, 7);

    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const upcoming = events.filter((ev) =>
        isWithinInterval(new Date(ev.date), { start: today, end: next7 })
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-lg mb-1">Upcoming This Week</h2>
            <p className="text-gray-500 mb-5">Content scheduled for the next 7 days</p>

            {upcoming.length === 0 && (
                <div className="text-gray-400">No upcoming content.</div>
            )}

            <div className="space-y-4">
                {upcoming.map((ev) => {
                    const dateObj = new Date(ev.date);
                    const month = format(dateObj, "MMM");
                    const day = format(dateObj, "d");

                    return (
                        <div
                            key={ev.id}
                            className="relative flex items-center justify-between bg-[#FAF5FF] px-4 py-4 rounded-xl border border-purple-100"
                        >
                            {/* LEFT SECTION */}
                            <div className="flex items-center gap-4">
                                {/* Date box (left) */}
                                <div className="flex flex-col items-center text-purple-700 font-medium border-l-4 border-purple-500 pl-3">
                                    <span className="text-xs">{month}</span>
                                    <span className="text-lg font-semibold">{day}</span>
                                </div>

                                {/* Title + meta */}
                                <div className="flex flex-col -mt-1">
                                    <span className="font-semibold text-gray-900 text-sm">
                                        {ev.title}
                                    </span>

                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] bg-gray-200 px-2 py-[2px] rounded-full">
                                            Posting Date
                                        </span>
                                        <span className="text-[11px] text-gray-500">{ev.type}</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SECTION */}
                            <div className="flex items-center gap-4">
                                {/* Platform badge */}
                                <span
                                    className="text-xs px-3 py-1 rounded-full text-white"
                                    style={{ backgroundColor: ev.color }}
                                >
                                    {ev.platform}
                                </span>

                                {/* Three dot menu */}
                                <button
                                    onClick={() =>
                                        setOpenMenuId(openMenuId === ev.id ? null : ev.id)
                                    }
                                    className="text-gray-500 hover:bg-gray-200 p-1 rounded-full"
                                >
                                    ⋮
                                </button>

                                {/* Dropdown */}
                                {openMenuId === ev.id && (
                                    <div ref={menuRef} className="absolute right-0 top-12">
                                        <EventOptionsDropdown
                                            open={openMenuId === ev.id}
                                            onEdit={() => {
                                                setOpenMenuId(null);
                                                onEdit?.(ev);
                                            }}
                                            onConvert={() => {
                                                setOpenMenuId(null);
                                                onConvert?.(ev);
                                            }}
                                            onDelete={() => {
                                                setOpenMenuId(null);
                                                onDelete?.(ev.id);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingWeek;
