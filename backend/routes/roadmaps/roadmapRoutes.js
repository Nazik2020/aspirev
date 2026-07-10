const express = require('express');
const router = express.Router();
const { getRoadmapProgress, updateRoadmapProgress } = require('../../controllers/roadmaps/roadmapController');
const { protect } = require('../../middleware/auth/authMiddleware');

router.get('/:roadmapId/progress', protect, getRoadmapProgress);
router.put('/:roadmapId/progress', protect, updateRoadmapProgress);

module.exports = router;
