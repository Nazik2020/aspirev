const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const Portfolio = require("../../models/Portfolio");
const PortfolioAnalytics = require("../../models/share/PortfolioAnalytics");

// Helper to optionally get user ID from Authorization header
const getOptionalUserId = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
    } catch (e) {
      return null;
    }
  }
  return null;
};

// @desc    Record portfolio view
// @route   POST /api/portfolio/share/record-view/:customUrl
// @access  Public
const recordView = async (req, res) => {
  try {
    const { customUrl } = req.params;
    const portfolio = await Portfolio.findOne({ customUrl });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    // Optional Check: Do not record if the viewer is the owner of the portfolio
    const viewerId = getOptionalUserId(req);
    if (viewerId && viewerId.toString() === portfolio.user.toString()) {
      return res.status(200).json({ success: true, message: "View skipped (owner)" });
    }

    await PortfolioAnalytics.create({
      portfolio: portfolio._id,
      eventType: "view"
    });

    res.status(201).json({ success: true, message: "View recorded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Record portfolio link click
// @route   POST /api/portfolio/share/record-click/:customUrl
// @access  Public
const recordClick = async (req, res) => {
  try {
    const { customUrl } = req.params;
    const portfolio = await Portfolio.findOne({ customUrl });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    // Optional Check: Do not record if the viewer is the owner of the portfolio
    const viewerId = getOptionalUserId(req);
    if (viewerId && viewerId.toString() === portfolio.user.toString()) {
      return res.status(200).json({ success: true, message: "Click skipped (owner)" });
    }

    await PortfolioAnalytics.create({
      portfolio: portfolio._id,
      eventType: "click"
    });

    res.status(201).json({ success: true, message: "Click recorded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get portfolio sharing & analytics stats
// @route   GET /api/portfolio/share/stats
// @access  Private
const getShareStats = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    // Calculate stats
    const totalViews = await PortfolioAnalytics.countDocuments({
      portfolio: portfolio._id,
      eventType: "view"
    });

    const linkClicks = await PortfolioAnalytics.countDocuments({
      portfolio: portfolio._id,
      eventType: "click"
    });

    // Views this week (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const viewsThisWeek = await PortfolioAnalytics.countDocuments({
      portfolio: portfolio._id,
      eventType: "view",
      timestamp: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalViews,
        linkClicks,
        viewsThisWeek
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Generate and retrieve QR Code for the portfolio
// @route   GET /api/portfolio/share/qrcode
// @access  Private
const generateQRCode = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const publicUrl = `${frontendUrl}/p/${portfolio.customUrl}`;

    // Create the QR Code data URL (base64 PNG)
    const qrCodeUrl = await QRCode.toDataURL(publicUrl, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.status(200).json({
      success: true,
      qrCodeUrl,
      publicUrl
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  recordView,
  recordClick,
  getShareStats,
  generateQRCode
};
