import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_URL } from '../config/api';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};

export const PortfolioProvider = ({ children }) => {
  const { getAuthHeaders, user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      fullName: '',
      tagline: '',
      primaryDomain: '',
      location: '',
      showEmail: false,
      bio: '',
      avatarUrl: '',
      showResume: false,
      resumeUrl: ''
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    },
    experience: [{ id: 1, role: '', company: '', period: '', description: '' }],
    technologies: [{ id: 1, name: '', tools: [{ id: 11, name: '', logoUrl: '' }] }],
    projects: [{ id: 1, title: '', badge: '', imageUrl: '', projectUrl: '', tags: '', description: '' }],
    certifications: [{ id: 1, title: '', provider: '', date: '', skills: '', certificateUrl: '' }],
    volunteering: [{ id: 1, role: '', organization: '', iconName: '', orgLink: '', description: '' }]
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_URL}/portfolio`, {
          headers: getAuthHeaders()
        });
        const json = await res.json();
        
        if (json && !json.message) {
          // It's a real portfolio object
          setPortfolioData({
            personalInfo: json.personalInfo || portfolioData.personalInfo,
            socialLinks: json.socialLinks || portfolioData.socialLinks,
            experience: json.experience && json.experience.length > 0 ? json.experience : portfolioData.experience,
            technologies: json.technologies && json.technologies.length > 0 ? json.technologies : portfolioData.technologies,
            projects: json.projects && json.projects.length > 0 ? json.projects : portfolioData.projects,
            certifications: json.certifications && json.certifications.length > 0 ? json.certifications : portfolioData.certifications,
            volunteering: json.volunteering && json.volunteering.length > 0 ? json.volunteering : portfolioData.volunteering,
          });
        }
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchPortfolio();
    }
  }, [user]);

  const updateSection = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data
    }));
  };

  const savePortfolio = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/portfolio`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...portfolioData,
          isPublished: true,
          customUrl: user?.username || 'user' // Use username as custom URL
        })
      });
      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Failed to save portfolio", error);
      return { success: false, message: "Save failed" };
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updateSection, savePortfolio, isSaving, isLoading }}>
      {children}
    </PortfolioContext.Provider>
  );
};
