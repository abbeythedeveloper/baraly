import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventOptionsDropdown = ({ open, onEdit, onConvert, onDelete }) => {
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1"
                style={{ boxShadow: "0px 4px 16px rgba(0,0,0,0.08)" }}
            >
                {/* EDIT */}
                <button
                    onClick={onEdit}
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm text-gray-800 border-b border-gray-200"
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                    </span>
                    Edit Content
                </button>

                {/* CONVERT */}
                <button
                    onClick={onConvert}
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm text-gray-800 border-b border-gray-200"
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg>
                    </span>
                    Convert to Baraly Request
                </button>

                {/* DELETE */}
                <button
                    onClick={onDelete}
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm text-red-600"
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    </span>
                    Delete
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default EventOptionsDropdown;
