import Accordion from "../../shared/Accordion";

const GraphicsDesignDetails = ({ value = {}, onChange }) => {
    const update = (field, val) => {
        onChange({ ...value, [field]: val });
    };

    return (
        <section className="mt-8 rounded-2xl bg-white p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
                Graphics Design Details
            </h3>

            <Accordion title="Basic Information" defaultOpen>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Design Type
                        </label>
                        <select
                            value={value.type || ""}
                            onChange={(e) => update("type", e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-500"
                        >
                            <option>Logo Design</option>
                            <option>Flyer</option>
                            <option>Social Media Post</option>
                            <option>Banner</option>
                            <option>Business Card</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Output Format
                        </label>
                        <select
                            value={value.format || ""}
                            onChange={(e) => update("format", e.target.value)}

                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-500">
                            <option>PNG</option>
                            <option>JPG</option>
                            <option>PDF</option>
                            <option>AI / PSD</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            value={value.quantity || ""}
                            onChange={(e) => update("quantity", e.target.value)}
                            min="1"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>
            </Accordion>


            <Accordion title="Project Vision & Goals">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Objective
                        </label>
                        <textarea
                            rows={3}
                            value={value.objective || ""}
                            onChange={(e) => update("objective", e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
                            placeholder="What is the main goal of this design?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Audience
                        </label>
                        <textarea
                            rows={3}
                            value={value.audience || ""}
                            onChange={(e) => update("audience", e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
                            placeholder="Who is this design intended for?"
                        />
                    </div>
                </div>
            </Accordion>


            <Accordion title="Creative Direction">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Tone & Style
                        </p>
                        <div className="space-y-2">
                            {["Minimal", "Modern", "Bold", "Playful", "Corporate"].map((style) => (
                                <label key={style} className="flex items-center gap-2 text-sm text-gray-700">
                                    <input type="radio" name="style" value={style} onChange={(e) => update("style", e.target.value)} />
                                    {style}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Color Preferences
                        </label>
                        <input
                            type="text"
                            value={value.colors || ""}
                            onChange={(e) => update("colors", e.target.value)}
                            placeholder="e.g. Blue, White, Gold"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Inspiration Links
                        </label>
                        <textarea
                            rows={2}
                            value={value.inspiration || ""}
                            onChange={(e) => update("inspiration", e.target.value)}
                            placeholder="Paste any links that inspire the design"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>
            </Accordion>


            <Accordion title="Design Requirements">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dimensions
                        </label>
                        <input
                            type="text"
                            value={value.dimensions || ""}
                            onChange={(e) => update("dimensions", e.target.value)}
                            placeholder="e.g. 1080x1080"
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Platform Usage
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            {["Instagram", "Facebook", "Website", "Print"].map((platform) => (
                                <label key={platform} className="flex items-center gap-2">
                                    <input type="checkbox" value={platform} onChange={(e) => update("platform", e.target.value)} />
                                    {platform}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Accordion>


            <Accordion title="Team Assets">
                <div className="space-y-2 text-sm text-gray-600">
                    <p>
                        You can upload your logo, brand guidelines, or other assets
                        in the attachments section below.
                    </p>
                    <p className="text-xs text-gray-500">
                        Supported formats: PNG, JPG, PDF, AI
                    </p>
                </div>
            </Accordion>

        </section>
    );
}

export default GraphicsDesignDetails;
