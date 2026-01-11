import { REGION_CURRENCY } from "./regionCurrency";

export function resolveCurrency(region) {
    return REGION_CURRENCY[region] ?? REGION_CURRENCY.Africa;
}
