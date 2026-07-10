const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: { type: String, required: true },
    role: { type: String, required: true },
    stage: {
      type: String,
      enum: [
        "WISHLIST",
        "APPLIED",
        "ASSESSMENT",
        "INTERVIEW",
        "FINAL",
        "OFFER",
        "REJECTED",
      ],
      default: "WISHLIST",
    },
    badge: { type: String },
    source: { type: String, default: "Direct" },
    location: { type: String },
    employmentType: { type: String },
    jobUrl: { type: String },
    dateApplied: { type: Date },
    notes: { type: String },
    info: { type: String },
    logoColor: { type: String },
    logoText: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.JobApplication || mongoose.model("JobApplication", jobApplicationSchema);
