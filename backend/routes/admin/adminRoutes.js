const express = require("express");
const { getUsers } = require("../../controllers/admin/adminController");
const { protect, adminOnly } = require("../../middleware/auth/authMiddleware");

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(protect);
router.use(adminOnly);

// @route   GET /api/admin/users
// @desc    Get paginated users and stats
// @access  Private/Admin
router.get("/users", getUsers);

// @route   PUT /api/admin/users/:id/suspend
// @desc    Toggle suspend status of a user
// @access  Private/Admin
const { suspendUser, deleteUser, getUserProfile } = require("../../controllers/admin/adminController");
router.put("/users/:id/suspend", suspendUser);

// @route   GET /api/admin/users/:id/profile
// @desc    Get detailed user profile
// @access  Private/Admin
router.get("/users/:id/profile", getUserProfile);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user permanently
// @access  Private/Admin
router.delete("/users/:id", deleteUser);

// ─── Application Analytics Routes ──────────────────────────────────────────
const { getApplicationAnalytics, exportApplications } = require("../../controllers/admin/applicationAnalyticsController");

// @route   GET /api/admin/applications
// @desc    Get aggregated application analytics
// @access  Private/Admin
router.get("/applications", getApplicationAnalytics);

// @route   GET /api/admin/applications/export
// @desc    Export applications as CSV-ready JSON
// @access  Private/Admin
router.get("/applications/export", exportApplications);

// ─── Overview Dashboard Routes ─────────────────────────────────────────────
const { getOverview, getHealthCheck } = require("../../controllers/admin/overviewController");

// @route   GET /api/admin/overview/health
// @desc    Run system health check
// @access  Private/Admin
router.get("/overview/health", getHealthCheck);

// @route   GET /api/admin/overview
// @desc    Get admin overview dashboard data
// @access  Private/Admin
router.get("/overview", getOverview);

module.exports = router;
