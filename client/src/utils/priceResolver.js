import { REGION_MULTIPLIER } from "./regionMultipliers";
import { resolveCurrency } from "./currencyResolver";

/**
 * Resolves final display-ready pricing
 * @param {number} baseAmount - base price (e.g. 299)
 * @param {string} region - Africa | Europe | Americas | Asia
 */
export function resolvePrice(baseAmount, region) {
    const multiplier = REGION_MULTIPLIER[region] ?? 1;

    const adjustedAmount = Math.round(baseAmount * multiplier);

    const currency = resolveCurrency(region);

    return {
        baseAmount,
        adjustedAmount,
        display: {
            amount: adjustedAmount,
            symbol: currency.display.symbol,
            code: currency.display.code,
        },
        charge: {
            currency: currency.charge.code,
        },
    };
}
