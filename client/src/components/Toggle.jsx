const Toggle = ({ enabled, setEnabled }) => {
    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${enabled ? "bg-[#19c2a0]" : "bg-gray-300"
                }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-1"
                    }`}
            />
        </button>
    );
};

export default Toggle;
