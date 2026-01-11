import React from "react";

import { resolvePrice } from "../../utils/priceResolver";
import { formatPrice } from "../../utils/formatPrice";

const OrderSummary = ({ plan, tier, billingCycle, region }) => {
    if (!plan || !tier) return null;

    const priceData = resolvePrice(tier.basePrice[billingCycle], region);

    const displayPrice = formatPrice(
        priceData.display.amount,
        priceData.display.code
    );

    return (
        <div className="rounded-2xl bg-white max-w-2xl p-6 shadow-sm border-gray-200 border">
            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="mt-4 flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    ↑
                </div>
                <div>
                    <div className="font-medium">
                        {plan} – {tier.name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {tier.description || "Maintain consistent social media presence"}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-2 mt-6 space-y-3 text-sm">
                <Row label="Package" value={`Baraly ${plan}`} />
                <Row label="Tier" value={tier.name} />
                <Row label="Billing Period" value={billingCycle} />
            </div>

            <div className="border-t border-gray-200 pt-2 mt-6 flex items-end justify-between">
                <span className="text-base font-light text-gray-900">Total</span>
                <div className="text-right">
                    <div className="text-lg font-light text-gray-950">{displayPrice}</div>
                    <div className="text-xs text-gray-500">
                        {billingCycle === "monthly" ? "per month" : "per year"}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex py-3 rounded-xl items-center justify-center w-full bg-[#EFF6FF] relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>
                <span className="text-xs text-gray-500">Your payment information is secure and encrypted</span>
            </div>
        </div>
    );
};

const Row = ({ label, value }) => (
    <div className="flex justify-between text-gray-600">
        <span>{label}</span>
        <span className="text-gray-900">{value}</span>
    </div>
);

export default OrderSummary;
