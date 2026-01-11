const AdditionalNotes = ({ value = "", onChange }) => {
    return (
        <div className="mt-8">
            <h4 className="text-sm font-semibold text-gray-900">
                Additional Notes
            </h4>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Any other information that might be helpful..."
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
        </div>
    );
};

export default AdditionalNotes;
