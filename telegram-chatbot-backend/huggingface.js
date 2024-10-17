import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const HUGGINGFACE_API_URL =  "https://api-inference.huggingface.co/models/gpt2"; 
const HUGGINGFACE_API_READ = process.env.HUGGINGFACE_API_READ;

// Function to generate text using LLaMA
const generateText = async (prompt) => {
try {
const response = await axios.post(
    HUGGINGFACE_API_URL,
    { inputs: prompt },
    {
    headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_READ}`,
        "Content-Type": "application/json",
    },
    }
);

const generatedText = response.data;
console.log("Generated Text:", generatedText);
} catch (error) {
console.error("Error generating text:", error.response ? error.response.data : error.message);
}
};

// Example prompt
const prompt = "Once upon a time in a galaxy far, far away,";
generateText(prompt);