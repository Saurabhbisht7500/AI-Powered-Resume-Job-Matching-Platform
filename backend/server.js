require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const jobRoutes = require("./routes/jobs");
const resumeRoutes = require("./routes/resume");

const app = express();
const authRoutes = require("./routes/auth");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Resume Matcher API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler (e.g. multer file-type errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
