export const buildPostIdeaPrompt = ({ mediaType, ideaPrompt }) => {
    return `
You are a professional social media strategist.

Generate ONE high quality content idea.

MEDIA TYPE:
${mediaType || "Any"}

USER DIRECTION:
${ideaPrompt || "Completely random idea"}

Return ONLY valid JSON in this structure:

{
"title": "",
"summary": "",
"platforms": [],
"category": "",
"mediaType": "",
"caption": "",
"tips": []
}
`;
};
