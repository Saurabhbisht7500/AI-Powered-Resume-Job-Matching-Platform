require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Job = require("./models/Job");

const jobs = [
 
];

async function seed() {
  await connectDB();
  await Job.deleteMany({});
  await Job.insertMany(jobs);
  console.log(`✅ Seeded ${jobs.length} job postings.`);
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
