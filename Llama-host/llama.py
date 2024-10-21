from transformers import AutoModelForCausalLM, AutoTokenizer
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the LLaMA model and tokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")

@app.route("/generate", methods=["POST"])
def generate():
    input_data = request.json
    prompt = input_data.get("prompt", "")
    
    # Tokenize the input
    inputs = tokenizer(prompt, return_tensors="pt")
    
    # Generate text using the model
    outputs = model.generate(**inputs, max_new_tokens=150)
    
    # Decode and return the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"generated_text": generated_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)