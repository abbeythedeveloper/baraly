import React from "react";

export default function FeatureList({ items }) {
    return (
        <ul className="space-y-2 text-sm text-gray-700">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-500">•</span> {item}
                </li>
            ))}
        </ul>
    );
}
