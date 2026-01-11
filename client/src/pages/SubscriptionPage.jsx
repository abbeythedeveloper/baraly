import React, { useState, useRef } from "react";
import BillingCycleToggle from "../components/subscriptions/BillingCycleToggle";
import PlanCategoryTabs from "../components/subscriptions/PlanCategoryTabs";
import PlansSection from "../components/subscriptions/PlansSection";
import CurrentPlanCard from "../components/subscriptions/CurrentPlanCard";
import BillingHistory from "../components/subscriptions/BillingHistory";
import PaymentMethod from "../components/subscriptions/PaymentMethod";
import { getSubscriptionFlags } from "../utils/subscriptionSelectors";
import { useAuth } from "../contexts/authContext/UseAuth";
import { useIpData } from "../hooks/useIpData";
import { useRegion } from "../hooks/useRegion";

const mockInvoices = [
    { id: 1, title: "Baraly Presence - Tier 2", date: "2025-11-01", amount: 599, status: "paid" },
    { id: 2, title: "Baraly Presence - Tier 2", date: "2025-10-01", amount: 599, status: "paid" },
    { id: 3, title: "Baraly Presence - Tier 2", date: "2025-09-01", amount: 599, status: "paid" },
];

const mockPaymentMethod = {
    label: "Visa ending in 4242",
    expires: "12/2026",
};

const SubscriptionPage = () => {
    const { userData } = useAuth();
    const { data: ipData, loading } = useIpData();
    const region = useRegion(ipData);

    const [billingCycle, setBillingCycle] = useState("monthly");
    const [activeCategory, setActiveCategory] = useState("Starter");
    const [selectedTierId, setSelectedTierId] = useState(null);
    const [showActiveSubWarning, setShowActiveSubWarning] = useState(false);
    const warningTimeoutRef = useRef(null);

    const subscription = userData?.subscription;
    const subFlags = getSubscriptionFlags(subscription);

    const currentPlan = subFlags.isActive ? subscription : null;
    const isLocked = subFlags.isLocked;

    if (loading || !region) return null;

    const handleSelectPlan = (categoryName, tier) => {
        if (isLocked) {
            setShowActiveSubWarning(true);

            if (warningTimeoutRef.current) {
                clearTimeout(warningTimeoutRef.current);
            }

            warningTimeoutRef.current = setTimeout(() => {
                setShowActiveSubWarning(false);
            }, 7000);

            return;
        }

        setSelectedTierId(tier.id);
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 md:px-10">
            <div className="mx-auto max-w-5xl space-y-8">
                <header>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Subscription &amp; Billing
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Choose the perfect Baraly package for your creative needs.
                    </p>
                </header>

                <CurrentPlanCard currentPlan={currentPlan} />

                {subFlags.banner && (
                    <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                        {subFlags.banner}
                    </div>
                )}

                <div className="flex flex-col items-center gap-6">
                    <BillingCycleToggle
                        billingCycle={billingCycle}
                        setBillingCycle={setBillingCycle}
                    />

                    <PlanCategoryTabs
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                </div>

                <PlansSection
                    activeCategory={activeCategory}
                    billingCycle={billingCycle}
                    selectedTierId={selectedTierId}
                    onSelectPlan={handleSelectPlan}
                    isLocked={isLocked}
                    region={region}
                />

                <div className="mt-12 grid gap-6 md:grid-cols-1">
                    <BillingHistory invoices={mockInvoices} />
                    <PaymentMethod
                        method={mockPaymentMethod}
                        onUpdate={() => { }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
