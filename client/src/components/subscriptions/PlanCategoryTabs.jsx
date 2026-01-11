import React from "react";
import { FaRocket, FaChartLine, FaVideo, FaUserFriends, FaFlask } from "react-icons/fa";

const categories = [
    { name: "Starter", icon: FaRocket },
    { name: "Presence", icon: FaChartLine },
    { name: "Live", icon: FaVideo },
    { name: "Creator", icon: FaUserFriends },
    { name: "Systems", icon: FaUserFriends },
    { name: "Labs", icon: FaFlask },
];

const PlanCategoryTabs = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="mt-8 flex justify-center w-full">
            <div className="inline-flex justify-between w-[80%] overflow-x-auto rounded-full bg-gray-200 p-1">
                {categories.map(({ name, icon: Icon }) => {
                    const active = activeCategory === name;

                    return (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setActiveCategory(name)}
                            className={`flex items-center w-full cursor-pointer justify-center gap-2 px-4 py-2 text-sm whitespace-nowrap font-medium rounded-full transition
                ${active
                                    ? "bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-200"
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {/* Only visible on larger screens */}
                            <Icon className="hidden md:inline-block text-xs" />
                            {name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PlanCategoryTabs;
