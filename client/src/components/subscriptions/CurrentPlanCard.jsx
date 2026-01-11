import React from "react";

const CurrentPlanCard = ({ currentPlan, resolvedPlan, onCancel }) => {
    // Truly no subscription at all
    if (!currentPlan) {
        return (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/40 px-6 py-5">
                <h3 className="text-sm font-semibold text-emerald-800">
                    No active subscription
                </h3>
                <p className="text-xs text-emerald-700 mt-1">
                    Choose a plan below to get started with Baraly.
                </p>
            </div>
        );
    }

    const {
        planName,
        tierName,
        billingCycle,
        priceUSD,
        expiresAt,
        status,
    } = currentPlan;


    const nextBillingDate = expiresAt
        ? expiresAt.toDate().toLocaleDateString()
        : "—";

    return (
        <div className="rounded-3xl border border-emerald-400 bg-white px-4 sm:px-6 py-5 shadow-[0_0_35px_rgba(16,185,129,0.25)]flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-gradient-to-br from-emerald-400 to-emerald-700 text-white">
                    ★
                </div>

                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                            {planName}{tierName !== "—" && ` — ${tierName}`}
                        </h3>

                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {status}
                        </span>
                    </div>

                    <p className="text-xs text-gray-500">
                        Your current subscription
                    </p>

                    <p className="mt-1 text-[11px] text-gray-500">
                        Next billing: {nextBillingDate}
                        {priceUSD != null && billingCycle && (
                            <>
                                {" "}• ${priceUSD.toLocaleString()}/{billingCycle}
                            </>
                        )}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
                Cancel Plan
            </button>
        </div>
    );
};

export default CurrentPlanCard;
