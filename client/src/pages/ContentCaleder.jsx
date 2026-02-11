import React, { useState } from "react";
import CalendarGrid from "../components/calender/CalenderGrid";
import UpcomingWeek from "../components/calender/UpcomingWeek";
import AddContentIdeaModal from "../components/calender/AddContentIdeaModal";
import EditContentModal from "../components/calender/EditContentModal";
import DayEventModal from "../components/calender/DayEventModal";
import useCalenderEvents from "../components/calender/useCalenderEvents";
import { useAuth } from "../contexts/authContext/UseAuth";
import { useNavigate, Link } from "react-router-dom";

const ContentCalendar = () => {
    const { currentUser } = useAuth();
    const { events, addEvent, editEvent, deleteEvent } = useCalenderEvents(currentUser.uid);
    const navigate = useNavigate();


    const [showAddModal, setShowAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editEventData, setEditEventData] = useState(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState(null);

    const handleDayClick = (dayEvents, dateLabel) => {
        if (dayEvents.length === 0) {
            setShowAddModal(true);
        } else {
            setSelectedDayEvents({ events: dayEvents, dateLabel });
        }
    };

    const normalizeEdit = (data) => {
        let { date } = data;

        // Convert dd/mm/yyyy → yyyy-mm-dd
        if (date.includes("/")) {
            const [dd, mm, yyyy] = date.split("/");
            date = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        }

        return {
            ...data,
            date
        };
    };


    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl space-y-8">

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Content Calendar</h1>
                        <p className="text-gray-500">Plan and schedule your content</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate("/app/requests/new")} className="flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-xl shadow-sm hover:border-[#0DBF8C] hover:text-[#0DBF8C] cursor-pointer border border-gray-300 transition">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            </span>
                            New Request.
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-[#0DBF8C] px-4 py-2 rounded-xl shadow-sm hover:bg-[#0edaa0] cursor-pointer border text-white border-gray-300 transition"
                        >
                            <span className="text-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            </span>
                            Add Content Idea
                        </button>
                    </div>
                </div>

                {/* Upcoming Week */}
                <UpcomingWeek
                    events={events}
                    onEdit={(ev) => {
                        setEditEventData(ev);
                        setOpenEditModal(true);
                    }}
                    onDelete={(id) => {
                        deleteEvent(id);
                    }}
                />

                {/* Calendar */}
                <CalendarGrid
                    events={events}
                    onDayClick={handleDayClick}
                />

                {/* Modals */}
                {showAddModal && (
                    <AddContentIdeaModal
                        onClose={() => setShowAddModal(false)}
                        onSubmit={(ev) => {
                            addEvent(ev);
                            setShowAddModal(false);
                        }}
                    />
                )}

                {/* Edit Modal */}
                {openEditModal && (
                    <EditContentModal
                        open={openEditModal}
                        eventData={editEventData}
                        onClose={() => setOpenEditModal(false)}
                        onSave={(updatedData) => {
                            const normalized = normalizeEdit(updatedData);

                            editEvent(editEventData.id, normalized);
                            setOpenEditModal(false);
                        }}

                        onConvert={(ev) => {
                            console.log("convert to request", ev);
                        }}
                    />
                )}



                {selectedDayEvents && (
                    <DayEventModal
                        dateLabel={selectedDayEvents.dateLabel}
                        events={selectedDayEvents.events}
                        onClose={() => setSelectedDayEvents(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default ContentCalendar;
