import React from "react";

const PortfolioHero = ({ data, onLinkClick }) => {
  if (!data || !data.personalInfo) return null;
  const { fullName, tagline, bio, avatarUrl } = data.personalInfo;
  
  // Split name for stylistic rendering if possible
  const nameParts = fullName ? fullName.split(' ') : [''];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  return (
    <section id="home" className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 mt-12 mb-16 animate-fade-in-up min-h-[75vh]">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col items-start text-left z-10 w-full lg:max-w-xl">
        <p className="text-[0.75rem] font-bold tracking-[0.25em] text-gray-400 uppercase mb-6">
          {data.personalInfo.primaryDomain || "PORTFOLIO"}
        </p>
        <h1 className="text-[3.5rem] lg:text-[4.5rem] leading-[1.05] font-sans font-black tracking-tight text-gray-900 dark:text-white mb-0 transition-colors uppercase">
          {firstName}<br/>{lastName}{lastName && ','}
        </h1>
        <h1 className="text-[3rem] lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-violet-500 mb-8 drop-shadow-[0_0_15px_rgba(167,139,250,0.4)] whitespace-nowrap uppercase">
          {tagline}
        </h1>
        <p className="text-[0.95rem] leading-relaxed text-gray-600 dark:text-gray-400 mb-10 font-normal transition-colors whitespace-pre-wrap">
          {bio}
        </p>
        
        <div className="flex items-center gap-4">
          <a href="#projects" className="px-6 py-3 rounded bg-[#C7A2FF] hover:bg-[#b08df2] text-[#0d0e12] text-[0.8rem] font-bold shadow-lg transition-colors flex items-center gap-2 tracking-wider">
            VIEW PROJECTS &rarr;
          </a>
          <a href="#contact" className="px-6 py-3 rounded border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 bg-transparent dark:bg-[#16171b] text-gray-800 dark:text-white text-[0.8rem] font-bold shadow-sm transition-colors tracking-wider">
            CONTACT ME
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 relative flex justify-center items-center w-full max-w-[550px]">
        {/* Animated glowing background (Enhanced purple glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full animate-[pulse_4s_ease-in-out_infinite] z-0 pointer-events-none" style={{ backgroundColor: 'rgba(139, 92, 246, 0.45)', filter: 'blur(75px)' }}></div>

        {/* Geometric background lines & glowing orbiting dots */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-100">
          {/* Box 1 (Inner Rotating) with 2 Orbiting Dots */}
          <div className="w-[360px] h-[400px] lg:w-[470px] lg:h-[530px] border border-violet-400/25 rounded-[3rem] absolute transition-colors animate-[spin_30s_linear_infinite]">
            <div className="absolute top-[10%] left-[10%] w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_15px_#a78bfa]"></div>
            <div className="absolute bottom-[10%] right-[10%] w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_15px_#a78bfa]"></div>
          </div>
          
          {/* Box 2 (Middle Rotating) with 2 Orbiting Dots */}
          <div className="w-[380px] h-[420px] lg:w-[495px] lg:h-[555px] border border-violet-400/20 rounded-[3.5rem] absolute transition-colors animate-[spin_40s_linear_infinite_reverse]">
            <div className="absolute bottom-[15%] right-[15%] w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_15px_#a78bfa]"></div>
            <div className="absolute top-[15%] left-[15%] w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_15px_#a78bfa]"></div>
          </div>

          {/* Box 3 (Outer Static - Upright, NO dot - significantly bigger & concentric) */}
          <div className="w-[350px] h-[390px] lg:w-[460px] lg:h-[520px] border border-violet-400/35 rounded-[3rem] absolute transition-colors rotate-0">
          </div>
        </div>

        <div className="relative z-10 w-[300px] h-[340px] lg:w-[400px] lg:h-[460px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 dark:border-white/5">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={fullName} 
              className="w-full h-full object-cover object-top opacity-100 dark:opacity-90 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-800 text-gray-500 text-6xl font-black uppercase">
              {fullName ? fullName.slice(0, 1) : "?"}
            </div>
          )}
        </div>
        
        {/* Glassmorphic overlay card (Bar chart and Resume Badge) */}
        <div className="absolute -bottom-6 -right-4 lg:-bottom-10 lg:-right-8 z-20 flex flex-col items-end">
          {/* Bar Chart Card (Animated) */}
          <div className="hidden lg:flex w-[145px] h-[145px] lg:w-[190px] lg:h-[190px] items-end justify-center gap-4 lg:gap-5 p-4 lg:p-6 pb-8 lg:pb-10 transition-all relative z-10 rounded-[1.5rem] animate-[float_6s_ease-in-out_infinite]" style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.09)', backdropFilter: 'blur(24px)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
            <div className="w-5 lg:w-7 h-12 lg:h-[65px] bg-[#7a8099]/30 rounded-sm"></div>
            <div className="w-5 lg:w-7 h-28 lg:h-[135px] bg-[#9061f9]/70 rounded-sm shadow-[0_0_20px_rgba(144,97,249,0.25)]"></div>
            <div className="w-5 lg:w-7 h-20 lg:h-[95px] bg-[#ec4899]/20 rounded-sm"></div>
          </div>

          {/* Resume Badge (Static, shifted left to be fully visible and overlap the front left side) */}
          {data.personalInfo.showResume && data.personalInfo.resumeUrl && (
            <a href={data.personalInfo.resumeUrl} onClick={onLinkClick} target="_blank" rel="noreferrer" className="hidden lg:flex fixed bottom-10 right-10 lg:absolute lg:bottom-8 lg:-left-24 items-center gap-2 cursor-pointer group z-50 drop-shadow-2xl hover:scale-105 transition-all bg-[#0d0e12]/50 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-3 lg:p-0 rounded-full lg:rounded-none border border-white/10 lg:border-transparent">
              <svg className="w-9 h-9 lg:w-11 lg:h-11 text-violet-200 group-hover:text-violet-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              <span className="text-[0.75rem] lg:text-[0.8rem] font-bold tracking-[0.3em] text-[#e9d5ff] uppercase group-hover:text-[#d8b4fe] transition-colors drop-shadow-lg mb-0.5">Resume</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
