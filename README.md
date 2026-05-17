# AI Quiz & Chat App (Full Stack)

A full-stack **AI-powered learning platform** with chat, quiz generation, and user analytics.
Built using **React (Vite) + Node.js + Express + MongoDB + JWT + RAG + LLM integration**.

---

# Features

## AI Chat Assistant

* Context-aware AI responses
* Language support (English, Hindi, Spanish)
* Session-based conversation

## AI Quiz System

* Generates MCQ quizzes from topic context
* Ensures valid options + correct answers
* Auto-scoring system

## Quiz Analytics

* Stores quiz attempts
* Score tracking
* User history dashboard

## Authentication

* JWT-based login & register
* Protected API routes

## Multi-language Support

* English / Hindi / Spanish prompts

---

# Tech Stack

## Frontend

* React (Vite)
* JavaScript
* Fetch API
* CSS

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* RAG (Retrieval Augmented Generation)
* LLM integration (Ollama / AI service)

---

# Project Structure

```
project-root/
│
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repo-url>
cd project-root
```

## 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:5000
```

---

# API Overview

## User

* POST `/user/register`
* POST `/user/login`

## Chat

* POST `/chat`

## Quiz

* POST `/quiz/generate`
* POST `/quiz-attempt/submit`
* GET `/quiz-attempt/history/:userId`

## Tip

* GET `/tip`

---

# Authentication Flow

* User logs in → receives JWT token
* Token stored in localStorage
* Sent in headers:

```
Authorization: Bearer <token>
```

---

# Architecture Overview

* RAG system fetches context for quiz generation
* LLM generates structured MCQs
* Backend validates and stores quiz + attempts
* Frontend handles UI + state management

---

# Future Enhancements

* Redis caching for performance
* WebSocket real-time chat
* Leaderboard system
* Admin analytics dashboard
* Deployment (Vercel + Render)

---

# Author

Built as a full-stack learning + AI integration project demonstrating:

* Backend architecture
* AI integration
* Auth systems
* Full-stack development skills

---

# Status

✔ Chat system working
✔ Quiz generation working
✔ Quiz history working
✔ Authentication working
✔ Multi-language support implemented
