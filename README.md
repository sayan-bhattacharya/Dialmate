# Dialmate
Dialmate is an intuitive dashboard designed to analyze and display statistics of emotional states from pas Dialmate helps improve communication t conversations. The platform allows users to set reminders, track emotional trends, and receive feedback on previous conversations stored in the database. With a focus on emotional intelligence, 




# LLaMA Model Local Hosting Guide

This guide shows how to locally host the LLaMA model and interact with it using a REST API via Python, with a Node.js client to send requests.

## Prerequisites

- **Hardware**: GPU (recommended) or CPU (slower for large models)
- **Python**: 3.8+
- **Node.js**: 14.x+

## Steps to Host LLaMA Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>

2. Python Setup

	1.	Create Virtual Environment:

python3 -m venv llama_env
source llama_env/bin/activate  # On Windows: llama_env\Scripts\activate


	2.	Install Python Dependencies:
For GPU:

pip install transformers torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

For CPU:

pip install transformers torch torchvision torchaudio

Install Flask for the API:

pip install flask



3. Download and Load LLaMA Model

	1.	Request Access to LLaMA model weights via Hugging Face here.
	2.	Load the Model in Python:

from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")



4. Expose LLaMA via Flask API

	1.	Create Flask API (llama_api.py):

from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")

@app.route("/generate", methods=["POST"])
def generate():
    input_data = request.json
    prompt = input_data.get("prompt", "")
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=150)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"generated_text": generated_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


	2.	Run Flask API:

python llama_api.py



5. Interact with the API via Node.js

	1.	Install Axios:

npm install axios


	2.	Create Node.js Client (index.js):

const axios = require('axios');

const generateText = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:5000/generate', {
      prompt: prompt
    });
    console.log("Generated Text:", response.data.generated_text);
  } catch (error) {
    console.error("Error:", error);
  }
};

generateText("What is the meaning of life?");


	3.	Run Node.js Client:

node index.js



Example API Request/Response

Request:

POST http://localhost:5000/generate
Content-Type: application/json

{
    "prompt": "Tell me a story about a brave knight."
}

Response:

{
    "generated_text": "Once upon a time, in a kingdom far away, there was a brave knight who..."
}

License

This project is licensed under the MIT License.

Feel free to use this directly!
