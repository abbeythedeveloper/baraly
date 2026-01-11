import { useNavigate } from "react-router-dom";

const RequestsTabs = ({ activeTab }) => {
    const navigate = useNavigate();

    return (
        <div className="rounded-full bg-gray-100 p-1 flex gap-1">
            <button
                onClick={() => navigate("/app/requests/new")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${activeTab === "new"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                New Request
            </button>

            <button
                onClick={() => navigate("/app/requests/drafts")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${activeTab === "drafts"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                Drafts
            </button>

            <button
                onClick={() => navigate("/app/requests/history")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${activeTab === "history"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
            >
                History
            </button>
        </div>
    );
};

export default RequestsTabs;
