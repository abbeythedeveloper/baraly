import GraphicsDesignDetails from "../services/graphics/GraphicsDesignDetails";
import VideoProductionDetails from "../services/video/VideoProductionDetails";
import WebDevelopmentDetails from "../services/web/WebDevelopmentDetails";
import MotionGraphicsDetails from "../services/motion/MotionGraphicsDetails";
import Microsoft365Details from "../services/microsoft/Microsoft365Details";


const ServiceDetailsRenderer = ({ service, value, onChange }) => {
    if (service === "graphics") {
        return (
            <GraphicsDesignDetails
                value={value}
                onChange={onChange}
            />
        );
    }
    if (service === "video") {
        return (
            <VideoProductionDetails
                value={value}
                onChange={onChange}
            />
        );
    }
    if (service === "web") {
        return (
            <WebDevelopmentDetails
                value={value}
                onChange={onChange}
            />
        );
    }
    if (service === "motion") {
        return (
            <MotionGraphicsDetails
                value={value}
                onChange={onChange}
            />
        );
    }
    if (service === "microsoft") {
        return (
            <Microsoft365Details
                value={value}
                onChange={onChange}
            />
        );
    }

    return null;
};

export default ServiceDetailsRenderer;
