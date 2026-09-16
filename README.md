# 🪐 CareerOrbit — Full-Stack AI Job Application Tracker

> **"Your entire job search, organized intelligently. Track. Prepare. Apply. Get Hired."**

CareerOrbit is a production-grade, centralized job search command center designed for students, freshers, and working professionals. It combines Kanban pipelines, interview preparation checklists, automated follow-up email scheduling, Recharts career analytics, recruiter CRM, and an AI-ready career copilot interface.

---

## 🌟 Key Features Implemented

1. **Public Landing Page:** Hero section, interactive preview, feature cards, testimonials, FAQ accordion, and instant demo access.
2. **Authentication & Onboarding:** JWT authentication, password hashing, protected routes, and a 4-step onboarding wizard for job targeting and goal setting.
3. **Command Center Dashboard:** Real-time KPI metrics, Application Funnel visualization, Today's Priorities, Activity Timeline feed, and Gamification Progress tracker.
4. **Applications Management:** Multi-criteria filtering (Stage, Priority, Work Mode, Source, Tags), search, tag filters, sorting, favoriting, archiving, duplicating, and detailed workspace view.
5. **Interactive Kanban Pipeline:** Smooth drag-and-drop stage updates (`@hello-pangea/dnd`), real-time database state sync, timeline logging, and toast notifications.
6. **Interview Preparation Workspace:** STAR framework checklists, interviewer questions list, meeting link triggers, and post-interview reflections.
7. **Automated Follow-Up Engine:** Automated outreach reminders, pending/sent status tracking, pre-formatted templates, and one-click copy-to-clipboard.
8. **Career Search Calendar:** Agenda and Month schedule views for interviews, assessments, follow-ups, and application deadlines.
9. **Task System:** Action items, coding assessment reminders, priority tags, and "Needs Attention" filters.
10. **Companies & Recruiter CRM:** Corporate directories with employee size, star rating, website links, and recruiter contact history.
11. **Document Management:** Track resume versions (`v1.0`, `v2.0`, `v3.0`) and cover letters associated with each job application.
12. **Analytics Dashboard:** Recharts charts including Application Funnel, Status Distribution Pie, Weekly Trend lines, and Source Conversion metrics.
13. **AI Career Copilot & ATS Matcher:** Interactive prompt assistant (`askCopilot`) and ATS Resume vs. Job Description keyword match analyzer.
14. **Settings & Data Export:** Profile preferences, dark/light theme persistence, and functional **CSV** and **JSON** data export generators.

---

## 📁 Project Architecture

```
c:\Users\aathi\Job Tracker01/
├── client/                     # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── CommandCenter/  # CommandCenterWidget
│   │   │   ├── Dashboard/      # FunnelChart, GamificationWidget
│   │   │   ├── Modals/         # QuickAddModal, ApplicationModal, SearchModal, NotificationDrawer
│   │   │   └── Navigation/     # Sidebar, TopBar, MobileBottomNav
│   │   ├── context/            # AuthContext, ThemeContext, ApplicationContext
│   │   ├── layouts/            # MainLayout
│   │   ├── pages/              # LandingPage, LoginPage, RegisterPage, OnboardingPage, DashboardPage, ApplicationsPage, ApplicationDetailPage, KanbanPage, InterviewsPage, CalendarPage, TasksPage, FollowUpsPage, CompaniesPage, ContactsPage, DocumentsPage, AnalyticsPage, CareerInsightsPage, SettingsPage
│   │   ├── services/           # api.js fetch client
│   │   ├── App.jsx             # React Router DOM configuration
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind CSS & theme tokens
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── config/                 # db.js (MongoDB + In-Memory Fallback)
│   ├── controllers/            # Auth, Applications, Companies, Contacts, Interviews, Tasks, Followups, Analytics, AI
│   ├── middleware/             # authMiddleware.js
│   ├── models/                 # User, Application, Company, Contact, Interview, Task, FollowUp
│   ├── routes/                 # REST API endpoints
│   ├── services/               # AIService.js, DemoSeedService.js
│   ├── index.js                # Express app entrypoint
│   ├── .env.example
│   └── package.json
├── package.json                # Root package launcher
└── README.md
```

---

## ⚡ Quick Start & Installation Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- (Optional) MongoDB local instance or MongoDB Atlas URI

### Step 1: Install Dependencies

Run the following commands to install root, client, and server dependencies:

```bash
# In the project root (c:\Users\aathi\Job Tracker01)
npm install --prefix server
npm install --prefix client
```

### Step 2: Configure Environment Variables

Create a `.env` file inside the `/server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/careerorbit
JWT_SECRET=careerorbit_super_secret_jwt_key_2026
OPENAI_API_KEY=
GEMINI_API_KEY=
NODE_ENV=development
```

> **Note:** If `MONGODB_URI` is omitted or local MongoDB is offline, CareerOrbit automatically boots into high-performance local mode with pre-seeded realistic sample data so you can evaluate the platform instantly!

### Step 3: Run the Application

#### Start Server (Backend):
```bash
cd server
npm run dev
# Running on http://localhost:5000
```

#### Start Client (Frontend):
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

---

## 🔑 Demo Login Credentials

For portfolio reviewers evaluating the app immediately:

- **Email:** `alex@careerorbit.dev` (or click **"Try Demo"** on the Login or Landing page)
- **Password:** `demo123`

---

## 🔌 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive JWT token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `GET` | `/api/applications` | Get all job applications |
| `POST` | `/api/applications` | Create a job application |
| `PUT` | `/api/applications/:id` | Update job application details |
| `PATCH` | `/api/applications/:id/status` | Update Kanban pipeline stage |
| `DELETE` | `/api/applications/:id` | Delete job application |
| `GET` | `/api/interviews` | Get scheduled & completed interviews |
| `POST` | `/api/interviews` | Schedule new interview round |
| `GET` | `/api/tasks` | Get job search todo tasks |
| `GET` | `/api/followups` | Get follow-up reminders & templates |
| `GET` | `/api/analytics/overview` | Fetch funnel, KPIs, and trend metrics |
| `POST` | `/api/ai/copilot` | Ask AI Career Copilot |
| `POST` | `/api/ai/resume-match` | Perform ATS keyword match analysis |

---

## 🤖 AI-Ready Features & External API Integration

- **Configured Abstraction:** `AIService` (`server/services/AIService.js`) handles career analysis, resume matching, and follow-up email generation.
- **External Key Integration:** Adding `OPENAI_API_KEY` or `GEMINI_API_KEY` to `server/.env` automatically activates live external LLM API calls. Without keys, CareerOrbit executes a rich local deterministic intelligence layer.

---

## 🚀 Future Integrations
- Chrome Browser Extension for 1-click LinkedIn job clipping.
- Gmail & Google Calendar 2-way sync for interview slots.
- Automated email status parser for recruiter updates.
