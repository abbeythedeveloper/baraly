

const HistoryFilters = ({
    query,
    onQueryChange,
    status,
    onStatusChange,
}) => {
    return (
        <>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Search requests"
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500"
                    />

                </div>
                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full sm:w-48 rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-white focus:ring-1 focus:ring-emerald-500"
                >
                    <option value="all">All statuses</option>
                    <option value="completed">Completed</option>
                    <option value="in_progress">In progress</option>
                </select>
            </div>
        </>
    );
}

export default HistoryFilters

