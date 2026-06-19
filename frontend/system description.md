<div align="center">

<img src="https://i.imgur.com/placeholder.png" alt="Invikt Logo" width="80"/>

# Invikt

### Conquer your career.

**AI-powered Career Intelligence Platform for students, graduates, and early-career job seekers.**

[![Website](https://img.shields.io/badge/Website-invikt.com-blue?style=flat-square&logo=google-chrome)](https://invikt.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)]()

</div>

---

## What is Invikt?

Invikt is a career intelligence platform built for university students, fresh graduates, and early-career job seekers who feel lost, overwhelmed, or unprepared when entering the job market.

The name **Invikt** comes from the Latin word *Invictus* — meaning **unconquered**. Every student who gets rejected, feels stuck, or doubts themselves is fighting to rise above. Invikt exists to make sure they do.

Most students today apply to dozens of jobs blindly — with no system, no strategy, and no feedback. They don't know why they get rejected. They don't know what skills they're missing. They don't know what to learn next or how to track where they've applied.

**Invikt solves all of this in one place.**

---

## The Problem We Solve

Every year, millions of students graduate and enter the job market completely unprepared:

- They send resumes into the void with no response and no feedback
- They apply to the same companies multiple times without remembering
- They have no idea what skills their dream job actually requires
- They start learning random courses with no structured plan
- Career guidance is either too expensive, too generic, or not built for their generation

Invikt is the platform that was missing.

---

## Core Features (V1)

### 🗺️ Career Roadmaps

Professionally curated, structured learning roadmaps for the most in-demand career paths. Users select their target career and instantly receive a clear, stage-by-stage learning path showing exactly what to learn, in what order, and where to learn it — for free.

Each roadmap includes:
- Stages organized from beginner foundations to advanced professional skills
- Short description of every skill
- Curated free learning resources — YouTube playlists, FreeCodeCamp, The Odin Project, official docs
- Hands-on practice resources and project ideas
- Progress checkboxes — mark skills as learned, track completion per stage
- Overall progress bar showing how far along the career path the user is

**Available career paths:**
- Frontend Developer
- Backend Developer
- Full Stack Developer
- Data Scientist
- UI/UX Designer
- DevOps Engineer
- Cybersecurity Analyst
- Mobile Developer
- AI/ML Engineer
- Product Manager

---

### 📋 Job Application Tracker

A visual Kanban-style board that brings order to the chaos of job hunting. Every application lives in one organized place — no more lost emails, forgotten follow-ups, or duplicate applications.

**Application status stages:**

| Stage | Description |
|---|---|
| Wishlist | Jobs saved to apply to later |
| Applied | Submitted applications |
| Assessment | Online tests or assignments received |
| Interview | Interview scheduled or completed |
| Final Interview | Advanced to final round |
| Offer | Received a job offer |
| Rejected | Application unsuccessful |

**Each job card contains:**
- Company name and job title
- Date applied
- Link to the job posting
- Notes and follow-up reminders
- Current status tag

**Personal Dashboard shows:**
- Total applications submitted
- Number of active interviews
- Overall application success rate
- Applications added this week
- Visual breakdown across all stages

---

## Who Is Invikt Built For?

- **University students** in their final years preparing to enter the workforce
- **Fresh graduates** actively job hunting after completing their degrees
- **Internship seekers** looking for their first professional experience
- **Self-taught developers and designers** who need structured guidance
- **Career changers** moving into tech or another growing industry

Invikt is built for the **global student** — not just one country or one university — because the challenge of starting a career is universal.

---

## What Makes Invikt Different

| Feature | Generic Tools | Invikt |
|---|---|---|
| Career roadmaps | ❌ | ✅ Structured + free resources |
| Progress tracking | ❌ | ✅ Per skill + per stage |
| Job application tracker | ❌ | ✅ Visual Kanban board |
| Dashboard analytics | ❌ | ✅ Success rate + stats |
| Cost | Paid | ✅ Free |
| Target audience | General | ✅ Students + graduates |

---

## Tech Stack

### Frontend
- **React.js** + **Vite** — fast, modern UI framework
- **Tailwind CSS** — utility-first styling
- **React Router** — client-side navigation
- **Design System** — dark glassmorphism aesthetic with gradient accents

### Backend
- **FastAPI** (Python) — lightweight, high-performance API
- **Uvicorn** — ASGI server

### Database
- **MongoDB Atlas** — flexible, scalable cloud database

### Deployment
- **Vercel** — frontend hosting with global edge network
- **Render** — backend hosting
- **invikt.com** — custom domain

---

## Project Structure

```
invikt/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Button.jsx
│   │   │   ├── roadmap/
│   │   │   │   ├── CareerCard.jsx
│   │   │   │   ├── StageAccordion.jsx
│   │   │   │   ├── SkillRow.jsx
│   │   │   │   └── ResourceSidebar.jsx
│   │   │   └── tracker/
│   │   │       ├── KanbanBoard.jsx
│   │   │       ├── JobCard.jsx
│   │   │       └── AddJobModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   ├── RoadmapDetail.jsx
│   │   │   ├── Tracker.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── data/
│   │   │   └── roadmaps.json
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── tracker.py
│   │   │   └── auth.py
│   │   ├── models/
│   │   │   └── job.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account (free)

### Clone the Repository

```bash
git clone https://github.com/yourusername/invikt.git
cd invikt
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Mac/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`

### Environment Variables

Create a `.env` file inside the `backend/` folder:

```
MONGODB_URL=your_mongodb_connection_string
DATABASE_NAME=invikt
SECRET_KEY=your_secret_key
```

---

## Roadmap

### V1 — Foundation (Current)
- [x] Project setup and architecture
- [ ] Career Roadmaps page
- [ ] Roadmap detail view with stages and skills
- [ ] Progress tracking with localStorage
- [ ] Job Application Tracker (Kanban board)
- [ ] Personal dashboard with stats
- [ ] User authentication

### V2 — Intelligence
- [ ] Resume upload and parsing
- [ ] Resume quality scoring
- [ ] ATS match analysis against job descriptions
- [ ] Skill gap detection
- [ ] Connect roadmap progress to resume data

### V3 — Growth
- [ ] AI-powered resume builder
- [ ] Mentor marketplace
- [ ] University and bootcamp partnerships
- [ ] Premium subscription tier
- [ ] Mobile application

---

## Contributing

Contributions are welcome. If you have an idea for a feature, find a bug, or want to improve the codebase:

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "add your feature"`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

Built by **Nazik** — a student building in public.

- Website: [invikt.com](https://invikt.com)
- Email: hello@invikt.com
- Twitter/X: [@invikt](https://twitter.com/invikt)
- LinkedIn: [Invikt](https://linkedin.com/company/invikt)

---

<div align="center">

**Invikt. Conquer your career.**

*Built for students. By a student.*

</div>
