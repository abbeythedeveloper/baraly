import React from 'react'
import {
    RefreshCcw,
    Copy,
    Calendar,
} from "lucide-react";


const GenerateIdeaResultCard = ({ setIsCalendarModalOpen, generatedIdea, ideaPrompt, generateIdea }) => {

    const copyCaption = () => {
        if (!generatedIdea) return;
        navigator.clipboard.writeText(generatedIdea.caption);
    };

    const openCalendarModal = () => {
        if (!generatedIdea) return;
        setIsCalendarModalOpen(true);
    };

    return (

        <div>
            {generatedIdea && (
                // RESULT CARD JSX
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">

                    {/* Idea Header */}
                    <div className="flex items-start justify-between gap-10  bg-purple-100 px-6 py-4">
                        <div className='flex flex-col gap-2 w-[80%]'>
                            <h3 className="text-sm font-semibold text-slate-900">
                                {generatedIdea.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                                {generatedIdea.summary}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={generateIdea}
                            className="flex items-center gap-2 rounded-lg border cursor-pointer border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                            <RefreshCcw className="h-3.5 w-3.5" />
                            New Idea
                        </button>
                    </div>

                    {/* Tags */}
                    <div className="px-6 py-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 space-x-2 text-xs font-medium text-emerald-700">
                            {generatedIdea.platforms.map((platform) => (
                                <span key={platform}>{platform}</span>
                            ))}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                            {generatedIdea.category}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                            {generatedIdea.mediaType}
                        </span>
                    </div>

                    <div className="px-6 py-4 space-y-6">

                        {/* Suggested Caption */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-slate-900">
                                    Suggested Caption
                                </h4>
                                <button
                                    type="button"
                                    onClick={copyCaption}
                                    className="inline-flex items-center gap-1 text-xs text-slate-600 border border-slate-200 rounded-md px-2 py-1 cursor-pointer hover:text-slate-900 transition"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                    Copy
                                </button>
                            </div>

                            <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                {generatedIdea.caption}
                            </div>
                        </div>

                        {/* Content Tips */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-slate-900">
                                Content Tips
                            </h4>

                            <ul className="space-y-2">
                                {generatedIdea.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-700">
                                            {index + 1}
                                        </span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr className='border-slate-200' />

                        {/* Actions */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={openCalendarModal}
                                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#13BF9E] px-4 py-2 text-sm font-medium text-white hover:bg-[#13BF9E]/90 transition"
                            >
                                <Calendar className="h-4 w-4" />
                                Add to Calendar
                            </button>

                            <button
                                type="button"
                                onClick={generateIdea}
                                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                                <RefreshCcw className="h-4 w-4" />
                                Generate Another
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>




    )
}

export default GenerateIdeaResultCard