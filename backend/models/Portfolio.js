const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    tagline: { type: String, default: '' },
    primaryDomain: { type: String, default: '' },
    location: { type: String, default: '' },
    showEmail: { type: Boolean, default: false },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    showResume: { type: Boolean, default: false },
    resumeUrl: { type: String, default: '' }
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  experience: [{
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    period: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  technologies: [{
    name: { type: String, default: '' },
    tools: [{
      name: { type: String, default: '' },
      logoUrl: { type: String, default: '' }
    }]
  }],
  projects: [{
    title: { type: String, default: '' },
    badge: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    projectUrl: { type: String, default: '' },
    tags: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  certifications: [{
    title: { type: String, default: '' },
    provider: { type: String, default: '' },
    date: { type: String, default: '' },
    skills: { type: String, default: '' },
    certificateUrl: { type: String, default: '' }
  }],
  volunteering: [{
    role: { type: String, default: '' },
    organization: { type: String, default: '' },
    iconName: { type: String, default: '' },
    orgLink: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  isPublished: { type: Boolean, default: false },
  customUrl: { type: String, unique: true, sparse: true }
}, {
  timestamps: true
});

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
