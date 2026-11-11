# Dialmate — Emotional Intelligence & Conversation Telemetry Platform

<div align="center">

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](Frontend/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_/_Express-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![LLaMA-2](https://img.shields.io/badge/Inference-Local_LLaMA--2-0467DF?style=for-the-badge&logo=meta&logoColor=white)]()
[![Flask](https://img.shields.io/badge/API-Flask_Gateway-000000?style=for-the-badge&logo=flask&logoColor=white)]()
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()

**DialMate AI • Intuitive emotional telemetry and real-time conversation analytics for business communication.**

</div>

---

## 📌 Executive Overview

**Dialmate** is a conversational analytics platform designed to capture, analyze, and visualize emotional trends from voice and textual customer interactions. By combining local, privacy-preserving LLM inference (LLaMA-2 7B) with real-time sentiment extraction and an intuitive dashboard, Dialmate empowers teams to track emotional valence, detect escalation patterns, and surface coaching suggestions.

---

## 🏗️ Full-Stack System Architecture

```mermaid
graph TD
    classDef client fill:#eff6ff,stroke:#1e40af,stroke-width:2px;
    classDef backend fill:#f0fdf4,stroke:#15803d,stroke-width:2px;
    classDef ai fill:#fefce8,stroke:#a16207,stroke-width:2px;
    classDef db fill:#fdf2f8,stroke:#be185d,stroke-width:2px;

    subgraph ClientLayer ["🖥️ Frontend Dashboard (React 18 + Vite)"]
        UI[Agent Interface & Telemetry]
        Charts[Emotion Trend & Valence Visualizer]
        Feedback[Real-Time Coaching Alerts]
    end

    subgraph APILayer ["⚡ Backend Gateway (Node.js & Express)"]
        API[Express REST Gateway]
        Auth[JWT Session & Auth Handler]
        DataPipe[Conversation Ingestion Service]
    end

    subgraph ModelLayer ["🤖 Local AI Inference Engine (Flask + Transformers)"]
        FlaskAPI[Flask Inference Gateway :5000]
        LLaMA[Meta LLaMA-2 7B Chat Model]
        EmotionEngine[Sentiment & Valence Extraction Pipeline]
    end

    subgraph DataStorage ["💾 Persistence Layer"]
        DB[(PostgreSQL / MongoDB)]
    end

    UI --> API
    API --> FlaskAPI
    FlaskAPI --> EmotionEngine --> LLaMA
    API --> DB
    DB --> Charts & Feedback

    class UI,Charts,Feedback client;
    class API,Auth,DataPipe backend;
    class FlaskAPI,LLaMA,EmotionEngine ai;
    class DB db;
```

---

## ✨ Core Features

1. **Local Privacy-Preserving Inference**: Host and execute LLaMA-2 locally via PyTorch and Hugging Face Transformers, ensuring sensitive audio/chat transcripts never leave your infrastructure.
2. **Emotional Telemetry & Valence Scoring**: Classify conversation tone into structured emotional dimensions (Confidence, Hesitation, Frustration, Urgency).
3. **Interactive React Dashboard**: Visual analytics visualizing emotional trajectories across single calls or multi-week customer interactions.
4. **Automated Feedback & Alerts**: Real-time reminders when escalation thresholds or negative customer trends are breached.

---

## 🚀 Setup & Deployment

### 1. Local LLaMA-2 Inference Engine (Python)

```bash
# Set up Python environment
python -m venv llama_env
source llama_env/bin/activate  # On Windows: llama_env\Scripts\activate

# Install PyTorch with CUDA support (GPU recommended)
pip install transformers torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install flask

# Launch the inference service
python llama_api.py
```

### 2. Frontend Dashboard (React + Vite)

```bash
cd Frontend
npm install
npm run dev
```

The frontend dashboard will be available at `http://localhost:5173`.

---

## 📬 Contact & Commercial Inquiries

- **Company**: DialMate AI
- **Website**: [dialmateai.com](https://dialmateai.com)
- **Founder**: Sayan Bhattacharya ([sayanpm17@gmail.com](mailto:sayanpm17@gmail.com))
- **LinkedIn**: [linkedin.com/in/snbhattacharya5](https://www.linkedin.com/in/snbhattacharya5/)
