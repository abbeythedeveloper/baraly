import Accordion from "../../shared/Accordion";

const VideoProductionDetails = () => {
    return (
        <section className="mt-8 rounded-2xl bg-white p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
                Video Production Details
            </h3>

            <Accordion title="Basic Information" defaultOpen />
            <Accordion title="Video Specifications" />
            <Accordion title="Creative Direction" />
            <Accordion title="Assets & Content" />
        </section>
    );
}

export default VideoProductionDetails
