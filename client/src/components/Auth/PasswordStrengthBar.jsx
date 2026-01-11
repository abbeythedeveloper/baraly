import { evaluatePassword } from "../../utils/passwordStrength";

export default function PasswordStrengthBar({ password }) {
    const { score, label, rules } = evaluatePassword(password);

    const percent = (score / 3) * 100;

    const color =
        score === 3
            ? "bg-emerald-500"
            : score === 2
                ? "bg-yellow-500"
                : "bg-red-500";

    return (
        <div className="mt-2 space-y-2">
            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${color}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            {/* Label */}
            <p className="text-xs font-medium text-gray-600">
                Password strength:{" "}
                <span className="font-semibold">{label}</span>
            </p>

            {/* Rules */}
            <ul className="text-xs space-y-1">
                <li className={rules.length ? "text-emerald-600" : "text-gray-400"}>
                    • At least 10 characters
                </li>
                <li className={rules.uppercase ? "text-emerald-600" : "text-gray-400"}>
                    • At least one uppercase letter
                </li>
                <li className={rules.special ? "text-emerald-600" : "text-gray-400"}>
                    • At least one special character
                </li>
            </ul>
        </div>
    );
}
