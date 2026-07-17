const JobApplication = require("../../models/jobs/JobApplication");
const User = require("../../models/auth/User");

// @desc    Get aggregated application analytics for admin dashboard
// @route   GET /api/admin/applications
// @access  Private/Admin
// @query   range = "7d" | "30d" | "90d" | "all"
exports.getApplicationAnalytics = async (req, res) => {
  try {
    const range = req.query.range || "30d";
    const dateFilter = buildDateFilter(range);

    const [
      totalApps,
      activeApps,
      statusBreakdown,
      volumeOverTime,
      topCompanies,
      topJobTitles,
      offerRate,
      totalUsers,
      appsPerUser,
    ] = await Promise.all([
      // Total applications in range
      JobApplication.countDocuments(dateFilter),

      // Active applications (non-terminal stages) in range
      JobApplication.countDocuments({
        ...dateFilter,
        stage: { $nin: ["OFFER", "REJECTED"] },
      }),

      // Status breakdown for bar chart + donut
      JobApplication.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$stage",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),

      // Volume over time (grouped by day for 7d, week for 30d, month for 90d/all)
      getVolumeOverTime(dateFilter, range),

      // Top companies by application count
      JobApplication.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$company",
            totalApps: { $sum: 1 },
            offers: {
              $sum: { $cond: [{ $eq: ["$stage", "OFFER"] }, 1, 0] },
            },
          },
        },
        { $sort: { totalApps: -1 } },
        { $limit: 8 },
        {
          $project: {
            company: "$_id",
            totalApps: 1,
            offerRate: {
              $cond: [
                { $eq: ["$totalApps", 0] },
                "0%",
                {
                  $concat: [
                    {
                      $toString: {
                        $round: [
                          { $multiply: [{ $divide: ["$offers", "$totalApps"] }, 100] },
                          1,
                        ],
                      },
                    },
                    "%",
                  ],
                },
              ],
            },
          },
        },
      ]),

      // Top job titles by application count
      JobApplication.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$role",
            totalApps: { $sum: 1 },
            // Most common stage for this role
            stages: {
              $push: "$stage",
            },
          },
        },
        { $sort: { totalApps: -1 } },
        { $limit: 8 },
        {
          $project: {
            role: "$_id",
            totalApps: 1,
            commonStage: { $arrayElemAt: ["$stages", 0] },
          },
        },
      ]),

      // Offer rate: offers / total * 100
      JobApplication.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            offers: {
              $sum: { $cond: [{ $eq: ["$stage", "OFFER"] }, 1, 0] },
            },
          },
        },
      ]),

      // Total users for apps-per-user calculation
      User.countDocuments({ role: { $ne: "admin" } }),

      // Apps per user — computed after totalApps resolves
      null,
    ]);

    // Compute derived metrics
    const offers = statusBreakdown.find((s) => s._id === "OFFER");
    const offerCount = offers ? offers.count : 0;
    const computedOfferRate =
      totalApps > 0
        ? ((offerCount / totalApps) * 100).toFixed(1) + "%"
        : "0%";

    // Get unique users who applied in range for "active users" metric
    const activeUsers = await JobApplication.aggregate([
      { $match: dateFilter },
      { $group: { _id: "$userId" } },
      { $count: "count" },
    ]);
    const activeUserCount =
      activeUsers.length > 0 ? activeUsers[0].count : 0;

    const computedAppsPerUser =
      activeUserCount > 0
        ? Math.round((totalApps / activeUserCount) * 10) / 10
        : 0;

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalApps,
          activeApps,
          offerCount,
          computedOfferRate,
          activeUserCount,
          totalUsers,
          appsPerUser: computedAppsPerUser,
        },
        statusBreakdown: statusBreakdown.map((s) => ({
          stage: s._id,
          count: s.count,
        })),
        volumeOverTime,
        topCompanies,
        topJobTitles: topJobTitles.map((t) => ({
          role: t.role,
          totalApps: t.totalApps,
          commonStage: t.commonStage,
        })),
      },
    });
  } catch (error) {
    console.error("Error in getApplicationAnalytics:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc    Export all applications as CSV-ready JSON
// @route   GET /api/admin/applications/export
// @access  Private/Admin
// @query   range = "7d" | "30d" | "90d" | "all"
exports.exportApplications = async (req, res) => {
  try {
    const range = req.query.range || "30d";
    const dateFilter = buildDateFilter(range);

    const applications = await JobApplication.find(dateFilter)
      .populate("userId", "firstName lastName email username")
      .sort({ createdAt: -1 })
      .lean();

    const csvRows = applications.map((app) => ({
      Company: app.company,
      Role: app.role,
      Stage: app.stage,
      Location: app.location || "",
      Employment: app.employment || "",
      Source: app.source || "",
      "Date Applied": app.dateApplied
        ? new Date(app.dateApplied).toISOString().split("T")[0]
        : "",
      "User Name": app.userId
        ? `${app.userId.firstName} ${app.userId.lastName}`
        : "Deleted User",
      "User Email": app.userId ? app.userId.email : "",
      Created: new Date(app.createdAt).toISOString().split("T")[0],
    }));

    res.status(200).json({
      success: true,
      data: csvRows,
      count: csvRows.length,
    });
  } catch (error) {
    console.error("Error in exportApplications:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildDateFilter(range) {
  const now = new Date();
  let startDate;

  switch (range) {
    case "7d":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case "30d":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30);
      break;
    case "90d":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 90);
      break;
    case "all":
    default:
      return {};
  }

  return { createdAt: { $gte: startDate } };
}

async function getVolumeOverTime(dateFilter, range) {
  let groupId;

  switch (range) {
    case "7d":
      groupId = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
      };
      break;
    case "30d":
    case "90d":
    case "all":
    default:
      groupId = {
        year: { $year: "$createdAt" },
        week: { $isoWeek: "$createdAt" },
      };
      break;
  }

  const raw = await JobApplication.aggregate([
    { $match: dateFilter },
    {
      $group: {
        _id: groupId,
        count: { $sum: 1 },
        date: { $min: "$createdAt" },
      },
    },
    { $sort: { date: 1 } },
  ]);

  return raw.map((r) => ({
    label: formatLabel(r, range),
    count: r.count,
  }));
}

function formatLabel(entry, range) {
  const d = new Date(entry.date);
  if (range === "7d") {
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }
  return `W${entry._id.week}`;
}
