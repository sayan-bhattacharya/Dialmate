// Import necessary modules
const axios = require('axios');
require('dotenv').config();  // To load environment variables from a .env file

// Access the GROQ API KEY from environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Example resume and job description
const resume = `
[Example Resume]
- Name: John Doe
- Experience: 5 years in Software Engineering, specialized in backend development.
- Skills: Python, JavaScript, Docker, Kubernetes, REST APIs.
- Education: B.S. in Computer Science.
`;

const jobDescription = `
[Example Job Description]
- Job Title: Senior Backend Developer
- Responsibilities: Build and maintain REST APIs, collaborate with frontend teams, design backend systems.
- Requirements: 5+ years of experience in backend development, experience with Docker, Kubernetes, and cloud platforms.
- Preferred Skills: Experience with Python and JavaScript, familiarity with microservices architecture, and strong communication skills.
`;

// Function to get a summary from the LLaMA model via GROQ API
async function getSummary() {
try {
const response = await axios.post(
    'https://api.groq.com/v1/generate',  // Replace with the correct GROQ API endpoint
    {
    model: "llama3-8b-8192",  // Adjust to the correct LLaMA model you're using
    messages: [
        {
        "role": "user",
        "content": `Please summarize the following resume and job description in bullet points, highlighting the key aspects relevant for matching them:\n\nResume:\n${resume}\n\nJob Description:\n${jobDescription}`
        },
        {
        "role": "assistant",
        "content": "Here's a concise summary in bullet points:"
        }
    ],
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    stream: false,
    stop: null
    },
    {
    headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
    }
    }
);

// Log the result from the API response
console.log("Summary:", response.data.choices[0].message.content);
} catch (error) {
console.error("Error generating summary:", error);
}
}

// Call the function to get the summary
getSummary();