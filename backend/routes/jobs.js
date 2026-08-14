const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET /api/jobs - list all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/jobs - create a new job posting
router.post("/", async (req, res) => {
  try {
    const { title, company, location, description, requiredSkills, logoInitial, logoColor } = req.body;
    if (!title || !company || !description) {
      return res.status(400).json({ success: false, message: "title, company and description are required" });
    }
    const job = await Job.create({
      title,
      company,
      location,
      description,
      requiredSkills: requiredSkills || [],
      logoInitial: logoInitial || title[0].toUpperCase(),
      logoColor: logoColor || "#4F46E5",
    });
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
