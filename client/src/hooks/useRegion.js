import { useEffect, useState } from "react";
import { resolveRegionFromCountry } from "../utils/countryToRegion";

const CACHE_KEY = "user_region";
const DEV_REGION_KEY = "__dev_region_override__";

export function useRegion(ipData) {
    const [region, setRegion] = useState(null);
    const isDev = import.meta.env.DEV;

    useEffect(() => {
        // 1. DEV override
        if (isDev) {
            const devRegion = localStorage.getItem(DEV_REGION_KEY);
            if (devRegion) {
                setRegion(devRegion);
                return;
            }
        }

        // 2. Cached region
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            setRegion(cached);
            return;
        }

        // 3. IP-based resolution
        const countryCode = ipData?.country_code;

        if (countryCode) {
            const resolved = resolveRegionFromCountry(countryCode);
            localStorage.setItem(CACHE_KEY, resolved);
            setRegion(resolved);
        }
    }, [ipData, isDev]);

    return region;
}
