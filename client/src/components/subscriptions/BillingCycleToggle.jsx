import React from "react";

const BillingCycleToggle = ({ billingCycle, setBillingCycle }) => {
    return (
        <div className="inline-flex w-2xl space-x-1.5 items-center rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm">
            <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`flex-2 px-4 py-2 text-sm font-medium cursor-pointer rounded-xl transition
        ${billingCycle === "monthly"
                        ? "bg-white text-gray-500 shadow"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
            >
                Monthly
            </button>
            <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`relative flex-3 py-2 text-sm font-medium cursor-pointer rounded-xl transition
        ${billingCycle === "yearly"
                        ? "bg-white text-gray-500 shadow"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
            >
                Annual
                <span className="ml-1 text-[11px] font-semibold text-emerald-500">
                    Save up to 20%
                </span>
            </button>
        </div>
    );
};

export default BillingCycleToggle;
