import React from "react";

const DEV_REGION_KEY = "__dev_region_override__";

const REGIONS = ["Africa", "Europe", "Americas", "Asia"];

export default function RegionDevToggle() {
    if (!import.meta.env.DEV) return null;

    const current = localStorage.getItem(DEV_REGION_KEY) ?? "Auto";

    const setRegion = (region) => {
        if (region === "Auto") {
            localStorage.removeItem(DEV_REGION_KEY);
        } else {
            localStorage.setItem(DEV_REGION_KEY, region);
        }

        // force full recalculation
        window.location.reload();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-dashed border-emerald-400 bg-white p-3 shadow-lg">
            <p className="mb-2 text-xs font-semibold text-emerald-700">
                DEV: Region Override
            </p>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setRegion("Auto")}
                    className={`px-3 py-1 rounded-full text-xs border ${current === "Auto"
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-700"
                        }`}
                >
                    Auto
                </button>

                {REGIONS.map((region) => (
                    <button
                        key={region}
                        onClick={() => setRegion(region)}
                        className={`px-3 py-1 rounded-full text-xs border ${current === region
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
    );
}
