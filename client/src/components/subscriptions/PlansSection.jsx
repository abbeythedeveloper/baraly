import React from "react";
import { useNavigate } from "react-router-dom";
import PlanTierCard from "./PlanTierCard";
import { plans } from "../../data/subscriptionPlans";


const PlansSection = ({
    activeCategory,
    billingCycle,
    selectedTierId,
    onSelectPlan,
    region,
    isLocked,
}) => {
    const navigate = useNavigate(); // ✅ hook INSIDE component

    const category = plans[activeCategory];
    if (!category) return null;

    const handleSelectPlan = (tier) => {
        // optional: update local/UI state
        onSelectPlan(activeCategory, tier);

        // ✅ navigation happens ONLY on click
        navigate("/app/checkout", {
            state: {
                plan: activeCategory, // MUST match plans keys
                tierId: tier.id,
                billingCycle,
            },
        });
    };


    return (
        <section className="mt-10">
            <div className="text-center mb-10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-emerald-700 text-white shadow-lg" />
                <h2 className="text-xl font-semibold text-gray-900">
                    Baraly {activeCategory}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    {category.tagline}
                </p>
            </div>

            <div
                className={`grid grid-cols-1 gap-6 px-4 sm:px-0 justify-center
                    ${category.tiers.length === 1 && "md:grid-cols-1 max-w-xl mx-auto"}
                    ${category.tiers.length === 2 && "md:grid-cols-2 max-w-4xl mx-auto"}
                    ${category.tiers.length >= 3 && "md:grid-cols-3 max-w-5xl mx-auto"}
                `}
            >
                {category.tiers.map((tier) => (
                    <PlanTierCard
                        key={tier.id}
                        tier={tier}
                        billingCycle={billingCycle}
                        isActiveTier={selectedTierId === tier.id}
                        onSelect={() => handleSelectPlan(tier)}
                        isLocked={isLocked}
                        region={region}
                    />
                ))}
            </div>
        </section>
    );
};

export default PlansSection;
