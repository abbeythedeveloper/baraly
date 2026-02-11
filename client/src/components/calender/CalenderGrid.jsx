import React, { useState } from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isToday,
    eachDayOfInterval,
    addMonths,
    format,
    isSameMonth
} from "date-fns";

const CalendarGrid = ({ events, onDayClick }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd
    });

    const getEventsForDay = (day) => {
        const key = format(day, "yyyy-MM-dd");
        return events.filter((ev) => ev.date === key);
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">

            {/* MONTH HEADER */}
            <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded-xl border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-emerald-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-xl border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-emerald-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* WEEKDAY HEADER */}
            <div className="grid grid-cols-7 mb-4 px-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div
                        key={d}
                        className="text-[13px] font-medium text-gray-400 text-center"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                    const dayEvents = getEventsForDay(day);
                    const isOutside = !isSameMonth(day, currentMonth);
                    const today = isToday(day); // ✅ THIS IS THE KEY

                    return (
                        <div
                            key={idx}
                            onClick={() => {
                                const label = format(day, "MMMM d, yyyy");
                                onDayClick(dayEvents, label);
                            }}
                            className={`
                                border
                                rounded-lg
                                p-3
                                h-[105px]
                                cursor-pointer
                                flex flex-col
                                transition
                                hover:border-gray-300
                                ${isOutside ? "opacity-40" : ""}
                                ${today
                                    ? "bg-purple-50 border-purple-500"
                                    : "bg-gray-50"}
                            `}
                            style={{
                                borderColor: today ? "#7C3AED" : "#F2F2F2",
                            }}
                        >

                            {/* DATE HEADER */}
                            <div className="flex items-center justify-between">
                                <span
                                    className={`font-medium text-sm ${today ? "text-purple-700" : "text-gray-700"
                                        }`}
                                >
                                    {format(day, "d")}
                                </span>

                                {today && (
                                    <span className="text-[10px] px-2 py-[2px] rounded-full bg-purple-100 text-purple-700">
                                        Today
                                    </span>
                                )}
                            </div>

                            {/* EVENTS */}
                            <div className="flex flex-col gap-1 mt-1">
                                {dayEvents.map((ev) => (
                                    <div
                                        key={ev.id}
                                        className="text-[11px] py-1 px-2 rounded-md text-white font-medium truncate"
                                        style={{
                                            width: "85%",
                                            backgroundColor: ev.color
                                        }}
                                    >
                                        {ev.title}
                                    </div>
                                ))}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;
