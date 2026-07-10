const RoadmapProgress = require('../../models/RoadmapProgress');

// @desc    Get roadmap progress
// @route   GET /api/roadmaps/:roadmapId/progress
// @access  Private
const getRoadmapProgress = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user._id;

    let progress = await RoadmapProgress.findOne({ userId, roadmapId });

    if (!progress) {
      // Create default progress
      progress = await RoadmapProgress.create({
        userId,
        roadmapId,
        completedNodes: [],
        progressPercentage: 0
      });
    }

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error("Error fetching roadmap progress:", error);
    res.status(500).json({ success: false, message: "Failed to fetch roadmap progress" });
  }
};

// @desc    Update roadmap progress
// @route   PUT /api/roadmaps/:roadmapId/progress
// @access  Private
const updateRoadmapProgress = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const { completedNodes, progressPercentage } = req.body;
    const userId = req.user._id;

    const progress = await RoadmapProgress.findOneAndUpdate(
      { userId, roadmapId },
      { 
        completedNodes,
        progressPercentage,
        lastUpdated: Date.now()
      },
      { new: true, upsert: true } // Upsert ensures it's created if not found
    );

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error("Error updating roadmap progress:", error);
    res.status(500).json({ success: false, message: "Failed to update roadmap progress" });
  }
};

module.exports = {
  getRoadmapProgress,
  updateRoadmapProgress
};
