# 🎓 Mini LMS Video Tracker

A full-stack Learning Management System built with the MERN stack. Users can browse video modules, track completion progress, and resume videos from where they left off.

## Live Demo
- **Frontend:** https://mini-lms-silk.vercel.app
- **Backend API:** https://mini-lms-backend-67ek.onrender.com

## ✨ Features
- 📹 Video-based course viewer with HTML5 player
- ✅ Mark modules as complete with **optimistic UI updates**
- 📊 Real-time progress bar showing course completion percentage
- ⏱️ **Video resume state** — automatically resumes from last watched timestamp
- 🔄 Error rollback — reverts UI if API call fails
- 🐳 Fully dockerized — spin up entire stack with one command

## 🛠️ Tech Stack
**Frontend:** React, Vite, Axios, Context API

**Backend:** Node.js, Express.js

**Database:** MongoDB Atlas, Mongoose

**DevOps:** Docker, Docker Compose

## 📁 Project Structure
```
mini-lms/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── seed.js         # Database seeder
│   └── index.js        # Entry point
├── frontend/
│   └── src/
│       ├── components/ # CourseSidebar, VideoPlayer, ProgressBar
│       └── context/    # Global state with Context API
└── docker-compose.yml
```

## 🚀 Getting Started

### Option 1 — Docker (Recommended)
```bash
git clone https://github.com/Yashhh0602/mini-lms.git
cd mini-lms
docker-compose up
```
Visit `http://localhost:5173`

### Option 2 — Manual Setup

#### Prerequisites
- Node.js v20+
- MongoDB Atlas account

#### Backend
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
```

Seed the database:
```bash
node seed.js
```

Start the server:
```bash
node index.js
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses/:id` | Get course and its modules |
| GET | `/api/progress/:userId/:courseId` | Get user's progress on a course |
| PUT | `/api/progress/:userId/:moduleId` | Mark a module complete |

## 🗄️ Database Schema

**Course** — title, description, modules[]

**Module** — title, description, videoUrl, order, courseId

**UserProgress** — userId, courseId, moduleId, completed, watchedTimestamp

## 🎁 Bonus Features Implemented
- Video resume — tracks the exact timestamp where you paused
- Docker setup — entire stack runs with one command
- Optimistic UI — instant feedback with automatic rollback on errors
- Auto advance — moves to next module when video finishes