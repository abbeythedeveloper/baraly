import { SUBSCRIPTION_QUOTAS } from "../config/subscriptionQuotas";

export function resolveQuotas(subscription, usage) {
    const tier = subscription?.tier || "Starter";
    const limits = SUBSCRIPTION_QUOTAS[tier];

    return [
        {
            key: "graphics",
            name: "Graphics Design",
            used: usage.graphics ?? 0,
            total: limits.graphics,
        },
        {
            key: "motion",
            name: "Motion Graphics",
            used: usage.motion ?? 0,
            total: limits.motion,
        },
        {
            key: "reels",
            name: "Reel Videos",
            used: usage.reels ?? 0,
            total: limits.reels,
        },
    ];
}
