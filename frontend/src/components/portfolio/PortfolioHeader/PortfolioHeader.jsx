import React, { useState } from "react";
import SharePortfolioModal from "../SharePortfolioModal/SharePortfolioModal";
import { usePortfolio } from "../../../context/PortfolioContext";
import { useAuth } from "../../../context/AuthContext";

const PortfolioHeader = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { savePortfolio, isSaving, portfolioData } = usePortfolio();
  const { user } = useAuth();
  
  const customUrl = user?.username || 'user';
  const portfolioLink = `invikt.com/p/${customUrl}`;

  const handleSave = async () => {
    await savePortfolio();
  };

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}/p/${customUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-[24px] border border-slate-200 dark:border-white/5 bg-[#17181c] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4 w-full">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-white text-[20px]">link</span>
        </div>
        
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white truncate">{portfolioLink}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[0.65rem] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-sm text-white/40 font-medium">Your portfolio is visible to the world</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-5 py-2.5 rounded-full border border-violet-500/50 text-violet-400 text-[0.8rem] font-bold tracking-wide transition-all flex items-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-500/10'}`}
        >
          <span className="material-symbols-outlined text-[16px]">{isSaving ? 'sync' : 'save'}</span>
          {isSaving ? 'Saving...' : 'Save & Publish'}
        </button>
        <button 
          onClick={handleCopy}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all" 
          title={copied ? "Copied!" : "Copy Link"}
        >
          <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
        </button>
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all" 
          title="Share"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
        </button>
        <a 
          href={`/p/${customUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 border border-violet-500 text-white text-[0.8rem] font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)]"
        >
          View Live
        </a>
      </div>

      <SharePortfolioModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        portfolioData={portfolioData}
      />
    </div>
  );
};

export default PortfolioHeader;
