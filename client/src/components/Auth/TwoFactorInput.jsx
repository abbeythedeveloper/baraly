import { useRef } from "react";

const TwoFactorInput = ({ value, onChange }) => {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/g, "");
        if (!val) return;

        const newValue =
            value.substring(0, index) +
            val[0] +
            value.substring(index + 1);

        onChange(newValue);

        if (index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (value[index]) {
                const newValue =
                    value.substring(0, index) +
                    "" +
                    value.substring(index + 1);
                onChange(newValue);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
        if (pasteData.length === 6) {
            onChange(pasteData);
            inputsRef.current[5]?.focus();
        }
    };

    return (
        <div
            className="flex justify-between gap-3"
            onPaste={handlePaste}
        >
            {[...Array(6)].map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={value[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="
            w-12 h-14
            text-center
            text-xl
            font-semibold
            rounded-xl
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-400
            focus:border-emerald-400
            transition
          "
                />
            ))}
        </div>
    );
};

export default TwoFactorInput;