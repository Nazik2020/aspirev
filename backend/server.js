const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const httpsRedirect = require("./middleware/httpsRedirect");
const { sanitize, xssClean } = require("./middleware/sanitize");

dotenv.config();

// ─── Validate required env vars ──────────────────────────────────────────────
const required = ["MONGO_URI", "JWT_SECRET", "JWT_REFRESH_SECRET"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`[FATAL] Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

connectDB();

const app = express();

// ─── HTTPS Redirect (production) ─────────────────────────────────────────────
app.use(httpsRedirect);

// ─── CORS — must be FIRST so preflight OPTIONS always gets headers ───────────
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://mango-field-0f043dd0f.7.azurestaticapps.net",
    "https://invikt-backend.onrender.com",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ─── Security Headers ────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Too many requests. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: "Too many login attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Body Parsing (must be before sanitize/xss) ─────────────────────────────
app.use(express.json({ limit: "2mb" }));

// ─── NoSQL Injection Protection ──────────────────────────────────────────────
app.use(sanitize);

// ─── XSS Protection ──────────────────────────────────────────────────────────
app.use(xssClean);

// ─── Route Imports ────────────────────────────────────────────────────────────
const authRoutes = require("./routes/auth/authRoutes");
const jobRoutes = require("./routes/jobs/jobRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const portfolioShareRoutes = require("./routes/share/portfolioShareRoutes");
const dashboardRoutes = require("./routes/dashboard/dashboardRoutes");
const roadmapRoutes = require("./routes/roadmaps/roadmapRoutes");
const profileRoutes = require("./routes/settings/profileRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");

// ─── Mount Routes ─────────────────────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/portfolio/share", portfolioShareRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/settings/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invikt AI API is running...",
    version: "1.0.0",
    env: {
      JWT_SECRET: !!process.env.JWT_SECRET,
      JWT_REFRESH_SECRET: !!process.env.JWT_REFRESH_SECRET,
      MONGO_URI: !!process.env.MONGO_URI,
      FRONTEND_URL: process.env.FRONTEND_URL || "not set",
    },
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
