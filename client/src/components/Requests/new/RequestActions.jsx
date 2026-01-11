const RequestActions = () => {
    return (
        <div className="flex gap-3 justify-end">
            <button
                className="rounded-lg border px-3 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
            >
                Submit Request
            </button>
            <button
                className="rounded-lg border px-3 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
            >
            </button>

            <button
                className={`
                    rounded-lg
                    border
                    px-3 py-2
                    text-sm
                    text-gray-600
                    cursor-pointer
                    hover:bg-gray-50
                    
                `}
            // ${isEditMode ? "hidden" : ""}
            >
                Cancel Edit
            </button>
        </div>
    );
};

export default RequestActions;
