// groq.js

import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
const chatCompletion = await getGroqChatCompletion();
// Print the completion returned by the LLM.
console.log(chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion() {
return groq.chat.completions.create({
messages: [
    {
    role: "user",
    content: "Write a 10000 words essay on the topic of 'What is the relationship of feacal color with health'.",
    },
],
model: "llama3-8b-8192",
});
}

// Call the main function
main().catch((error) => console.error("Error:", error));