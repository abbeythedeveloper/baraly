// import { useState, useEffect } from "react";
import HistoryCard from "../components/HistoryCard";
import HistoryFilters from "../components/HistoryFilters";
// import { useAuth } from "../../../contexts/authContext/UseAuth";



const HistoryView = () => {
    // const [query, setQuery] = useState("");
    // const [status, setStatus] = useState("all");
    // const { currentUser } = useAuth();


    // const filtered = items.filter((item) => {
    //     const matchesQuery =
    //         item.title.toLowerCase().includes(query.toLowerCase()) ||
    //         item.service.toLowerCase().includes(query.toLowerCase());

    //     const matchesStatus =
    //         status === "all" ? true : item.status === status;

    //     return matchesQuery && matchesStatus;
    // });
    // if (loading) {
    //     return (
    //         <div className="mt-8 text-sm text-gray-500">
    //             Loading request history…
    //         </div>
    //     );
    // }

    // if (items.length === 0) {
    //     return (
    //         <div className="mt-8 rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
    //             You have no request history yet.
    //         </div>
    //     );
    // }


    return (
        <div className="mt-6 space-y-6">
            <div className="w-full px-4 py-10 space-y-8 rounded-xl bg-white border border-gray-200 drop-shadow-md">
                <div className="space-y-2">
                    <h1 className="text-xl font-medium tracking-tight text-gray-600">Requests History</h1>
                    <p className="text-sm text-gray-500">View and track your previous requests</p>
                </div>
                <HistoryFilters
                // query={query}
                // onQueryChange={setQuery}
                // status={status}
                // onStatusChange={setStatus}
                />

            </div>
            {/* {filtered.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
                    No requests match your filters.
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((item) => (
                        <HistoryCard key={item.id} item={item} />
                    ))}
                </div>
            )} */}
        </div>
    );
}

export default HistoryView