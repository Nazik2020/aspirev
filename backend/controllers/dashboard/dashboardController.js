const JobApplication = require('../../models/JobApplication');
const RoadmapProgress = require('../../models/RoadmapProgress');

// @desc    Get dashboard overview data
// @route   GET /api/dashboard
// @access  Private
const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Fetch Job Metrics
    const totalJobs = await JobApplication.countDocuments({ userId });
    
    // In progress stages: actively waiting or interviewing
    const inProgressCount = await JobApplication.countDocuments({
      userId,
      stage: { $in: ["APPLIED", "ASSESSMENT", "INTERVIEW", "FINAL_INTERVIEW"] }
    });

    // Response rate denominator: jobs actually applied to (not wishlist)
    const appliedJobsCount = await JobApplication.countDocuments({
      userId,
      stage: { $ne: "WISHLIST" }
    });

    // Positive response: company moved you forward
    const positiveResponseCount = await JobApplication.countDocuments({
      userId,
      stage: { $in: ["ASSESSMENT", "INTERVIEW", "FINAL_INTERVIEW", "OFFER"] }
    });
    
    const responseRate = appliedJobsCount > 0 ? Math.round((positiveResponseCount / appliedJobsCount) * 100) : 0;

    // 2. Fetch Recent Applications
    const recentJobs = await JobApplication.find({ userId })
      .sort({ createdAt: -1 })
      .limit(4);

    const formattedRecentJobs = recentJobs.map(job => {
      // Map job status to UI colors
      let color = "text-slate-600 dark:text-white/60 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10";
      if (["INTERVIEW", "FINAL_INTERVIEW"].includes(job.stage)) {
        color = "text-cyan-500 dark:text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
      } else if (job.stage === "OFFER") {
        color = "text-violet-500 dark:text-violet-400 bg-violet-400/10 border-violet-400/20";
      } else if (job.stage === "REJECTED") {
        color = "text-rose-500 dark:text-rose-400 bg-rose-400/10 border-rose-400/20";
      } else if (job.stage === "ASSESSMENT") {
        color = "text-amber-500 dark:text-amber-400 bg-amber-400/10 border-amber-400/20";
      } else if (job.stage === "APPLIED") {
        color = "text-blue-500 dark:text-blue-400 bg-blue-400/10 border-blue-400/20";
      }

      return {
        company: job.company,
        role: job.role,
        status: job.stage,
        color
      };
    });

    // 3. Fetch Roadmap Progress
    const roadmapProgress = await RoadmapProgress.findOne({ userId }).sort({ lastUpdated: -1 });
    
    const progressPercentage = roadmapProgress ? roadmapProgress.progressPercentage : 0;
    const completedNodesCount = roadmapProgress ? roadmapProgress.completedNodes.length : 0;

    const formatRoadmapTitle = (id) => {
      if (!id) return "Frontend Developer";
      if (id.toLowerCase() === 'ai-engineer') return "AI Engineer";
      return id.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    };
    
    const roadmapTitle = formatRoadmapTitle(roadmapProgress?.roadmapId);

    // 4. Construct Dashboard Response matching UI expectations
    res.status(200).json({
      success: true,
      data: {
        metrics: [
          {
            title: "Applications Sent",
            value: totalJobs.toString(),
            subtext: "Tracked in JobTracker",
            type: "progress",
            progress: totalJobs > 0 ? Math.min(100, totalJobs * 5) : 0, 
            color: "from-violet-500 to-cyan-400",
          },
          {
            title: "In Progress",
            value: inProgressCount.toString(),
            subtext: "Active applications",
            type: "segments",
            activeCount: inProgressCount,
            totalCount: Math.max(5, inProgressCount),
          },
          {
            title: "Skills Learned",
            value: `${progressPercentage}%`,
            subtext: roadmapTitle,
            type: "radial",
            percentage: progressPercentage,
          },
          {
            title: "Response Rate",
            value: `${responseRate}%`,
            subtext: responseRate > 20 ? "+Good" : "Neutral",
            type: "bars",
            bars: [25, 45, 15, 60, responseRate > 0 ? responseRate : 35],
          },
        ],
        activeRoadmap: {
          roadmapId: roadmapProgress?.roadmapId || 'frontend',
          title: roadmapTitle,
          skillsValidated: `${completedNodesCount}/12`,
          completedNodesCount,
          completedNodes: roadmapProgress?.completedNodes || [],
          progressPercentage,
          stages: [
            {
              title: "Foundations",
              desc: "HTML5, CSS3, Semantic Web & Accessibility",
              status: completedNodesCount > 0 ? "completed" : "active",
              badge: completedNodesCount > 0 ? "COMPLETED" : "IN PROGRESS",
              progress: completedNodesCount > 0 ? 100 : 0
            },
            {
              title: "JS Mastery",
              desc: "ES6+, Asynchronous Patterns & API Integration",
              status: completedNodesCount > 3 ? "completed" : (completedNodesCount > 0 ? "active" : "locked"),
              badge: completedNodesCount > 3 ? "COMPLETED" : (completedNodesCount > 0 ? "IN PROGRESS" : "UP NEXT"),
              progress: completedNodesCount > 0 && completedNodesCount <= 3 ? 0 : (completedNodesCount > 3 ? 100 : 0),
            },
            {
              title: "React Ecosystem",
              desc: "Hooks, State Management & Modern Frameworks",
              status: completedNodesCount > 6 ? "completed" : (completedNodesCount > 3 ? "active" : "locked"),
              badge: completedNodesCount > 6 ? "COMPLETED" : (completedNodesCount > 3 ? "IN PROGRESS" : "UP NEXT"),
              progress: 0
            },
          ]
        },
        recentApplications: formattedRecentJobs.length > 0 ? formattedRecentJobs : [
          { company: "No Applications", role: "Add one in Job Tracker", status: "NEW", color: "text-slate-400 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10" }
        ]
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
  }
};

module.exports = {
  getDashboardOverview
};
