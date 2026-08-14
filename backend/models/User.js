const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // New profile fields
  phone: { type: String, default: "" },
  jobTitle: { type: String, default: "" },
  skills: { type: String, default: "" },
  bio: { type: String, default: "" },
  isProfileComplete: { type: Boolean, default: false } // Tracks setup status
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);