const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth/authMiddleware');
const {
  recordView,
  recordClick,
  getShareStats,
  generateQRCode
} = require('../../controllers/share/portfolioShareController');

// Public endpoints to record analytics
router.post('/record-view/:customUrl', recordView);
router.post('/record-click/:customUrl', recordClick);

// Private endpoints for owners
router.get('/stats', protect, getShareStats);
router.get('/qrcode', protect, generateQRCode);

module.exports = router;
