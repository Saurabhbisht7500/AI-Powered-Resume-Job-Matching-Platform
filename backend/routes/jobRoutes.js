const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET /api/jobs -> list all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/jobs -> create a new job posting
router.post("/", async (req, res) => {
  try {
    const { title, company, location, description, requiredSkills } =
      req.body;
    if (!title || !company || !description) {
      return res
        .status(400)
        .json({ error: "title, company and description are required" });
    }
    const job = await Job.create({
      title,
      company,
      location,
      description,
      requiredSkills: requiredSkills || [],
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/jobs/:id -> remove a job posting
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
