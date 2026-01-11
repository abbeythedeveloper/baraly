import { useEffect, useState } from "react";

export function useIpData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchIp() {
            try {
                const res = await fetch("https://ipwho.is/");
                const json = await res.json();

                if (!json.success) {
                    throw new Error("IP lookup failed");
                }

                if (!cancelled) {
                    setData(json);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                    setLoading(false);
                }
            }
        }

        fetchIp();

        return () => {
            cancelled = true;
        };
    }, []);

    return { data, loading, error };
}
