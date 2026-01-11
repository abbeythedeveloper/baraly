import React from 'react'

const ServiceCard = ({ icon: Icon, label, gradient, active, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center
        gap-3 rounded-xl cursor-pointer border px-6 py-5
        transition-all duration-200 hover:scale-[1.02]
        ${active
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 bg-white hover:border-gray-400"}
      `}
        >
            {/* ICON CIRCLE */}
            <div
                className={`
          flex h-12 w-12 items-center justify-center
          rounded-xl bg-linear-to-br ${gradient}
        `}
            >
                <Icon className="h-6 w-6 text-white" />
            </div>

            {/* LABEL */}
            <span className="text-sm font-medium text-gray-900">
                {label}
            </span>
        </button>
    );
}

export default ServiceCard