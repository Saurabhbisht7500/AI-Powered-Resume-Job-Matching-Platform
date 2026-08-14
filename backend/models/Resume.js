const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    fileSizeKB: { type: Number, default: 0 },
    rawText: { type: String, default: "" },
    extractedSkills: { type: [String], default: [] },
    matches: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        title: String,
        company: String,
        location: String,
        matchScore: Number,
        matchedSkills: [String],
        missingSkills: [String],
      },
    ],
    bestMatchScore: { type: Number, default: 0 },
    bestMatchTitle: { type: String, default: "" },
    jobDescription: { type: String, default: "" },
    aiAnalysis: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
