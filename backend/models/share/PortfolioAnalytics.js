const mongoose = require('mongoose');

const PortfolioAnalyticsSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true,
  },
  eventType: {
    type: String,
    enum: ['view', 'click'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.PortfolioAnalytics || mongoose.model('PortfolioAnalytics', PortfolioAnalyticsSchema);
