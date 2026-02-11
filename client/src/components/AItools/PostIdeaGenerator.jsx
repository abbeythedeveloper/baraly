import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, X, Info } from "lucide-react";
import GenerateIdeasSection from "./PostIdeaGen/GenerateIdeasSection";
import GenerateIdeaResultCard from "./PostIdeaGen/GenerateIdeaResultCard";
import HowToUse from "./HowToUse";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { generatePostIdea } from "../../Services/postIdeaService";

const PostIdeaGenerator = () => {
    const [generatedIdea, setGeneratedIdea] = useState(null);
    const [ideaPrompt, setIdeaPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const requestLimit = 10;
    const [requestsUsed, setRequestsUsed] = useState(0);


    const MEDIA_OPTIONS = [
        { label: "Any (Random)", value: "any" },
        { label: "Reel", value: "reel" },
        { label: "Video", value: "video" },
        { label: "Graphic", value: "graphic" },
        { label: "Text Post", value: "text" },
    ];

    const [mediaType, setMediaType] = useState(MEDIA_OPTIONS[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const generateIdea = async () => {
        try {
            setIsGenerating(true);
            if (requestsUsed >= requestLimit) {
                setError("Daily Request limit reached. Please upgrade to continue.");
                return;
            }
            const idea = await generatePostIdea({
                mediaType: mediaType.value,
                ideaPrompt,
            });

            setGeneratedIdea(idea);
            setError(null);
            setRequestsUsed((prev) => prev + 1);
        } catch (err) {
            console.error(err);
            setError("Failed to generate idea. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };



    const prepareCalendarPayload = () => {
        if (!generatedIdea) return null;

        return {
            title: generatedIdea.title,
            platform: generatedIdea.platforms,
            description: generatedIdea.summary,
            caption: generatedIdea.caption,
            tips: generatedIdea.tips,
            source: "post_idea_generator",
            createdAt: new Date(),
        };
    };




    return (
        <div className="min-h-screen bg-slate-50 px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl p-8 space-y-8">

                {/* Header */}
                <div className="space-y-3 mb-8">
                    <Link
                        to="/app/tools"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3 mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Tools
                    </Link>

                    <h1 className="text-gray-900 mb-2 flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-purple-500" />
                        <span>
                            Post Idea Generator
                        </span>
                    </h1>

                    <p className="text-grey-600">
                        Get AI-powered content ideas for your brand
                    </p>
                </div>

                {/* Generate Ideas Card */}
                <GenerateIdeasSection
                    ideaPrompt={ideaPrompt}
                    setIdeaPrompt={setIdeaPrompt}
                    generateIdea={generateIdea}
                    isGenerating={isGenerating}
                    mediaType={mediaType}
                    setMediaType={setMediaType}
                    MEDIA_OPTIONS={MEDIA_OPTIONS}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

                {/*Generate Ideas Result */}
                <GenerateIdeaResultCard
                    isCalendarModalOpen={isCalendarModalOpen}
                    setIsCalendarModalOpen={setIsCalendarModalOpen}
                    generatedIdea={generatedIdea}
                    ideaPrompt={ideaPrompt}
                    generateIdea={generateIdea}
                    isGenerating={isGenerating}
                />

                {/* How to Use */}
                <HowToUse />
            </div>
            <AnimatePresence>
                {isCalendarModalOpen && (

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                        >

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                                <h3 className="text-sm font-semibold text-slate-900">
                                    Add Post Idea to Calendar
                                </h3>

                                <button
                                    onClick={() => setIsCalendarModalOpen(false)}
                                    className="text-slate-500 hover:text-slate-900"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-5 space-y-4">

                                {/* Info Notice */}
                                <div className="flex items-start gap-3 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                                    <Info className="h-4 w-4 mt-0.5" />
                                    Adding to the calendar is for personal planning only. To request professional services, contact the team.
                                </div>

                                {/* Content Name */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700" value={generatedIdea?.title || ""}
                                    >

                                    </label>
                                    <input
                                        defaultValue="Day in the Life Vlog"
                                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                                {/* Platform */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700" value={generatedIdea?.platforms.join(" / ") || ""}
                                    >
                                    </label>
                                    <input
                                        defaultValue="YouTube / Instagram"
                                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700" value={generatedIdea?.summary || ""}
                                    >
                                    </label>
                                    <textarea
                                        rows={2}
                                        defaultValue="Take viewers through a typical work day"
                                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                                {/* Caption */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700" value={generatedIdea?.caption || ""}
                                    >
                                    </label>
                                    <textarea
                                        rows={3}
                                        defaultValue="Come work with me today! ☕ Here's what a day in my life really looks like..."
                                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                                <button
                                    onClick={() => setIsCalendarModalOpen(false)}
                                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button className="rounded-md bg-[#13BF9E] px-4 py-2 text-sm font-medium text-white hover:bg-[#13BF9E]/90">
                                    Add to Calendar
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default PostIdeaGenerator;
