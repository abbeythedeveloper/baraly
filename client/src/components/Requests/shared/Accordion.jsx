import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="rounded-xl border border-gray-200 bg-white">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
                <span className="text-sm font-semibold text-gray-900">
                    {title}
                </span>

                <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="border-t border-gray-100 px-5 py-4">
                    {children}
                </div>
            )}
        </div>
    );
}

export default Accordion;
