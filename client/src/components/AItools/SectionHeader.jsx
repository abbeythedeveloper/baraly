import React from "react";

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-8 md:mb-10">
            <h1 className="text-gray-900 mb-2 font-semibold">{title}</h1>
            <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
        </div>
    );
}

export default SectionHeader
