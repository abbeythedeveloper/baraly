import { formatInTimeZone } from "date-fns-tz";

function getTimeGreeting() {
    // Browser-provided IANA timezone (e.g. "Europe/Amsterdam", "Africa/Lagos")
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const hour = Number(
        formatInTimeZone(new Date(), timeZone, "H")
    );

    if (hour >= 5 && hour < 12) return "Good morning 🌤️";
    if (hour >= 12 && hour < 18) return "Good afternoon ✨";
    return "Good evening 🌃";
}

export default getTimeGreeting;
