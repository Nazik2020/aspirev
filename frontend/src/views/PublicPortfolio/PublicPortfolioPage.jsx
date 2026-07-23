import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "../../config/api";
import PortfolioNavbar from "../../components/public-portfolio/PortfolioNavbar/PortfolioNavbar";
import PortfolioHero from "../../components/public-portfolio/PortfolioHero/PortfolioHero";
import PortfolioExperience from "../../components/public-portfolio/PortfolioExperience/PortfolioExperience";
import PortfolioProjects from "../../components/public-portfolio/PortfolioProjects/PortfolioProjects";
import PortfolioSkills from "../../components/public-portfolio/PortfolioSkills/PortfolioSkills";
import PortfolioCertifications from "../../components/public-portfolio/PortfolioCertifications/PortfolioCertifications";
import PortfolioVolunteering from "../../components/public-portfolio/PortfolioVolunteering/PortfolioVolunteering";
import PortfolioFooter from "../../components/public-portfolio/PortfolioFooter/PortfolioFooter";

const PublicPortfolioPage = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_URL}/portfolio/public/${username}`);
        const data = await res.json();
        
        if (res.ok && !data.message) {
          setPortfolioData(data);
        } else {
          setError(data.message || "Portfolio not found");
        }
      } catch (err) {
        setError("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  // Hook 2: Record view. Must be top-level before early returns!
  useEffect(() => {
    const recordView = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        await fetch(`${API_URL}/portfolio/share/record-view/${username}`, {
          method: "POST",
          headers
        });
      } catch (err) {
        console.error("Failed to record view", err);
      }
    };
    if (portfolioData) {
      recordView();
    }
  }, [username, portfolioData]);

  const recordClick = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      await fetch(`${API_URL}/portfolio/share/record-click/${username}`, {
        method: "POST",
        headers
      });
    } catch (err) {
      console.error("Failed to record click", err);
    }
  };

  const handleSocialClick = () => {
    recordClick();
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center text-white font-bold">Loading Portfolio...</div>;
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex flex-col items-center justify-center text-white">
        <span className="material-symbols-outlined text-[48px] text-white/20 mb-4">sentiment_dissatisfied</span>
        <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
        <p className="text-white/40 mt-2">The requested portfolio does not exist or has not been published.</p>
      </div>
    );
  }

  const { socialLinks, personalInfo } = portfolioData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0e12] text-gray-900 dark:text-white font-sans selection:bg-violet-500/30 selection:text-violet-900 dark:selection:text-violet-200 relative overflow-x-hidden transition-colors duration-300 pt-20">
      
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] transition-colors" />
      </div>

      <PortfolioNavbar data={personalInfo} />

      {/* Left Social Sidebar */}
      {(socialLinks?.github || socialLinks?.linkedin || socialLinks?.twitter || socialLinks?.website) && (
        <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-50">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" onClick={handleSocialClick} className="text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" onClick={handleSocialClick} className="text-gray-500 hover:text-violet-400 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer" onClick={handleSocialClick} className="text-gray-500 hover:text-violet-400 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          )}
          {socialLinks.website && (
            <a href={socialLinks.website} target="_blank" rel="noreferrer" onClick={handleSocialClick} className="text-gray-500 hover:text-violet-400 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
          )}
          <div className="w-[1px] h-16 bg-gray-300 dark:bg-gray-700/50 mt-2 transition-colors"></div>
        </div>
      )}


      <main className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col gap-24 relative z-10 xl:pl-32">
        <PortfolioHero data={portfolioData} onLinkClick={handleSocialClick} />
        <PortfolioExperience data={portfolioData.experience} />
        <PortfolioProjects data={portfolioData.projects} />
        <PortfolioCertifications data={portfolioData.certifications} />
        <PortfolioSkills data={portfolioData.technologies} />
        <PortfolioVolunteering data={portfolioData.volunteering} />
        <PortfolioFooter data={personalInfo} social={socialLinks} onLinkClick={handleSocialClick} />
      </main>
    </div>
  );
};

export default PublicPortfolioPage;
