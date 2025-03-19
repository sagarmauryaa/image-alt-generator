import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateAltText(imageUrl: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                { role: "system", content: "Generate a descriptive alt text for the given image." },
                { role: "user", content: `Here is an image: ${imageUrl}` },
            ],
        });

        return response.choices[0]?.message?.content || "No alt text generated.";
    } catch (error) {
        console.error("Error generating alt text:", error);
        return "Error generating alt text.";
    }
}
