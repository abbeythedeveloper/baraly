// src/components/SubscriptionCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SubscriptionCard({ userData }) {
    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="text-sm text-gray-500 mb-3">Subscription</h3>

            <div className="border rounded-lg p-3">
                <div className="text-sm font-medium">Baraly {userData.subscription?.plan || "No Active Plan"}</div>
                <div className="mt-2">
                    <span className="inline-block bg-[#0DBF8C]/10 text-[#0DBF8C] px-2 py-1 rounded-md text-xs">
                        {userData.subscription?.plan || "No Active Plan"} - {userData.subscription?.tier || "No Active Tier"}
                    </span>
                </div>

                <div className="text-xs text-gray-500 mt-3">
                    Next Billing:{" "}
                    {userData.subscription?.expiresAt
                        ? userData.subscription.expiresAt.toDate().toLocaleDateString()
                        : "—"}
                </div>

                <div className="mt-3">
                    <Link to="/app/subscription">
                        <button className="w-full text-sm border rounded-md px-3 py-2">Manage Subscription</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
