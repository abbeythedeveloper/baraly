export const getSubscriptionFlags = (subscription) => {
    if (!subscription || !subscription.status) {
        return {
            isActive: false,
            isLocked: false,
            banner: null,
        };
    }

    switch (subscription.status) {
        case "active":
            return {
                isActive: true,
                isLocked: true,
                banner: null,
            };

        case "cancelling":
            return {
                isActive: true, // still usable
                isLocked: true,
                banner: "Your subscription will end soon. You’ll keep access until it expires.",
            };

        case "past_due":
            return {
                isActive: true, // grace period
                isLocked: true,
                banner: "Payment failed. Please update your payment method to avoid interruption.",
            };

        case "cancelled":
            return {
                isActive: false,
                isLocked: false,
                banner: "Your subscription has ended. Choose a plan to continue.",
            };

        default:
            return {
                isActive: false,
                isLocked: false,
                banner: null,
            };
    }
};
