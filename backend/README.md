# Backend - AI Quiz & Chat API

This is the Node.js + Express backend for an AI-powered learning platform with chat, quiz generation, and user tracking.

---

# Features

* AI Chat API (RAG-based responses)
* AI Quiz Generation from context
* Quiz Submission & Scoring
* Quiz History Tracking
* JWT Authentication Middleware
* Multi-language Support
* RESTful APIs

---

# Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* RAG (Context Retrieval System)
* AI LLM Integration (Ollama / LLM service)

---

# Setup

```bash
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

# API Endpoints

## User

* POST `/user/register`
* POST `/user/login`

## Chat

* POST `/chat`

## Quiz

* POST `/quiz/generate`
* POST `/quiz-attempt/submit`
* GET `/quiz-attempt/history/`

## Tip

* GET `/tip?language=en`

---

# Authentication

* JWT required for protected routes
* Sent via header:

```
Authorization: Bearer <token>
```

---

# Architecture Notes

* RAG-based context retrieval for quiz generation
* LLM generates MCQs dynamically
* MongoDB stores users, quizzes, and attempts
* JWT middleware secures routes

---

# Database Models

* User
* Quiz
* QuizAttempt

---

# Future Improvements

* Redis caching for quiz generation
* WebSocket real-time chat
* Leaderboard system
* Rate limiting & analytics dashboard

---

# Summary

This backend powers a full-stack AI learning system wi
