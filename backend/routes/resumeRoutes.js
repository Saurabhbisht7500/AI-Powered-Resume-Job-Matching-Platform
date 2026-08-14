const express = require("express");
const multer = require("multer");
const router = express.Router();
const analyzeResume = require("../utils/aiMatcher");

const Job = require("../models/Job");
const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../utils/resumeParser");
const { extractSkills } = require("../utils/skillExtractor");
const { matchResumeToJobs } = require("../utils/matcher");

// Store uploaded file in memory (no need to persist the raw PDF to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

// POST /api/resume/upload -> parse PDF, extract skills, match jobs
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || "";

    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    // 1. Extract raw text from the uploaded PDF
    const rawText = await extractTextFromPDF(req.file.buffer);
    if (!rawText || rawText.length < 20) {
      return res
        .status(422)
        .json({ error: "Could not extract readable text from this PDF" });
    }

    // 2. Analyze resume against the optional job description
    let aiAnalysis = null;
    try {
      aiAnalysis = await analyzeResume(rawText, jobDescription);
    } catch (innerError) {
      console.warn("AI analysis failed:", innerError.message);
    }

    // 3. Extract skills via keyword-based NLP matching
    const extractedSkills = extractSkills(rawText);

    // 4. Fetch job postings and compute match scores
    const jobs = await Job.find();
    if (!jobs.length) {
      return res.status(404).json({
        error: "No job postings found in the database. Please seed jobs first.",
      });
    }
    const matches = matchResumeToJobs(rawText, extractedSkills, jobs);

    // 5. Persist this resume + its top matches for history/analytics
    const resumeDoc = await Resume.create({
      fileName: req.file.originalname,
      rawText,
      extractedSkills,
      matches: matches.map((m) => ({ job: m._id, score: m.matchScore })),
      jobDescription,
      aiAnalysis,
    });

    res.json({
      resumeId: resumeDoc._id,
      fileName: req.file.originalname,
      extractedSkills,
      matches,
      aiAnalysis,
      jobDescription,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/resume/history -> list previously analyzed resumes
router.get("/history", async (req, res) => {
  try {
    const resumes = await Resume.find()
      .select("fileName extractedSkills createdAt")
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

