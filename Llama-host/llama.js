const { exec } = require('child_process');

// Function to interact with Ollama LLaMA 3 model
const generateText = (prompt) => {
return new Promise((resolve, reject) => {
// Run the LLaMA 3 model with the given prompt
exec(`ollama run llama3 "${prompt}"`, (error, stdout, stderr) => {
    if (error) {
    console.error(`Error: ${error.message}`);
    reject(`Error: ${error.message}`);
    return;
    }
    if (stderr) {
    console.error(`Stderr: ${stderr}`);
    reject(`Stderr: ${stderr}`);
    return;
    }
    // Return the generated text
    resolve(stdout);
});
});
};

// Example usage:
(async () => {
try {
const prompt = "What is the meaning of life?";
console.log(`Prompt: ${prompt}`);

// Generate text from LLaMA 3 model
const generatedText = await generateText(prompt);
console.log("Generated Text:", generatedText);
} catch (error) {
console.error("An error occurred:", error);
}
})();