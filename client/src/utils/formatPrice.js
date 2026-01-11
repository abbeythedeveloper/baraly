export function formatPrice(amount, currencyCode) {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
