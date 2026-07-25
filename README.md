# 🚀 Carevo AI – AI Career Copilot
<div align="center">

<img src="./frontend/attached_assets/carevo-logo.png" alt="Carevo AI Logo" width="180"/>

## 📌 Project Overview

**Carevo AI** is an AI-powered career assistant designed to help students, fresh graduates, and job seekers improve their career preparation process.

The platform uses Artificial Intelligence to analyze job descriptions, identify required skills, calculate job compatibility, suggest improvements, and provide personalized career guidance through an AI Career Agent.

The main goal of Carevo AI is to solve the problem of students applying for multiple jobs without understanding:
- whether they match the role,
- which skills they are missing,
- how to improve their resume,
- and what career path they should follow.

---

# 🎯 Problem Statement

Many students and fresh developers struggle with:

- Understanding complex job descriptions
- Identifying required technical skills
- Knowing their skill gaps
- Tracking multiple job applications
- Preparing personalized career strategies

Traditional job searching platforms only show opportunities but do not provide intelligent guidance.

---

# 💡 Solution

Carevo AI acts as a personal AI career mentor that helps users:

✅ Analyze job descriptions automatically  
✅ Extract required technical skills  
✅ Identify missing skills  
✅ Generate improvement recommendations  
✅ Track analyzed applications  
✅ Ask career-related questions using AI  

---

# ✨ Key Features

## 🤖 1. AI Job Analyzer

Users can paste any job description and receive:

- Company information
- Role identification
- Required skills
- Missing skills
- Job match score
- Resume improvement suggestions

Example:

Input:

```
Looking for React, JavaScript, Node.js and SQL developer
```

Output:

```
Skills:
React
JavaScript
Node.js
SQL

Match Score:
85%

Recommendations:
Improve backend development skills
Add more full-stack projects
```

---

# 💬 2. AI Career Agent

Carevo AI provides a conversational career assistant powered by Large Language Models.

The AI Agent helps users with:

- Career roadmap planning
- Resume improvement
- Interview preparation
- Internship guidance
- Skill development plans
- Project suggestions

Example queries:

```
Give me a roadmap to become an AI Engineer

How can I improve my resume?

What skills are required for frontend development?
```

---

# 📊 3. Career Dashboard

The dashboard provides a centralized view of career progress.

Features:

- Career Score
- Resume ATS Score
- AI Readiness Score
- Job Matches
- Recent Applications
- Skill Analysis
- Career Growth Tracking

---

# 🗂 4. Job Application Tracking

Analyzed jobs are stored and tracked.

Stored information:

- Company name
- Role
- Match score
- Recommendation
- Application status
- Date analyzed

Database:
Supabase

---

# 🏗 System Architecture


```
                 USER
                  |
                  |
                  v

          React Frontend
        (Vite + TypeScript)

                  |
                  |
                  v

            n8n Workflow
          Automation Layer

                  |
        --------------------
        |                  |
        v                  v

    Groq AI Model      Supabase
    (LLM Engine)       Database

        |
        |
        v

 AI Generated Response

        |
        |
        v

     Frontend UI
```

---

# 🛠 Technology Stack

## Frontend

| Technology | Purpose |
|-|-|
| React | User Interface |
| TypeScript | Type Safety |
| Vite | Development Environment |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide Icons | UI Icons |


## AI & Automation

| Technology | Purpose |
|-|-|
| n8n | AI Workflow Automation |
| Groq API | Large Language Model Processing |
| AI Agent | Career Assistant Logic |


## Database

| Technology | Purpose |
|-|-|
| Supabase | Application Database |


---

# 📂 Project Structure

```
Carevo-AI

│
├── frontend
│
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── services
│   ├── api
│   └── assets
│
│
├── backend
│
│   ├── app
│   ├── routes
│   ├── services
│   └── database
│
│
├── docs
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation Guide

## Prerequisites

Install:

- Node.js (v20+ recommended)
- npm
- Git


---

# 1. Clone Repository

```bash
git clone https://github.com/Tamanna-3/Carevo-AI.git
```

Move into project:

```bash
cd Carevo-AI
```

---

# 2. Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

---

# 3. Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend will start on:

```
http://127.0.0.1:8000
```

---

# 🔐 Environment Variables

Create `.env` files and add:

```
GROQ_API_KEY=your_groq_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key

N8N_WEBHOOK_URL=your_webhook_url
```

⚠️ Do not upload `.env` files to GitHub.

---

# 🔄 AI Workflow Explanation

## Job Analyzer Flow

```
User enters Job Description

          ↓

React Frontend

          ↓

n8n Webhook

          ↓

AI Agent

          ↓

Groq LLM

          ↓

Skill Extraction
Match Score
Recommendations

          ↓

Supabase Storage

          ↓

Display Result
```

---

## Career Agent Flow

```
User Question

       ↓

React Chat Interface

       ↓

n8n Webhook

       ↓

AI Agent

       ↓

Groq LLM

       ↓

Career Response

       ↓

Display Answer


