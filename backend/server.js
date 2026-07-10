const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Load env variables FIRST before anything else
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet()); // Sets secure HTTP headers

// Rate limiter — max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, error: "Too many requests. Please try again after 15 minutes." },
});
app.use("/api/", limiter);

// Stricter rate limit for auth routes — max 10 attempts per 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: "Too many login attempts. Please try again after 15 minutes." },
});

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// ─── Route Imports ────────────────────────────────────────────────────────────
const authRoutes = require("./routes/auth/authRoutes");
const jobRoutes  = require("./routes/jobs/jobRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const portfolioShareRoutes = require("./routes/share/portfolioShareRoutes");

// ─── Mount Routes ─────────────────────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRoutes); // Auth routes (with strict limiter)
app.use("/api/jobs", jobRoutes);               // Job Tracker routes
app.use("/api/portfolio", portfolioRoutes);    // Portfolio Builder routes
app.use("/api/upload", uploadRoutes);          // File upload routes
app.use("/api/portfolio/share", portfolioShareRoutes); // Portfolio Sharing & Analytics routes

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invikt AI API is running...",
    version: "1.0.0",
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found.` });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
