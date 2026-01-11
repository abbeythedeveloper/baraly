const requests = [
    { title: "Brand Logo Design", meta: "Graphics Design · 2 days ago", status: "In Progress" },
    { title: "Product Launch Video", meta: "Video Production · 5 days ago", status: "Completed" },
    { title: "Social Media Graphics Pack", meta: "Graphics Design · 1 week ago", status: "In Progress" },
];

export default function RecentRequests() {
    return (
        <div className="rounded-2xl border p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent Requests</h3>
                <button className="text-sm text-emerald-600">View all</button>
            </div>

            <div className="space-y-3">
                {requests.map((r) => (
                    <div
                        key={r.title}
                        className="flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                        <div>
                            <p className="font-medium">{r.title}</p>
                            <p className="text-sm text-gray-500">{r.meta}</p>
                        </div>

                        <span
                            className={`text-xs px-3 py-1 rounded-full ${r.status === "Completed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {r.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
