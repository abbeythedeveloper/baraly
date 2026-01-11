// src/data/subscriptionPlans.js
export const plans = {
    Starter: {
        tagline: "Perfect for new businesses establishing their brand",
        tiers: [
            {
                id: 1,
                name: "Tier 1",
                basePrice: { monthly: 1007, yearly: 9668 },
                features: [
                    "Brand Identity (Logo + Brand Colors & Fonts)",
                    "Business Card & Letterhead (Digital)",
                    "5 Social Media Templates (Posts)",
                    "2 Flyers / Infographics request",
                    "Basic Web Page (landing page) design",
                    "1 Professional Video",
                    "Admin Expenses",
                ],
                isPopular: false,
            },
            {
                id: 2,
                name: "Tier 2",
                basePrice: { monthly: 1259, yearly: 12087 },
                features: [
                    "All Tier 1 features",
                    "Microsoft 365 Tenant Set-up",
                    "1 Monthly Strategy Call",
                    "1 Motion Graphics design",
                ],
                isPopular: true,
            },
        ],
    },

    Presence: {
        tagline: "Maintain consistent social media presence",
        tiers: [
            {
                id: 1,
                name: "Tier 1",
                basePrice: { monthly: 288, yearly: 2765 },
                features: [
                    "Monthly Content Calendar",
                    "3 Graphics Design",
                    "2 Reel Videos",
                    "Hashtag Bank + Tips",
                ],
                isPopular: false,
            },
            {
                id: 2,
                name: "Tier 2",
                basePrice: { monthly: 563, yearly: 5405 },
                features: [
                    "All Tier 1 features",
                    "1 Motion Graphics Design",
                    "1 Graphic Design",
                    "1 Reel Video",
                    "5 Weekly Stories",
                    "Monthly Report",
                ],
                isPopular: true,
            },
            {
                id: 3,
                name: "Tier 3",
                basePrice: { monthly: 806, yearly: 7738 },
                features: [
                    "All Tier 2 features",
                    "1 Motion Graphics Design",
                    "1 Graphic Design",
                    "1 Reel Video",
                    "Engagement Monitoring",
                    "1 Strategy Call",
                ],
                isPopular: false,
            },
        ],
    },

    Creator: {
        tagline: "For content creators and influencers",
        tiers: [
            {
                id: 1,
                name: "Tier 1",
                basePrice: { monthly: 598, yearly: 5740 },
                features: [
                    "4 Thumbnails",
                    "4 Reels",
                    "1 Graphic design request",
                    "1 Basic Motion Intro/Outro",
                ],
                isPopular: false,
            },
            {
                id: 2,
                name: "Tier 2",
                basePrice: { monthly: 940, yearly: 9025 },
                features: [
                    "All Tier 1 features",
                    "2 Thumbnails",
                    "2 Reels",
                    "2 Graphic Design Requests",
                    "Weekly Visual Design",
                ],
                isPopular: false,
            },
        ],
    },

    Live: {
        tagline: "Event coverage and live content production",
        tiers: [
            {
                id: 1,
                name: "Tier 1",
                basePrice: { monthly: 770, yearly: 7393 },
                features: [
                    "Event Highlights Reel",
                    "1 Motion Graphic",
                    "5 Graphic Design",
                    "3 Reels",
                    "Programme Graphic",
                    "Thank You Video",
                ],
                isPopular: false,
            },
            {
                id: 2,
                name: "Tier 2",
                basePrice: { monthly: 998, yearly: 9580 },
                features: ["All Tier 1 features", "2 Graphic Design", "2 Reels"],
                isPopular: false,
            },
        ],
    },
    Systems: {
        tagline: "Perfect for new businesses establishing their brand",
        tiers: [
            {
                id: 1,
                name: "Tier 1",
                basePrice: { monthly: 1042, yearly: 10004 },
                features: [
                    "Microsoft 365 Basic Setup",
                    "Web Development(3–5 pages)",
                    "Essential Branding Kit(Add - on)",
                    "Website Maintenance(Ongoing)",
                ],
                isPopular: false,
            },
            {
                id: 2,
                name: "Tier 2",
                basePrice: { monthly: 2288, yearly: 21966 },
                features: [
                    "Launch Essentials",
                    "Microsoft 365 Security & Compliance",
                    "UI/UX Design Enhancements (Add-on)",
                ],
                isPopular: true,
            },
        ],
    },

    Labs: {
        tagline: "Premium full-service unlimited creative subscription",
        tiers: [
            {
                id: 1,
                name: "Full Service",
                basePrice: { monthly: 1837, yearly: 17636 },
                features: [
                    "Brand Strategy Call",
                    "Unlimited Graphic Requests",
                    "Website Edits/Updates",
                    "Motion Graphics & Reels (6 max)",
                    "Video Editing Requests",
                    "M365 Tenant set up",
                ],
                isLabs: true,
                labsLabel: "Premium Unlimited",
            },
        ],
    },
};
