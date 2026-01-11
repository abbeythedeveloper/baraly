// Region → Display Currency + Paystack Charge Currency
// Paystack supports: NGN, USD only

export const REGION_CURRENCY = {
    Africa: {
        display: {
            code: "NGN",
            symbol: "₦ ",
            label: "NG Naira",
        },
        charge: {
            code: "NGN", // Paystack
        },
    },

    Europe: {
        display: {
            code: "EUR",
            symbol: "€ ",
            label: "Euro",
        },
        charge: {
            code: "USD", // Paystack limitation
        },
    },

    Americas: {
        display: {
            code: "USD",
            symbol: "$ ",
            label: "US Dollar",
        },
        charge: {
            code: "USD",
        },
    },

    Asia: {
        display: {
            code: "JPY", // neutral display for now
            symbol: "¥ ",
            label: "JP Yen",
        },
        charge: {
            code: "USD",
        },
    },
};
