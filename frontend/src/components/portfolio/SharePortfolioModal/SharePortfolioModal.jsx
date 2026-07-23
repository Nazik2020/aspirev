import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { API_URL } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const SharePortfolioModal = ({ isOpen, onClose, portfolioData }) => {
  const { getAuthHeaders, user } = useAuth();
  const [stats, setStats] = useState({ totalViews: 0, linkClicks: 0, viewsThisWeek: 0 });
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const customUrl = user?.username || "user";
  const cleanLink = `invikt.com/p?username=${customUrl}`;
  const fullUrl = `${window.location.origin}/p?username=${customUrl}`;
  const localPreviewUrl = `${window.location.origin}/p?username=${customUrl}`;

  // Helper to convert base64 data to Blob
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  // Fetch stats and QR Code when the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const fetchShareData = async () => {
      setLoading(true);
      try {
        // Fetch Analytics Stats
        const statsRes = await fetch(`${API_URL}/portfolio/share/stats`, {
          headers: getAuthHeaders(),
        });
        const statsJson = await statsRes.json();
        if (statsJson.success) {
          setStats(statsJson.stats);
        }

        // Fetch QR Code
        const qrRes = await fetch(`${API_URL}/portfolio/share/qrcode`, {
          headers: getAuthHeaders(),
        });
        const qrJson = await qrRes.json();
        if (qrJson.success) {
          setQrCodeUrl(qrJson.qrCodeUrl);
        }
      } catch (error) {
        console.error("Error fetching share data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShareData();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    try {
      const blob = base64ToBlob(qrCodeUrl, "image/png");
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      
      // Sanitise filename to avoid spaces and special characters
      const name = (portfolioData?.personalInfo?.fullName || user?.firstName || "portfolio")
        .trim()
        .replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `${name}_qrcode.png`;
      
      document.body.appendChild(link);
      link.click();
      
      // Delay removal and revocation to let the browser process the download with filename
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 200);
    } catch (e) {
      console.error("Failed to download QR code using Blob, falling back to direct download:", e);
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "portfolio_qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Social Share Handlers
  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(url, "_blank", "width=600,height=600");
  };

  const shareWhatsApp = () => {
    const text = `Check out my professional portfolio on Invikt: ${fullUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const shareX = () => {
    const text = `Excited to share my professional portfolio built on Invikt! check it out:`;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareEmail = () => {
    const subject = `My Professional Portfolio`;
    const body = `Hi,\n\nI would love for you to check out my professional portfolio. You can view it here: ${fullUrl}\n\nBest regards,\n${portfolioData?.personalInfo?.fullName || user?.firstName || "Invikt User"}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePreviewClick = () => {
    window.open(localPreviewUrl, "_blank");
  };

  const personalInfo = portfolioData?.personalInfo;
  const initialLetter = (personalInfo?.fullName || user?.firstName || "N")[0].toUpperCase();

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0f1115]/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[800px] max-h-[100%] overflow-y-auto bg-[#16181d] border border-white/10 rounded-[1.5rem] p-5 sm:p-8 shadow-2xl animate-fade-in-up text-white">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-5 sm:mb-6">
          <div>
            <h2 className="text-[1.1rem] font-sans font-bold text-white mb-0.5">Share Your Portfolio</h2>
            <p className="text-[0.85rem] text-gray-400">Let the world see what you can do.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6 border-b border-white/5 pb-6">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-5">
            
            {/* Profile Preview Card */}
            <div 
              onClick={handlePreviewClick}
              className="bg-[#111216] border border-white/5 rounded-xl p-3 flex items-center gap-3 relative group cursor-pointer hover:border-white/10 transition-colors"
            >
              {personalInfo?.avatarUrl ? (
                <img 
                  src={personalInfo.avatarUrl} 
                  alt={personalInfo?.fullName || "Avatar"} 
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {initialLetter}
                </div>
              )}
              
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-white font-bold text-[0.9rem] truncate">
                    {personalInfo?.fullName || user?.firstName || "User"}
                  </h3>
                  <span className="px-1.5 py-[1px] rounded text-[0.55rem] font-black tracking-wider uppercase bg-emerald-500/10 text-emerald-400 flex items-center gap-1 shrink-0">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <p className="text-[0.75rem] text-gray-400 truncate">
                  {personalInfo?.tagline || "Frontend Developer | CS Student"}
                </p>
                <p className="text-[0.65rem] text-gray-500 font-mono mt-0.5 truncate">
                  {cleanLink}
                </p>
              </div>
              <div className="text-gray-500 group-hover:text-white transition-colors pr-1">
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </div>
            </div>

            {/* Link Copy */}
            <div>
              <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-2">Your Portfolio Link</h4>
              <div className="flex items-center bg-[#111216] border border-white/5 rounded-full p-1 pl-3 relative">
                <span className="text-[0.75rem] text-gray-300 font-mono truncate flex-1 pr-2">
                  {cleanLink}
                </span>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-[0.75rem] font-bold transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>



          </div>

          {/* Right Column */}
          <div className="flex-1 mt-2 md:mt-0">
            <h4 className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-3">Share on Platforms</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              
              {/* LinkedIn */}
              <button 
                onClick={shareLinkedIn}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 border border-[#0a66c2]/30 rounded-xl transition-colors"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5 sm:w-6 sm:h-6 opacity-90" />
                <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-white">LinkedIn</span>
              </button>
              
              {/* WhatsApp */}
              <button 
                onClick={shareWhatsApp}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl transition-colors"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-5 h-5 sm:w-6 sm:h-6 opacity-90" />
                <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-white">WhatsApp</span>
              </button>

              {/* X / Twitter */}
              <button 
                onClick={shareX}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">close</span>
                <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-white">Share on X</span>
              </button>

              {/* Email */}
              <button 
                onClick={shareEmail}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-white text-[20px] sm:text-[24px]">mail</span>
                <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-white">Send via Email</span>
              </button>

            </div>
          </div>
          
        </div>

        {/* Bottom Section: QR Code */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-2">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-5">
            <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] bg-white rounded-2xl p-2 sm:p-2.5 shrink-0 shadow-sm flex items-center justify-center">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded text-gray-500">
                  <span className="material-symbols-outlined animate-spin text-[24px]">sync</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h4 className="text-[0.9rem] font-bold text-white mb-0.5">QR Code</h4>
              <p className="text-[0.75rem] text-gray-400 mb-2 max-w-[240px] leading-snug">
                Print this on your resume or business card for quick access.
              </p>
              <button 
                onClick={handleDownloadQR}
                disabled={!qrCodeUrl}
                className={`flex items-center gap-1.5 px-4 py-1.5 sm:px-3 sm:py-1 rounded-full border border-white/20 hover:bg-white/5 text-white text-[0.75rem] sm:text-[0.7rem] font-bold transition-colors ${!qrCodeUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[14px]">download</span>
                Download QR
              </button>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full md:w-auto px-8 py-3 sm:px-6 sm:py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-[0.95rem] sm:text-[0.9rem] font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all transform hover:scale-105 mt-2 md:mt-0"
          >
            Done
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default SharePortfolioModal;
