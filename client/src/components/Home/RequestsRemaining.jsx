import {
    graphicIcon,
    motionIcon,
    videoIcon,
} from "../../assets/assets";
import RequestQuotaCard from "../dashboard/RequestQuotaCard";
import { resolveQuotas } from "../../utils/resolveQuotas";
import { useAuth } from "../../contexts/authContext/UseAuth";
import { Link } from "react-router-dom";

const ICON_MAP = {
    graphics: graphicIcon,
    motion: motionIcon,
    reels: videoIcon,
};

const COLOR_MAP = {
    graphics: "from-purple-500 to-pink-500",
    motion: "from-orange-500 to-red-500",
    reels: "from-blue-500 to-cyan-500",
};

const BG_MAP = {
    graphics: "bg-purple-50",
    motion: "bg-orange-50",
    reels: "bg-blue-50",
};

export default function RequestsRemaining() {
    const { userData } = useAuth();

    const subscription = userData?.subscription;
    const usage = userData?.usage || {};

    // 🚨 EMPTY STATE 1 — No subscription at all
    if (!subscription || subscription.status !== "active") {
        return (
            <div className="rounded-2xl shadow-lg bg-white p-6 text-center">
                <h3 className="font-semibold text-lg">Requests Remaining</h3>
                <p className="mt-2 text-sm text-gray-500">
                    You don’t have an active subscription yet.
                </p>
                <Link to="/app/subscription">

                    <button
                        className="mt-4 cursor-pointer rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        Upgrade to unlock requests
                    </button>
                </Link>
            </div>
        );
    }

    const quotas = resolveQuotas(subscription, usage);

    // 🚨 EMPTY STATE 2 — Subscription exists but ALL limits are zero
    const allLocked = quotas.every(
        (q) => q.total === 0 || q.used >= q.total
    );

    if (allLocked) {
        return (
            <div className="rounded-2xl shadow-lg bg-white p-6 text-center">
                <h3 className="font-semibold text-lg">Requests Remaining</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Your current plan does not include request credits.
                </p>
                <Link to="/app/subscription">
                    <button
                        className="mt-4 cursor-pointer rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        Upgrade your plan
                    </button>
                </Link>
            </div>
        );
    }

    // ✅ NORMAL STATE — show quotas
    return (
        <div className="rounded-2xl shadow-lg bg-white p-6">
            <h3 className="font-semibold text-lg">Requests Remaining</h3>
            <p className="text-sm text-gray-500">
                Track your available requests by service this month
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {quotas.map((q) => (
                    <RequestQuotaCard
                        key={q.key}
                        name={q.name}
                        used={q.used}
                        total={q.total}
                        icon={ICON_MAP[q.key]}
                        color={COLOR_MAP[q.key]}
                        bg={BG_MAP[q.key]}
                    />
                ))}
            </div>
        </div>
    );
}
