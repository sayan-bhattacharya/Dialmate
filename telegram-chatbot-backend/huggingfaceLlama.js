import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Define API URL and headers
const HUGGINGFACE_API_READ = process.env.HUGGINGFACE_API_READ;
const API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf";
const headers = {
Authorization: `Bearer ${HUGGINGFACE_API_READ}`, // Replace with your actual Hugging Face API key
"Content-Type": "application/json",
};

// Function to query the Hugging Face API
const query = async (payload) => {
const jsonBody = {
inputs: `[INST] <<SYS>> Your job is to talk like a pirate. Every response must sound like a pirate. <<SYS>> ${payload} [/INST]`,
parameters: {
    max_new_tokens: 256,
    top_p: 0.9,
    temperature: 0.7,
},
};

try {
const response = await axios.post(API_URL, jsonBody, { headers });
return response.data;
} catch (error) {
console.error("Error querying API:", error.response ? error.response.data : error.message);
}
};

// Example usage
const runQuery = async () => {
const data = await query("Just say hi!");
if (data && data.length > 0) {
console.log(data[0].generated_text.split('[/INST] ')[1]);
} else {
console.log("No data returned from the model.");
}
};

// Call the function
runQuery();