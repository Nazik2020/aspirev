import React from "react";
import { usePortfolio } from "../../../context/PortfolioContext";

const LivePreview = () => {
  const { portfolioData } = usePortfolio();
  const { fullName, tagline, avatarUrl, bio, location } = portfolioData.personalInfo;

  const nameParts = fullName ? fullName.split(' ') : [''];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  return (
    <div className="bg-[#17181c] border border-white/5 rounded-[24px] p-6 sm:p-8 w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between border-b border-white/5 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">smartphone</span>
          <h3 className="text-[1.1rem] font-bold text-white">Live Preview</h3>
        </div>
        <button className="text-[0.7rem] font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">
          Full Preview
        </button>
      </div>

      {/* Phone Mockup Frame - Natural Size */}
      <div className="relative w-full max-w-[360px] h-[760px] rounded-[3rem] border-[12px] border-[#1e1f23] bg-[#0d0e12] shadow-2xl flex flex-col items-center overflow-hidden flex-shrink-0">
        
        {/* Background Decorative Grid matching Live Portfolio */}
        <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Dynamic Notch */}
        <div className="absolute top-0 w-[150px] h-[30px] bg-[#1e1f23] rounded-b-3xl z-40" />

        {/* Mockup Content - Fully Scrollable */}
        <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar pt-6 flex flex-col items-center animate-fade-in-up">
          
          {/* Mobile Navbar Simulation */}
          <div className="w-full flex items-center justify-between mb-8 px-6 py-4 z-30 bg-[#0d0e12]/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-1.5 font-sans text-[1.1rem]">
              <span className="font-bold text-violet-400">Invikt</span>
              <span className="text-gray-500 font-light">/</span>
              <span className="text-white font-semibold tracking-wide">{firstName ? firstName.toLowerCase() : "user"}</span>
            </div>
            <span className="material-symbols-outlined text-[24px] text-gray-400">menu</span>
          </div>

          {/* Mobile Hero Simulation (EXACT classes from PortfolioHero.jsx without lg: breakpoints) */}
          <div className="w-full flex flex-col items-start text-left relative z-10">
            
            {/* Image (Top on mobile due to flex-col-reverse in real page) */}
            <div className="w-full relative flex justify-center items-center mb-24 px-6 mt-8">
              {/* Geometric background lines & glowing orbiting dots */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-100">
                {/* Box 1 (Inner Rotating) with 2 Orbiting Dots */}
                <div className="w-[220px] h-[240px] border border-violet-400/25 rounded-[1.75rem] absolute animate-[spin_30s_linear_infinite]">
                  <div className="absolute top-[10%] left-[10%] w-1 h-1 rounded-full bg-violet-300 shadow-[0_0_8px_#a78bfa]"></div>
                  <div className="absolute bottom-[10%] right-[10%] w-1 h-1 rounded-full bg-violet-300 shadow-[0_0_8px_#a78bfa]"></div>
                </div>
                
                {/* Box 2 (Middle Rotating) with 2 Orbiting Dots */}
                <div className="w-[230px] h-[250px] border border-violet-400/20 rounded-[2rem] absolute animate-[spin_40s_linear_infinite_reverse]">
                  <div className="absolute bottom-[15%] right-[15%] w-1 h-1 rounded-full bg-violet-300 shadow-[0_0_8px_#a78bfa]"></div>
                  <div className="absolute top-[15%] left-[15%] w-1 h-1 rounded-full bg-violet-300 shadow-[0_0_8px_#a78bfa]"></div>
                </div>

                {/* Box 3 (Outer Static - Upright, NO dot - significantly bigger & concentric) */}
                <div className="w-[210px] h-[230px] border border-violet-400/35 rounded-[1.75rem] absolute">
                </div>
              </div>
              
              <div className="relative z-10 w-[170px] h-[195px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl shadow-xl overflow-hidden border border-white/10 dark:border-white/5">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={fullName} 
                    className="w-full h-full object-cover object-top opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-6xl font-black uppercase">
                    {fullName ? fullName.slice(0, 1) : "?"}
                  </div>
                )}
              </div>
              
              {/* Glassmorphic overlay card (Removed Resume badge for mobile view) */}
              <div className="absolute -bottom-6 right-2 z-20 flex flex-col items-end animate-[float_6s_ease-in-out_infinite]">
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col items-start text-left z-10 w-full px-6">
              <p className="text-[0.45rem] font-bold tracking-[0.25em] text-gray-400 uppercase mb-2">
                {portfolioData.personalInfo.primaryDomain || "PORTFOLIO"}
              </p>
              
              <h1 className="text-[3.5rem] leading-[1.05] font-sans font-black tracking-tight text-white mb-0 transition-colors uppercase">
                {firstName}<br/>{lastName}{lastName && ','}
              </h1>
              
              <h1 className="text-[3rem] leading-[1.1] font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-violet-500 mb-6 drop-shadow-[0_0_15px_rgba(167,139,250,0.4)] whitespace-nowrap uppercase">
                {tagline || "DATA SCIENTIST"}
              </h1>
              
              {location && (
                <div className="flex items-center gap-2 text-[0.85rem] text-gray-400 mb-6">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>{location}</span>
                </div>
              )}
              
              <p className="text-[0.95rem] leading-relaxed text-gray-400 mb-10 font-normal transition-colors whitespace-pre-wrap">
                {bio}
              </p>
              
              <div className="flex items-center gap-4 mb-16">
                <div className="px-6 py-3 rounded bg-[#C7A2FF] text-[#0d0e12] text-[0.8rem] font-bold shadow-lg flex items-center tracking-wider">
                  VIEW PROJECTS &rarr;
                </div>
                <div className="px-6 py-3 rounded border border-white/30 bg-transparent text-white text-[0.8rem] font-bold shadow-sm tracking-wider">
                  CONTACT ME
                </div>
              </div>
            </div>
            
          </div>

          {/* Dynamic Sections Container */}
          <div className="w-full flex flex-col gap-12 mt-4 px-6 pb-20">
            
            {/* Experience Section */}
            {portfolioData.experience.some(exp => exp.role) && (
              <div className="flex flex-col gap-6 w-full mt-4">
                <div className="flex flex-col items-start mb-2">
                  <span className="text-[0.7rem] font-bold tracking-[0.2em] text-gray-400 uppercase">My Career &</span>
                  <span className="text-[1.2rem] font-bold text-violet-400 tracking-wide uppercase">Experience</span>
                </div>
                
                <div className="relative border-l border-white/10 ml-2 flex flex-col gap-10">
                  {portfolioData.experience.map((exp, idx) => (
                    exp.role && (
                      <div key={idx} className="relative pl-6">
                        {/* Glowing Timeline dot */}
                        <div className={`absolute w-3.5 h-3.5 rounded-full -left-[7.5px] top-1 ${
                          idx === 0 
                            ? "bg-[#d8b4fe] shadow-[0_0_12px_rgba(216,180,254,0.8)]" 
                            : "bg-[#fb7185] shadow-[0_0_12px_rgba(251,113,133,0.8)]"
                        }`} />
                        
                        <p className={`text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5 ${
                          idx === 0 ? "text-violet-300" : "text-[#fb7185]"
                        }`}>
                          {exp.period}
                        </p>
                        <h3 className="text-[1.1rem] font-bold text-white mb-0.5 tracking-wide">
                          {exp.role}
                        </h3>
                        <p className="text-[0.8rem] text-gray-400 mb-3 font-medium">
                          {exp.company}
                        </p>
                        {exp.description && (
                          <p className="text-[0.85rem] leading-relaxed text-gray-400 font-light whitespace-pre-wrap">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Section */}
            {portfolioData.technologies.some(cat => cat.name || cat.tools.some(t => t.name)) && (
              <div className="flex flex-col gap-6 w-full mt-6">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-[1.1rem] font-bold tracking-[0.2em] text-white uppercase text-center">Technologies</span>
                </div>
                
                <div className="relative w-full overflow-hidden flex flex-col gap-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                  {(() => {
                    const techLogos = [];
                    portfolioData.technologies.forEach(cat => {
                      cat.tools.forEach(tool => {
                        if (tool.logoUrl) techLogos.push(tool.logoUrl);
                      });
                    });
                    
                    if (techLogos.length === 0) return (
                      <div className="w-full text-center text-[0.7rem] text-gray-500 font-bold tracking-widest uppercase">Add Logo URLs to see marquee</div>
                    );

                    return (
                      <>
                        <div className="flex items-center gap-3 animate-[scroll_15s_linear_infinite] whitespace-nowrap">
                          {[...techLogos, ...techLogos, ...techLogos].map((icon, idx) => (
                            <div key={`row1-${idx}`} className="w-14 h-14 shrink-0 rounded-[1rem] border border-white/5 bg-[#121318] flex items-center justify-center p-3 shadow-lg">
                              <img src={icon} alt="" className="w-full h-full object-contain" />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 animate-[scroll_20s_linear_infinite_reverse] whitespace-nowrap ml-[-40px]">
                          {[...[...techLogos].reverse(), ...[...techLogos].reverse(), ...[...techLogos].reverse()].map((icon, idx) => (
                            <div key={`row2-${idx}`} className="w-14 h-14 shrink-0 rounded-[1rem] border border-white/5 bg-[#121318] flex items-center justify-center p-3 shadow-lg relative">
                              {idx === 4 && <div className="absolute inset-0 bg-violet-500/10 rounded-2xl blur-md" />}
                              <img src={icon} alt="" className="w-full h-full object-contain relative z-10" />
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {portfolioData.projects.some(proj => proj.title) && (
              <div className="flex flex-col gap-4 w-full">
                <span className="text-[0.85rem] font-black text-gray-400 uppercase tracking-widest text-left">Projects</span>
                <div className="flex flex-col gap-4">
                  {portfolioData.projects.map((proj, idx) => (
                    proj.title && (
                      <div key={idx} className="w-full bg-[#101217]/80 border border-violet-500/20 rounded-2xl overflow-hidden flex flex-col text-left shadow-sm">
                        {proj.imageUrl ? (
                          <div className="w-full h-32 bg-white/10 relative border-b border-violet-500/20">
                            <img src={proj.imageUrl} className="w-full h-full object-cover" alt="" />
                            {proj.badge && <span className="absolute top-3 right-3 px-2 py-1 bg-[#16171b]/90 backdrop-blur-md text-gray-300 text-[0.6rem] font-black uppercase tracking-wider rounded-full border border-violet-500/30">{proj.badge}</span>}
                          </div>
                        ) : (
                          <div className="w-full h-24 bg-white/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px] text-white/20">image</span>
                          </div>
                        )}
                        <div className="p-4 flex flex-col flex-1">
                          <span className="text-[1rem] font-bold text-white mb-1 leading-tight">{proj.title}</span>
                          {proj.description && (
                            <p className="text-[0.8rem] text-gray-400 leading-relaxed font-light mb-3 whitespace-pre-wrap">
                              {proj.description}
                            </p>
                          )}
                          {proj.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                              {proj.tags.split(',').map((tag, tIdx) => tag.trim() && (
                                <span key={tIdx} className="px-2 py-0.5 rounded-full border border-violet-500/20 bg-[#1a1b23] text-gray-400 text-[0.65rem] font-medium whitespace-nowrap">
                                  {tag.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Section */}
            {portfolioData.certifications.some(cert => cert.title) && (
              <div className="flex flex-col gap-4 w-full">
                <span className="text-[0.85rem] font-black text-gray-400 uppercase tracking-widest text-left">Certifications</span>
                <div className="flex flex-col gap-4">
                  {portfolioData.certifications.map((cert, idx) => (
                    cert.title && (
                      <div key={idx} className="w-full bg-[#121318]/50 border border-violet-500/20 rounded-2xl p-5 flex flex-col text-left shadow-sm">
                        <div className="flex justify-between items-start gap-3 mb-1.5">
                          <h3 className="text-[0.9rem] font-bold text-white leading-snug uppercase">{cert.title}</h3>
                          {cert.certificateUrl && (
                            <span className="material-symbols-outlined text-gray-500 text-[16px] shrink-0">arrow_outward</span>
                          )}
                        </div>
                        <p className="text-[0.7rem] text-gray-400 mb-4">
                          {cert.provider} {cert.date && `• ${cert.date}`}
                        </p>
                        {cert.skills && (
                          <p className="text-[0.75rem] text-gray-400 leading-relaxed">
                            <span className="font-bold text-gray-300">Skills gained:</span> {cert.skills}
                          </p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Volunteering Section */}
            {portfolioData.volunteering.some(item => item.role) && (
              <div className="flex flex-col gap-4 w-full mt-4">
                <span className="text-[0.85rem] font-black text-gray-400 uppercase tracking-widest text-left">Volunteering</span>
                <div className="flex flex-col gap-4">
                  {portfolioData.volunteering.map((item, idx) => (
                    item.role && (
                      <div key={idx} className="w-full bg-[#121318]/50 border border-violet-500/30 rounded-lg p-5 flex flex-col text-left group">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                          <span className="material-symbols-outlined text-violet-300 text-[18px]">{item.iconName || 'star'}</span>
                        </div>
                        <h3 className="text-[1rem] font-bold text-white uppercase mb-2 leading-tight">
                          {item.role}
                        </h3>
                        {item.description && (
                          <p className="text-[0.8rem] text-gray-400 leading-relaxed mb-4 whitespace-pre-wrap">
                            {item.description}
                          </p>
                        )}
                        <p className="text-[0.7rem] font-bold text-violet-300 uppercase tracking-widest mt-auto">
                          {item.organization}
                        </p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
            
          </div>
          
          {/* Spacer to guarantee scroll capability past the bottom notch/edge */}
          <div className="w-full h-32 shrink-0"></div>
          
        </div>
      </div>
      
      {/* Scrollbar styling for mockup content */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .no-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .no-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default LivePreview;
