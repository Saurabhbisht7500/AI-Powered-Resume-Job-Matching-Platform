const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: "Remote" },
    description: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    logoInitial: { type: String, default: "J" },
    logoColor: { type: String, default: "#4F46E5" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
