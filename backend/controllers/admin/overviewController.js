const mongoose = require("mongoose");
const User = require("../../models/auth/User");
const JobApplication = require("../../models/jobs/JobApplication");
const RoadmapProgress = require("../../models/RoadmapProgress");
const Portfolio = require("../../models/Portfolio");

// @desc    Get admin overview dashboard data
// @route   GET /api/admin/overview
// @access  Private/Admin
exports.getOverview = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(now.getDate() - 1);

    const [
      totalUsers,
      usersToday,
      usersLastWeek,
      activeUsers,
      totalApps,
      appsLastWeek,
      activeRoadmaps,
      recentSignups,
      userGrowth,
      featureUsage,
      mongoReady,
    ] = await Promise.all([
      // Total users (non-admin)
      User.countDocuments({ role: { $ne: "admin" } }),

      // New users in last 24h
      User.countDocuments({ createdAt: { $gte: oneDayAgo } }),

      // New users last 7 days
      User.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
        role: { $ne: "admin" },
      }),

      // Active users: users with job applications in last 30 days
      JobApplication.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: "$userId" } },
        { $count: "count" },
      ]).then((r) => (r.length > 0 ? r[0].count : 0)),

      // Total job applications
      JobApplication.countDocuments({}),

      // New apps last 7 days
      JobApplication.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),

      // Active roadmap sessions (distinct users with roadmap progress)
      RoadmapProgress.distinct("userId").then((ids) => ids.length),

      // Recent 5 signups (non-admin)
      User.find({ role: { $ne: "admin" } })
        .select("firstName lastName email createdAt profilePicture")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),

      // User growth over last 30 days, grouped by week
      User.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $isoWeek: "$createdAt" },
            },
            count: { $sum: 1 },
            date: { $min: "$createdAt" },
          },
        },
        { $sort: { date: 1 } },
      ]),

      // Feature usage counts
      Promise.all([
        User.countDocuments({ role: { $ne: "admin" } }),
        JobApplication.countDocuments({}),
        RoadmapProgress.countDocuments({}),
        Portfolio.countDocuments({}),
      ]).then(([users, jobs, roadmaps, portfolios]) => ({
        users,
        jobs,
        roadmaps,
        portfolios,
      })),

      // MongoDB connection ready state
      mongoose.connection.readyState === 1,
    ]);

    // Build user growth chart data
    const chartData = buildChartData(userGrowth, thirtyDaysAgo, now);

    // Format recent signups
    const formattedSignups = recentSignups.map((u) => ({
      name: `${u.firstName} ${u.lastName}`.trim(),
      email: u.email,
      initials: ((u.firstName?.[0] || "") + (u.lastName?.[0] || "")).toUpperCase(),
      joinedAt: u.createdAt,
      timeAgo: getTimeAgo(u.createdAt),
      avatarColor: getAvatarColor(u.firstName),
    }));

    // Days since last signup for the "+X today" badge
    const todayCount = usersToday;

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalUsers,
          usersToday: todayCount,
          usersLastWeek,
          activeUsers,
          totalApps,
          appsLastWeek,
          activeRoadmaps,
        },
        chartData,
        recentSignups: formattedSignups,
        featureUsage,
        systemHealth: {
          api: true,
          database: mongoReady,
          smtp: true,
          cache: true,
        },
      },
    });
  } catch (error) {
    console.error("Error in getOverview:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc    Run system health check
// @route   GET /api/admin/overview/health
// @access  Private/Admin
exports.getHealthCheck = async (req, res) => {
  try {
    const mongoReady = mongoose.connection.readyState === 1;
    const mongoPing = mongoReady
      ? await mongoose.connection.db.admin().ping().then(() => true).catch(() => false)
      : false;

    res.status(200).json({
      success: true,
      data: {
        api: true,
        database: mongoPing,
        smtp: true,
        cache: true,
      },
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      data: {
        api: true,
        database: false,
        smtp: true,
        cache: true,
      },
    });
  }
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildChartData(raw, startDate, endDate) {
  // Fill in missing weeks with 0
  const weeks = [];
  const cursor = new Date(startDate);
  // Align to Monday
  cursor.setDate(cursor.getDate() - cursor.getDay() + 1);

  while (cursor <= endDate) {
    const year = cursor.getFullYear();
    const week = getISOWeek(cursor);
    const existing = raw.find((r) => r._id.year === year && r._id.week === week);
    weeks.push({
      label: `W${week}`,
      date: new Date(cursor),
      count: existing ? existing.count : 0,
    });
    cursor.setDate(cursor.getDate() + 7);
  }

  // Running total (cumulative)
  let cumulative = 0;
  return weeks.map((w) => {
    cumulative += w.count;
    return {
      label: w.label,
      weeklyNew: w.count,
      cumulative,
    };
  });
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getAvatarColor(name) {
  const colors = [
    "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ];
  const idx = (name || "").charCodeAt(0) % colors.length;
  return colors[idx];
}
