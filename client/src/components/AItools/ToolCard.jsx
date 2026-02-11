import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function ToolCard({
    icon,
    iconColor,
    iconBg,
    title,
    description,
    features,
    link,
}) {
    return (
        <div className="bg-white rounded-3xl flex flex-col gap-6 shadow-sm border max-w-xl border-gray-200">
            <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}>
                    <span className={`text-2xl ${iconColor}`}>{icon}</span>
                </div>

                <h3 className="flex items-center text-lg font-semibold gap-2">{title} < Sparkles className="text-[#13bf9e] w-4 h-4" /></h3>
                <p className="text-gray-500 mt-1 text-sm">{description}</p>

            </div>
            <div className="px-6 last:pb-6 space-y-4" >
                <ul className="space-y-2.5">
                    {features.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#13BF9E] shrink-0"></div> {item}
                        </li>
                    ))}
                </ul>

                <Link
                    to={link}
                    className="inline-flex text-white items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-[#13BF9E] hover:bg-[#13BF9E]/90 shadow-sm"
                >
                    Launch Tool <FiArrowRight />
                </Link>

            </div>
        </div>
    );
}
