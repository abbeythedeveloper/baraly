import {
    Palette,
    Video,
    Film,
    Globe,
    LayoutGrid,
} from "lucide-react";

export const SERVICES = [
    {
        id: "graphics",
        label: "Graphics Design",
        icon: Palette,
        gradient: "from-pink-500 to-purple-500",
    },
    {
        id: "video",
        label: "Video Production",
        icon: Video,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "motion",
        label: "Motion Graphics",
        icon: Film,
        gradient: "from-orange-500 to-red-500",
    },
    {
        id: "microsoft",
        label: "Microsoft 365",
        icon: LayoutGrid,
        gradient: "from-green-500 to-emerald-500",
    },
    {
        id: "web",
        label: "Web Development",
        icon: Globe,
        gradient: "from-indigo-500 to-violet-500",
    },
];
