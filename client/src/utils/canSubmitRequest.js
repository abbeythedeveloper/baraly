import { SUBSCRIPTION_QUOTAS } from "../config/subscriptionQuotas";

export function canSubmitRequest(subscription, usage, type) {
    const tier = subscription?.tier;
    if (!tier) return false;

    const limit = SUBSCRIPTION_QUOTAS[tier]?.[type];

    // Unlimited tier
    if (limit === Infinity) return true;

    const used = usage?.[type] ?? 0;

    return used < limit;
}
