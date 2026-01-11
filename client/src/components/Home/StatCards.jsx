export default function StatCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border p-6">
                <p className="text-sm text-gray-500">In Progress</p>
                <h3 className="text-3xl font-bold mt-2">3</h3>
                <p className="text-sm text-gray-500 mt-1">Active projects</p>

                <button className="mt-4 text-sm text-emerald-600 font-medium flex items-center gap-1">
                    View all →
                </button>
            </div>

            <div className="rounded-2xl border p-6">
                <p className="text-sm text-gray-500">Completed</p>
                <h3 className="text-3xl font-bold mt-2">8</h3>
                <p className="text-sm text-emerald-600 mt-1">
                    ↗ +20% from last month
                </p>
            </div>
        </div>
    );
}
