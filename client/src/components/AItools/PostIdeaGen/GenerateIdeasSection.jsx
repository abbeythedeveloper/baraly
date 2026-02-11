import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";


const GenerateIdeasSection = ({ ideaPrompt, setIdeaPrompt, generateIdea, isGenerating, mediaType, MEDIA_OPTIONS, setMediaType, isOpen, setIsOpen }) => {




    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">

            {/* Title */}
            <div className="space-y-1">
                <h2 className="text-sm font-medium text-slate-900">
                    Generate Ideas
                </h2>
                <p className="text-sm text-slate-600">
                    Customize your content idea generation (optional – leave blank for random ideas)
                </p>
            </div>

            {/* Media Type */}
            <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-700">
                    Media Type (Optional)
                </label>

                {/* Trigger */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    {mediaType.label}
                    <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg"
                        >
                            {MEDIA_OPTIONS.map((option) => {
                                const isSelected = option.value === mediaType.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setMediaType(option);
                                            setIsOpen(false);
                                        }}
                                        className={`flex w-full items-center px-3 py-2 text-sm transition
                ${isSelected
                                                ? "bg-emerald-50 text-emerald-700 font-medium"
                                                : "text-slate-700 hover:bg-slate-100"
                                            }
              `}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* Idea Prompt */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    What kind of ideas do you want? (Optional)
                </label>
                <textarea
                    rows={3}
                    value={ideaPrompt}
                    onChange={(e) => setIdeaPrompt(e.target.value)}
                    placeholder="Leave blank for completely random ideas, or specify: e.g. Product promotions for a fitness brand..."
                    className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />

                <p className="text-xs text-slate-500 flex items-center gap-1">
                    💡 Tip: Leave this empty to get completely random content ideas
                </p>
            </div>

            {/* Generate Button */}
            <button
                onClick={generateIdea}
                disabled={isGenerating}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#13BF9E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#13BF9E]/90"
            >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Random Idea"}
            </button>
        </div>
    )
}

export default GenerateIdeasSection