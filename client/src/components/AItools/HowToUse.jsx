import React from 'react'

const HowToUse = () => {
    return (
        <div>
            {/* How To Use */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">
                    How to Use
                </h3>

                <div className="space-y-3 text-sm text-slate-700">

                    <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg font-medium text-purple-700">
                            1
                        </span>
                        <p>
                            Select your preferred media type and describe the kind of content you want (optional).
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg font-medium text-purple-700">
                            2
                        </span>
                        <p>
                            Review the generated idea, caption suggestions, and content tips.
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg font-medium text-purple-700">
                            3
                        </span>
                        <p>
                            Add the idea to your calendar or generate another one.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HowToUse