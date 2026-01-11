
import { Timestamp } from "firebase/firestore";

const statusStyles = {
    completed: "bg-emerald-100 text-emerald-700",
    in_progress: "bg-amber-100 text-amber-700",
};

const priorityStyles = {
    high: "bg-orange-100 text-orange-700",
    medium: "bg-blue-100 text-blue-700",
    low: "bg-gray-100 text-gray-600",
};

const HistoryCard = ({ item }) => {

    function formatDate(ts) {
        if (!ts) return "—";
        if (ts instanceof Timestamp) {
            return ts.toDate().toLocaleDateString();
        }
        return "—";
    }
    return (
        <div className="flex items-center justify-between rounded-2xl border bg-white px-6 py-4 shadow-sm">
            {/* Left */}
            <div className="flex items-start gap-4">


                <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">
                        {item.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                        {item.service}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span
                            className={`rounded-full px-2 py-0.5 font-medium ${statusStyles[item.status]}`}
                        >
                            {item.status.replace("_", " ")}
                        </span>

                        <span
                            className={`rounded-full px-2 py-0.5 font-medium ${priorityStyles[item.priority]}`}
                        >
                            {item.priority}
                        </span>

                        <span className="text-gray-500">
                            Requested: {formatDate(item.requestedAt)}
                        </span>

                        {item.deliveredAt && (
                            <span className="text-gray-500">
                                Delivered: {formatDate(item.deliveredAt)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                    View
                </button>

                {item.status === "completed" && (
                    <button
                        type="button"
                        className="rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        Download
                    </button>
                )}
            </div>
        </div>
    );
}

export default HistoryCard