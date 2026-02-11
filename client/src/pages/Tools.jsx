import React from "react";
import SectionHeader from "../components/AItools/SectionHeader";
import ToolCard from "../components/AItools/ToolCard";
import { Lightbulb, Sparkles, Video } from 'lucide-react';

const Tools = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <SectionHeader
                    title="AI-Powered Tools"
                    subtitle="Enhance your creative workflow with intelligent tools"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

                    <ToolCard
                        icon={<Lightbulb className="w-7 h-7" />}
                        iconColor="text-white"
                        iconBg="bg-linear-to-br from-yellow-500 to-orange-500 "
                        title="Post Idea Generator"
                        description="Get AI-powered suggestions for your next social media post"
                        features={[
                            "Random post idea suggestions",
                            "Add directly to content calendar",
                            "Based on your brand identity",
                            "Multiple platform support",
                        ]}
                        link="/app/tools/post-idea-generator"
                    />

                    <ToolCard
                        icon={<Video className="w-7 h-7" />}
                        iconColor="text-white"
                        iconBg="bg-linear-to-br from-purple-500 to-pink-500"
                        title="Shoot Guide Tool"
                        description="AI chatbot that creates personalized shoot guides for your videos"
                        features={[
                            "Interactive AI conversation",
                            "Gather shoot requirements",
                            "Generate creative direction",
                            "Export shoot guide PDF",
                        ]}
                        link="/app/tools/shoot-guide"
                    />
                </div>

                <div className="text-card-foreground flex flex-col gap-6 rounded-xl border mt-6 md:mt-8 bg-linear-to-br from-purple-50 to-pink-50 border-purple-200">
                    <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                        <h4 className="leading-none flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-700" />  AI-Powered Creativity</h4>
                        <p className="text-gray-600 mt-0.5">
                            These tools use artificial intelligence to help you brainstorm ideas,
                            plan content, and streamline your creative process.
                        </p>
                    </div>
                    <div className="px-6 last:pb-6">
                        <p className="text-sm text-gray-600">
                            More AI tools coming soon. We’re constantly working on new features to
                            help creative professionals work smarter and faster.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Tools;
