export default function BrandIdentityCard() {
    return (
        <div className="rounded-2xl border p-6 flex items-center justify-between gap-6">
            <div>
                <h3 className="font-semibold">Brand Identity</h3>
                <p className="text-sm text-gray-500">
                    Manage your brand colors, keywords, and moodboards
                </p>

                <div className="mt-4 flex items-center gap-6">
                    <div className="flex gap-2">
                        <div className="h-6 w-6 rounded bg-purple-600" />
                        <div className="h-6 w-6 rounded bg-pink-500" />
                        <div className="h-6 w-6 rounded bg-blue-500" />
                    </div>

                    <div className="flex gap-2">
                        {["Modern", "Creative", "Bold"].map((k) => (
                            <span
                                key={k}
                                className="px-3 py-1 rounded-full bg-gray-100 text-xs"
                            >
                                {k}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white">
                Manage Brand
            </button>
        </div>
    );
}
