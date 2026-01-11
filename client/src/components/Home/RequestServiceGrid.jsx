const services = [
    { name: "Graphics Design", desc: "Logos, branding, social media graphics" },
    { name: "Video Production", desc: "Professional video editing and production" },
    { name: "Motion Graphics", desc: "Animated content and visual effects" },
    { name: "Microsoft 365", desc: "Documents, presentations, spreadsheets" },
    { name: "Web Development", desc: "Website design and development" },
];

export default function RequestServiceGrid() {
    return (
        <div>
            <h3 className="font-semibold text-lg mb-4">Request a Service</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((s) => (
                    <div key={s.name} className="rounded-2xl border p-6">
                        <h4 className="font-semibold">{s.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{s.desc}</p>

                        <button className="mt-6 w-full rounded-lg border py-2 text-sm font-medium hover:bg-gray-50">
                            Create Request
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
