import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import RequestsHeader from "../components/Requests/Layouts/RequestsHeader";
import RequestsTabs from "../components/Requests/Layouts/RequestsTabs";
import NewRequestView from "../components/Requests/views/NewRequestView";
import DraftsView from "../components/Requests/Views/DraftsView";
import HistoryView from "../components/Requests/Views/HistoryView";

const Requests = () => {
    const location = useLocation();

    // derive active tab from URL
    const activeTab = location.pathname.includes("drafts")
        ? "drafts"
        : location.pathname.includes("history")
            ? "history"
            : "new";

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 md:px-10">
            <div className="max-w-6xl space-y-4">
                <RequestsHeader />
                <RequestsTabs activeTab={activeTab} />

                <Routes>
                    <Route path="/" element={<Navigate to="new" replace />} />

                    <Route
                        path="new"
                        element={<NewRequestView />}
                    />

                    <Route path="drafts" element={<DraftsView />} />
                    <Route path="history" element={<HistoryView />} />
                </Routes>
            </div>
        </div>
    );
};

export default Requests;
