export default function RequestQuotaCard({
    name,
    used,
    total,
    icon,
    color,
    bg,
}) {
    const isUnlimited = total === Infinity;
    const isExhausted = !isUnlimited && used >= total;

    const progress = isUnlimited
        ? 100
        : total > 0
            ? (used / total) * 100
            : 0;

    return (
        <div
            className={`rounded-xl p-4 ${bg} ${isExhausted ? "opacity-60 grayscale" : ""
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="rounded-xl shadow-sm flex items-center justify-center">
                    <img src={icon} alt={name} className="h-10 w-10" />
                </div>
                <p className="text-sm font-medium">{name}</p>
            </div>

            <p className="font-semibold ml-14 -mt-1.5 text-sm">
                {isUnlimited ? "Unlimited" : `${used} / ${total}`}
            </p>

            <div className="mt-3 h-2 w-full rounded-full bg-white">
                <div
                    className={`h-full rounded-full bg-linear-to-r ${isExhausted ? "from-gray-300 to-gray-400" : color
                        }`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Exhausted state */}
            {isExhausted && (
                <p className="mt-2 text-xs text-red-500 font-medium">
                    Limit reached — upgrade to continue
                </p>
            )}
        </div>
    );
}
