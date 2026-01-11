
import { useNavigate } from "react-router-dom";

const priorityStyles = {
    high: "bg-orange-100 text-orange-700",
    medium: "bg-blue-100 text-blue-700",
    low: "bg-gray-100 text-gray-600",
};

const DraftCard = ({ draft }) => {

    return (
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
            {/* Left */}
            <div className="flex items-start gap-4">
                <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">
                        {draft.title}
                    </h4>

                    <p className="text-sm text-gray-500">
                        {draft.service}
                    </p>

                    <p className="text-sm text-gray-600 max-w-xl">
                        {draft.description}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                        <span
                            className={`rounded-full px-2 py-0.5 font-medium ${priorityStyles[draft.priority]}`}
                        >
                            {draft.priority}
                        </span>

                        <span>
                            📅 Deadline: {draft.deadline}
                        </span>

                        <span>
                            💾 Saved: {draft.savedAt}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="rounded-lg border px-3 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                >
                    ✏️ Edit
                </button>

                <button
                    type="button"
                    className="rounded-lg border px-3 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                >
                    🗑️ Delete
                </button>

            </div>
        </div>
    );
};

export default DraftCard;
