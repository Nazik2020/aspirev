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
  const cleanLink = `aspirev.com/p/${customUrl}`;
  // #14 FIX: Use correct /p/[username] path format instead of query param
  const fullUrl = `${window.location.origin}/p/${customUrl}`;
  // #13 FIX: Removed redundant localPreviewUrl — it was identical to fullUrl

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
        const statsRes = await fetch(`${API_URL}/portfolio/share/stats`, {
          headers: getAuthHeaders(),
        });
        const statsJson = await statsRes.json();
        if (statsJson.success) {
          setStats(statsJson.stats);
        }

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
  // #17 FIX: Added getAuthHeaders to dependency array to avoid stale token
  }, [isOpen, getAuthHeaders]);

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
    const text = `Check out my professional portfolio on Aspirev: ${fullUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const shareX = () => {
    const text = `Excited to share my professional portfolio built on Aspirev! check it out:`;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareEmail = () => {
    const subject = `My Professional Portfolio`;
    const body = `Hi,\n\nI would love for you to check out my professional portfolio. You can view it here: ${fullUrl}\n\nBest regards,\n${portfolioData?.personalInfo?.fullName || user?.firstName || "Aspirev User"}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePreviewClick = () => {
    // #14 FIX: Use fullUrl which is now correctly formatted as /p/[username]
    window.open(fullUrl, "_blank");
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
              
              {/* LinkedIn — #16 FIX: Replace external CDN image with inline SVG */}
              <button 
                onClick={shareLinkedIn}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 border border-[#0a66c2]/30 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#0a66c2] opacity-90" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-white">LinkedIn</span>
              </button>
              
              {/* WhatsApp — #16 FIX: Replace external CDN image with inline SVG */}
              <button 
                onClick={shareWhatsApp}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#25D366] opacity-90" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-white">WhatsApp</span>
              </button>

              {/* X / Twitter */}
              {/* #15 FIX: 'close' icon was wrong (looked like a dismiss button). Using a proper X text mark */}
              <button 
                onClick={shareX}
                className="flex flex-col items-center justify-center gap-1.5 h-16 sm:h-20 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-white opacity-90" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
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
