import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, X, Info } from "lucide-react";
import GenerateIdeasSection from "./PostIdeaGen/GenerateIdeasSection";
import GenerateIdeaResultCard from "./PostIdeaGen/GenerateIdeaResultCard";
import HowToUse from "./HowToUse";
import { useState } from "react";
import AddToCalendarModal from "./PostIdeaGen/AddToCalendarModal";
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

            <AddToCalendarModal
                isOpen={isCalendarModalOpen}
                onClose={() => setIsCalendarModalOpen(false)}
                generatedIdea={generatedIdea}
            />


        </div>
    );
};

export default PostIdeaGenerator;
