import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { plans } from "../data/subscriptionPlans";
import CheckoutLayout from "../components/subscriptions/CheckoutLayout";
import { useIpData } from "../hooks/useIpData";
import { useRegion } from "../hooks/useRegion";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    const { data: ipData, loading } = useIpData();
    const region = useRegion(ipData);

    // Guard: no navigation state
    useEffect(() => {
        if (!state) {
            navigate("/app/subscription", { replace: true });
        }
    }, [state, navigate]);

    if (!state || loading || !region) return null;

    const { plan, tierId, billingCycle } = state;

    const selectedPlan = plans[plan];
    if (!selectedPlan) {
        navigate("/app/subscription", { replace: true });
        return null;
    }

    const selectedTier = selectedPlan.tiers.find(
        (tier) => tier.id === tierId
    );

    if (!selectedTier || !selectedTier.basePrice?.[billingCycle]) {
        navigate("/app/subscription", { replace: true });
        return null;
    }

    return (
        <CheckoutLayout
            plan={plan}
            tier={selectedTier}
            billingCycle={billingCycle}
            region={region}
        />
    );
}
