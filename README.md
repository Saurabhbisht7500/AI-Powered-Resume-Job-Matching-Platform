# AI Resume / Job Matching Platform

A full-stack web app that lets a user upload a resume (PDF), automatically extracts
skills from it using keyword-based NLP, and ranks a set of job postings by how well
they match the resume using a hand-written **TF-IDF + cosine similarity** engine
combined with **direct skill overlap**.

**Stack:** Next.js (React) + Tailwind CSS · Node.js/Express · MongoDB · pdf-parse

---

## 1. What's inside

```
resume-matcher/
├── backend/                  # Express + MongoDB API
│   ├── config/db.js          # Mongo connection
│   ├── models/                Job.js, Resume.js
│   ├── routes/                 jobs.js, resume.js
│   ├── middleware/upload.js   # Multer PDF upload handling
│   ├── utils/
│   │   ├── skillList.js       # ~90-skill dictionary
│   │   ├── skillExtractor.js  # keyword-based NLP skill extraction
│   │   ├── pdfExtractor.js    # PDF -> raw text
│   │   └── matcher.js         # TF-IDF + cosine similarity + skill overlap
│   ├── seedJobs.js            # seeds 8 sample job postings
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/                 # Next.js dashboard (matches the screenshot UI)
    ├── pages/                  index.js (dashboard), upload.js, jobs.js,
    │                           matches.js, history.js, profile.js, settings.js
    ├── components/             Sidebar, Topbar, StatCard, JobMatchCard, Layout
    ├── lib/api.js              axios client for the backend
    ├── package.json
    └── .env.local.example
```

---

## 2. System requirements

| Requirement | Details |
|---|---|
| OS | Windows 10/11, macOS, or Linux |
| Node.js | v18 or higher (comes with npm) — check with `node -v` |
| MongoDB | Community Server (local) **or** a free MongoDB Atlas cluster |
| Code editor | VS Code (recommended) |
| Browser | Chrome / Firefox / Edge |
| RAM / Disk | 4 GB RAM min, ~500 MB free disk (node_modules) |
| Internet | Needed once for `npm install` (and for Atlas if you use it) |

---

## 3. Step-by-step setup (for a fresher)

### Step 0 — Unzip the project
Unzip `resume-matcher.zip` and open the `resume-matcher` folder in VS Code
(`File → Open Folder`). You should see `backend/` and `frontend/` folders.

### Step 1 — Install MongoDB
Pick ONE option:

**Option A — Local install (recommended for offline use)**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install it. On Windows/Mac the installer sets it up as a background service automatically.
3. Verify it's running:
   - Windows: open the **Services** app → look for "MongoDB Server" → should say *Running*.
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

**Option B — MongoDB Atlas (free cloud DB, no local install)**
1. Go to https://www.mongodb.com/atlas and create a free cluster.
2. Click **Connect → Drivers**, copy the connection string
   (looks like `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/`).
3. You'll paste this into `backend/.env` in Step 2 (see below).
4. In Atlas, under **Network Access**, add your current IP (or `0.0.0.0/0` for testing).

### Step 2 — Set up and run the backend
Open a terminal in VS Code (`` Ctrl+` ``) and run:

```bash
cd backend
npm install
```

Create your environment file:

```bash
# Windows (PowerShell):
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

Open the new `backend/.env` file and set `MONGO_URI`:
- Local MongoDB → leave it as `mongodb://127.0.0.1:27017/resume_matcher`
- Atlas → paste your connection string and add `/resume_matcher` before the `?` if present

Seed the database with 8 sample job postings (do this once):

```bash
npm run seed
```
You should see: `✅ Seeded 8 job postings.`

Start the backend server:

```bash
npm run dev
```
You should see:
```
✅ MongoDB connected: ...
🚀 Server running on http://localhost:5000
```
**Leave this terminal running.** Test it works by opening
http://localhost:5000/api/health in your browser — you should see `{"status":"ok",...}`.

### Step 3 — Set up and run the frontend
Open a **second** terminal (keep the backend one running) and run:

```bash
cd frontend
npm install
```

Create the frontend env file:

```bash
# Windows:
copy .env.local.example .env.local

# Mac/Linux:
cp .env.local.example .env.local
```
The default value (`http://localhost:5000/api`) is correct if you didn't change the backend port.

Start the frontend:

```bash
npm run dev
```
You should see `Local: http://localhost:3000`.

### Step 4 — Use the app
1. Open **http://localhost:3000** in your browser — you'll land on the Dashboard.
2. Click **Upload New Resume**, drag in a PDF resume that has real selectable text
   (not a scanned image), and click **Upload & Analyze**.
3. Go back to the Dashboard — you'll see your extracted skills, best match score,
   and top job matches, styled like the reference screenshot.
4. Check **Job Listings**, **My Matches**, and **Resume History** from the sidebar.

---

## 4. Common issues

| Problem | Fix |
|---|---|
| `MongoDB connection error` | MongoDB isn't running. Start the service (see Step 1) or check your Atlas connection string / IP allowlist. |
| `Port 5000 already in use` | Change `PORT` in `backend/.env`, and update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` to match. |
| Upload fails / "Could not extract text" | The PDF has no selectable text (it's a scanned image). This project doesn't include OCR — use a text-based PDF. |
| Dashboard shows "No resume uploaded yet" forever | Make sure you ran `npm run seed` in the backend AND uploaded at least one resume. |
| Frontend shows a red "Could not connect to backend" banner | The backend terminal isn't running, or the ports/env URL don't match. |
| `npm install` fails | Make sure Node.js v18+ is installed (`node -v`) and you have an internet connection. |

---

## 5. How the matching algorithm works

1. **PDF → text**: `pdf-parse` extracts raw text from the uploaded resume.
2. **Skill extraction**: the text is scanned against a ~90-skill dictionary
   (`skillList.js`) using normalized keyword/phrase matching — this is the
   "NLP layer" (keyword-based, no external ML model needed).
3. **Matching** (`matcher.js`), for each job:
   - **Skill overlap score** = (skills in resume ∩ skills required by job) / (skills required by job)
   - **TF-IDF cosine similarity score**: both the resume text and the job description
     are tokenized, term-frequency vectors are built, IDF is computed across
     resume + all jobs, and cosine similarity between the TF-IDF vectors is calculated —
     all implemented from scratch, no external ML library.
   - **Final score** = `0.6 × skill overlap + 0.4 × TF-IDF similarity`, scaled to 0–100%.
4. Jobs are ranked by final score and returned with matched/missing skills.

This combination is used because skill overlap alone is easy to game, while TF-IDF
alone can be skewed by resume length/wording — combining both gives a more balanced score.

---

## 6. REST API reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/resume/upload` | Upload a PDF (`multipart/form-data`, field name `resume`), returns extracted skills + ranked matches |
| GET | `/api/resume/history` | List all previously uploaded resumes |
| GET | `/api/resume/:id` | Full detail (including matches) for one resume |
| GET | `/api/jobs` | List all job postings |
| POST | `/api/jobs` | Create a new job posting |
| DELETE | `/api/jobs/:id` | Delete a job posting |
| GET | `/api/health` | Health check |

---

## 7. Extending this project (for a major project / viva depth)

- Add authentication (login/signup, JWT) so resumes/matches are per-user
- Support `.docx` resumes in addition to PDF
- Swap the keyword-based skill extractor for a real NER model (e.g. spaCy microservice)
- Add a recruiter-side dashboard to post jobs and view top candidates
- Add Dockerfile / docker-compose for one-command setup
- Add OCR (e.g. Tesseract) to support scanned resume PDFs

Why this counts as "AI/NLP" for a viva: the skill extraction is a keyword-based NLP
technique (lexical matching over normalized text), and the TF-IDF + cosine similarity
matcher is a classic information-retrieval / text-similarity algorithm — the same
family of techniques used in early search engines and document-similarity systems,
implemented here from scratch without an external ML library.
