const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../utils/pdfExtractor");
const { extractSkills } = require("../utils/skillExtractor");
const { matchResumeToJobs } = require("../utils/matcher");
const analyzeResume = require("../utils/aiMatcher");

router.use(authMiddleware);

// POST /api/resume/upload - upload PDF, extract skills, match against all jobs
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded. Field name must be 'resume'." });
    }

    // 1. Extract raw text from PDF
    const rawText = await extractTextFromPDF(req.file.buffer);
    if (!rawText || rawText.trim().length < 20) {
      return res.status(422).json({
        success: false,
        message:
          "Could not extract text from this PDF. Make sure it has real selectable text (not a scanned image).",
      });
    }

    // 2. Extract skills via keyword-based NLP
    const extractedSkills = extractSkills(rawText);

    // 3. Analyze resume against the optional job description
    const jobDescription = req.body.jobDescription || "";
    let aiAnalysis = null;
    try {
      aiAnalysis = await analyzeResume(rawText, jobDescription);
    } catch (innerError) {
      console.warn("AI analysis failed:", innerError.message);
    }

    // 4. Fetch all jobs and run TF-IDF + skill overlap matching
    const jobs = await Job.find();
    if (jobs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No job postings found in database. Run 'npm run seed' in the backend folder first.",
      });
    }
    const matches = matchResumeToJobs(rawText, extractedSkills, jobs);

    // 5. Save resume + match history
    const resumeDoc = await Resume.create({
      userId: req.userId,
      fileName: req.file.originalname,
      fileSizeKB: Math.round(req.file.size / 1024),
      rawText,
      extractedSkills,
      matches,
      bestMatchScore: matches[0]?.matchScore || 0,
      bestMatchTitle: matches[0]?.title || "",
      jobDescription,
      aiAnalysis,
    });

    res.status(201).json({
      success: true,
      resumeId: resumeDoc._id,
      fileName: resumeDoc.fileName,
      fileSizeKB: resumeDoc.fileSizeKB,
      extractedSkills,
      matches,
      aiAnalysis,
      jobDescription,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/resume/history - list previously uploaded resumes (most recent first)
router.get("/history", async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .select("fileName fileSizeKB extractedSkills bestMatchScore bestMatchTitle createdAt")
      .sort({ createdAt: -1 });
    res.json({ success: true, resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/resume/:id - get full detail (including matches) for one resume
router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    res.json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
