


export default function SubscriptionCard() {
    return (
        <div className="rounded-2xl bg-[#EFF4F3] drop-shadow-md p-6 border-gray-300">
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white">
                    ★
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                            Baraly Presence – Tier 2
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                            Active
                        </span>
                    </div>

                    <p className="text-lg font-semibold mt-1">
                        $599<span className="text-sm text-gray-500">/month</span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Renews Dec 1, 2025
                    </p>
                </div>
            </div>

            <button className="mt-6 w-full rounded-xl border border-[#e4e4e4] bg-[#EFF4F3] py-2 text-sm font-medium text-[#13BF9E] hover:border-[#16d8b1] hover:text-black transition-colors">
                Manage Plan
            </button>
        </div>
    );
}
