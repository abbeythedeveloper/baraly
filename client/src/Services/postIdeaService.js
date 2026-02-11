import client from "./openaiService";
import { buildPostIdeaPrompt } from "../utils/promptBuilders";

export const generatePostIdea = async ({ mediaType, ideaPrompt }) => {
    const prompt = buildPostIdeaPrompt({ mediaType, ideaPrompt });

    const response = await client.chat.completions.create({
        model: "gpt-5.2",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.8,
    });

    const text = response.choices[0].message.content;

    return JSON.parse(text);
};
