// components/SidePanelNav.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doSignOut } from '../firebase/auth'
import {
    FiMenu,
    FiHome,
    FiFileText,
    FiImage,
    FiMessageSquare,
    FiCalendar,
    FiTool,
    FiLogOut,
} from "react-icons/fi";
import { IoCardOutline } from "react-icons/io5";
import ProfileButton from "./ProfileButton.jsx";

const menuItems = [
    { label: "Home", icon: <FiHome />, link: "/app/dashboard" },
    { label: "Requests", icon: <FiFileText />, link: "/app/requests" },
    { label: "Assets", icon: <FiImage />, link: "/app/assets" },
    { label: "Chat", icon: <FiMessageSquare />, link: "/app/chat" },
    { label: "Calendar", icon: <FiCalendar />, link: "/app/calendar" },
    { label: "Tools", icon: <FiTool />, link: "/app/tools" },
    // { label: "Subscription", icon: <IoCardOutline />, link: "/app/subscription" },
];

const SidePanelNav = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();
    const sidebarVariants = {
        hidden: { x: "-100%" },
        visible: { x: 0 },
    };

    return (
        <div className="">

            {/* MOBILE TOP NAV */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center px-5 z-40">
                <button onClick={() => setOpen(true)} className="text-xl mr-4">
                    <FiMenu />
                </button>
                <h2 className="text-lg font-semibold">Baraly Project Hub</h2>
            </div>

            {/* MOBILE BACKDROP */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 lg:hidden z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <AnimatePresence>
                {(open || window.innerWidth >= 1024) && (
                    <motion.aside
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={sidebarVariants}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="
                                fixed lg:fixed left-0 top-0 h-full 
                                w-[256px] bg-white border-[#E5E7EB] border shadow-lg lg:shadow-none 
                                p-[20px] z-50 flex flex-col justify-between
                                overflow-y-auto lg:overflow-hidden
                            "
                    >

                        {/* Header */}
                        <div className="h-[90%]  flex flex-col justify-between">
                            <div className="h-[50%] flex flex-col">
                                <div className="flex justify-between items-center mb-2 lg:mb-1">
                                    <h1 className="text-xl font-bold">Baraly</h1>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="lg:hidden text-xl"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Menu */}
                                <nav className="space-y-1 mt-6 mb-1">
                                    {menuItems.map((item) => {
                                        const active = location.pathname === item.link;

                                        return (
                                            <Link
                                                key={item.label}
                                                to={item.link}
                                                className={`flex items-center gap-2 p-2 rounded-xl transition-all ${active
                                                    ? "bg-[#0DBF8C] text-white font-medium rounded-4xl"
                                                    : "text-black/70 hover:bg-gray-100 rounded-4xl"
                                                    }`}
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="text-md">{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* USER AREA */}
                            <div className="h-[25%] flex items-end">

                                <div className="border-t border-gray-200 pt-4 flex flex-col">
                                    <Link to="/app/subscription" className={`flex flex-2 items-center gap-2 p-2 rounded-xl transition-all hover:bg-gray-100 ${location.pathname === "/app/subscription" ? "bg-linear-to-r from-[#0F221F] to-[#13BF9E] text-white font-medium rounded-4xl" : "text-black/70"}`} onClick={() => setOpen(false)}>
                                        <span className="text-xl"><IoCardOutline /></span>
                                        <span className="text-md">Subscription</span>
                                    </Link>
                                    <div className={`rounded-2xl relative mt-3`}>
                                        <div className={`absolute -inset-0.5 ${location.pathname === "/app/profile" ? "bg-[#0dbf8c] blur opacity-75" : "hidden"} `}></div>
                                        <ProfileButton />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LOGOUT */}
                        <div className="h-[10%] -mb-2 flex items-center">
                            <button onClick={() => { doSignOut().then(() => navigate('/auth/login')) }} className="flex p-2 cursor-pointer items-center gap-3 text-black/70 hover:text-red-500 transition text-sm">
                                <FiLogOut className="text-lg" />
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SidePanelNav;
