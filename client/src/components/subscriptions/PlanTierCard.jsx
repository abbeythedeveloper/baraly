import React from "react";
import { resolvePrice } from "../../utils/priceResolver";
import { formatPrice } from "../../utils/formatPrice";

const PlanTierCard = ({
    tier,
    billingCycle,
    isActiveTier,
    region,
    onSelect,
    isLocked,
}) => {
    // 🔒 Guard: pricing object missing
    if (!tier.basePrice) {
        console.warn("Tier missing basePrice:", tier);
        return null;
    }

    const baseAmount = tier.basePrice[billingCycle];

    // 🔒 Guard: billing cycle not supported
    if (typeof baseAmount !== "number") {
        return (
            <div className="rounded-3xl border border-gray-200 p-6 opacity-60">
                <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-gray-500">
                    {billingCycle === "yearly"
                        ? "Yearly billing not available for this plan"
                        : "Pricing unavailable"}
                </p>
            </div>
        );
    }

    // Resolve region-aware price
    const priceData = resolvePrice(baseAmount, region);

    const displayPrice = formatPrice(
        priceData.display.amount,
        priceData.display.code
    );

    // Compute yearly savings safely
    // Resolve monthly and yearly prices separately
    const monthlyPriceData =
        typeof tier.basePrice.monthly === "number"
            ? resolvePrice(tier.basePrice.monthly, region)
            : null;

    const yearlyPriceData =
        typeof tier.basePrice.yearly === "number"
            ? resolvePrice(tier.basePrice.yearly, region)
            : null;

    // Compute savings in DISPLAY space
    const yearlySavings =
        monthlyPriceData && yearlyPriceData
            ? monthlyPriceData.display.amount * 12 -
            yearlyPriceData.display.amount
            : null;


    const activeCardClasses =
        "border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.25)] ring-1 ring-emerald-300";
    const inactiveCardClasses = "border-gray-100 hover:border-emerald-200";

    const activeButtonClasses =
        "bg-linear-to-l from-[#0F221F] to-[#13BF9E] cursor-pointer hover:bg-linear-to-r transition-all duration-1000 ease-in-out text-white shadow-md";
    const inactiveButtonClasses =
        "bg-gray-100 cursor-pointer text-gray-800 hover:bg-gray-200 border border-gray-200";
    const labsButtonClasses =
        "bg-linear-to-r from-[#6A7B94] via-[#F2F4F6] to-[#6A7B94] cursor-pointer transition-all duration-1000 ease-in-out shadow-[0_6px_18px_rgba(20,184,166,0.55)] ring-1 ring-emerald-300 rounded-xl";

    return (
        <div
            className={`relative flex flex-col justify-between rounded-3xl border p-4 sm:p-6 transition-all duration-200 ${tier.isLabs
                ? "border-emerald-400 bg-white shadow-[0_0_0_1px_rgba(16,185,129,0.4),0_12px_40px_rgba(16,185,129,0.25)]"
                : tier.isPopular || isActiveTier
                    ? activeCardClasses
                    : inactiveCardClasses
                }`}
        >
            <div>
                <div className="relative flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>

                    {tier.isPopular && (
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-l from-[#0F221F] to-[#13BF9E] px-4 py-1 text-xs font-semibold text-white shadow-md">
                            Most Popular
                        </span>
                    )}

                    {tier.isLabs && (
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-[#6A7B94] via-[#F2F4F6] to-[#6A7B94] px-4 py-1 text-xs font-semibold text-emerald-900 shadow-[0_6px_18px_rgba(20,184,166,0.55)] ring-1 ring-emerald-300">
                            Premium Unlimited
                        </span>
                    )}
                </div>

                <div className="mb-5">
                    <div>
                        <span className="text-lg font-semibold text-gray-900">
                            {displayPrice}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                            /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                    </div>

                    {billingCycle === "yearly" && yearlySavings > 0 && (
                        <span className="text-[11px] font-semibold text-emerald-500">
                            save {formatPrice(yearlySavings, monthlyPriceData.display.code)}/year
                        </span>
                    )}

                </div>

                <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
                    {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="text-emerald-500">✓</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                onClick={onSelect}
                disabled={isLocked}
                className={`mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 min-h-[48px] text-sm font-medium transition ${isLocked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : tier.isLabs
                        ? labsButtonClasses
                        : tier.isPopular || isActiveTier
                            ? activeButtonClasses
                            : inactiveButtonClasses
                    }`}
            >
                {isLocked
                    ? "Plan Locked"
                    : tier.isLabs
                        ? "Get Premium Access"
                        : "Select Plan"}
                <span className="ml-2 text-lg leading-none">→</span>
            </button>

            {isLocked && (
                <p className="mt-3 text-sm text-gray-500 text-center">
                    You already have an active subscription. Cancel it to switch plans.
                </p>
            )}
        </div>
    );
};

export default PlanTierCard;
