import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = () => {
    return (
        <Link to="/app/subscription">
            <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-emerald-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
                Back to Plans
            </button>
        </Link>
    );
};

export default BackButton