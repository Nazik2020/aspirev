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
          // #3 FIX: Use functional update to avoid stale closure — don't reference portfolioData directly
          setPortfolioData(prev => ({
            personalInfo: json.personalInfo || prev.personalInfo,
            socialLinks: json.socialLinks || prev.socialLinks,
            experience: json.experience && json.experience.length > 0 ? json.experience : prev.experience,
            technologies: json.technologies && json.technologies.length > 0 ? json.technologies : prev.technologies,
            projects: json.projects && json.projects.length > 0 ? json.projects : prev.projects,
            certifications: json.certifications && json.certifications.length > 0 ? json.certifications : prev.certifications,
            volunteering: json.volunteering && json.volunteering.length > 0 ? json.volunteering : prev.volunteering,
          }));
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
  // #4 FIX: Added getAuthHeaders to dep array to avoid stale token
  }, [user, getAuthHeaders]);

  const updateSection = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: typeof data === 'function' ? data(prev[section]) : data
    }));
  };

  // #5 FIX: Accept publish flag so callers can save as draft (isPublished=false) or publish (isPublished=true)
  const savePortfolio = async (publish = true) => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/portfolio`, {
        method: 'PUT',
        // #1 FIX: Added Content-Type header so backend can parse JSON body
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...portfolioData,
          isPublished: publish,
          customUrl: user?.username || 'user'
        })
      });
      const json = await res.json();
      // #2 FIX: Return structured result so callers can show success/error feedback
      return { success: !!json.success, message: json.message || '' };
    } catch (error) {
      console.error("Failed to save portfolio", error);
      return { success: false, message: 'Network error — please try again' };
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
