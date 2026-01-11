


const RequestDetails = () => {

    return (
        <section className="mt-8 rounded-2xl bg-white p-6">
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Request Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Provide comprehensive information about your project
                </p>
            </div>

            {/* FORM GRID */}
            <div className="space-y-5">
                {/* PROJECT TITLE */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Title
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Brand Logo Redesign"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>

                {/* PRIORITY + DEADLINE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* PRIORITY */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority Level
                        </label>

                        <select
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* DEADLINE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deadline
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                {/* PROJECT DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Description
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Describe your project in detail. Include objectives, target audience, style preferences, and any specific requirements..."
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm
                       resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>
        </section>
    );
}


export default RequestDetails