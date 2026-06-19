import React from 'react';

const HeroSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 text-center relative mt-16 overflow-hidden md:overflow-visible">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-outline-variant/15 mb-8">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-xs uppercase tracking-widest font-label font-bold text-on-surface-variant">Conquer Your Career</span>
            </div>
            
            <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-transparent max-w-4xl mx-auto leading-tight px-2 md:px-0">
                Your AI Career Intelligence Platform
            </h1>
            
            <p className="text-sm sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed px-4">
                Everything you need to land your dream job. Build roadmaps, analyze resumes, bridge skill gaps, and track applications in one unified workspace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4">
                <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 overflow-hidden">
                    <span className="relative z-10">Upload Resume</span>
                    <span className="material-symbols-outlined relative z-10" data-icon="upload">upload</span>
                </button>
                <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 glass-panel border border-outline-variant/20 rounded-xl font-bold text-on-surface hover:bg-surface-bright/40 transition-all flex items-center justify-center gap-2">
                    Get Started Free
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                </button>
            </div>

            {/* Hero Actual Interactive UI Mockup */}
            <div className="mt-16 md:mt-20 relative max-w-5xl mx-auto group w-full px-2 sm:px-4">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
                
                {/* Realistic Dashboard HTML Frame */}
                <div className="rounded-xl overflow-hidden shadow-[0_0_80px_rgba(104,51,234,0.2)] border border-outline-variant/20 bg-surface-container-lowest h-[400px] sm:h-[500px] flex flex-col relative w-full items-stretch scale-105 group-hover:scale-100 transition-all duration-700">
                    {/* Mock Header */}
                    <div className="h-12 border-b border-outline-variant/10 flex items-center px-6 gap-6 bg-surface-container/50">
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-error/70"></span>
                            <span className="w-3 h-3 rounded-full bg-[#fbbc04]/70"></span>
                            <span className="w-3 h-3 rounded-full bg-[#34a853]/70"></span>
                        </div>
                        <div className="h-3 w-40 bg-surface-container-highest rounded-full md:block hidden"></div>
                        <div className="h-3 w-16 bg-surface-container-highest rounded-full ml-auto hidden md:block"></div>
                    </div>

                    {/* Mock Content Base */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 w-full relative">
                        {/* Top Metrics Row */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full"></div>
                                <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Career Trajectory</div>
                                <div className="text-3xl font-headline font-black text-secondary">89<span className="text-sm text-on-surface-variant font-medium">/100</span></div>
                                <div className="text-xs text-[#34a853] font-bold mt-2">↑ +5.2% Growth</div>
                            </div>
                            
                            <div className="bg-surface-container-low p-5 rounded-xl border border-primary/30 bg-primary/5 text-left border-t-primary border-t-2 relative">
                                <div className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">AI Market Fit</div>
                                <div className="text-3xl font-headline font-black text-white">92%</div>
                                <div className="text-xs text-on-surface-variant font-medium mt-2">Based on live index matching</div>
                            </div>
                            
                            <div className="hidden md:block bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-bl-full"></div>
                                <div className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Target Opportunities</div>
                                <div className="text-3xl font-headline font-black text-white">14</div>
                                <div className="text-xs text-on-surface-variant font-medium mt-2">Active roles matching your gaps</div>
                            </div>
                        </div>

                        {/* Middle Split Row */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* Network Graph Visual block */}
                            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 flex flex-col text-left">
                                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Core Neural Pathway</div>
                                <div className="flex-1 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent flex items-center justify-center relative">
                                    <div className="w-24 h-24 rounded-full border border-primary/20 absolute"></div>
                                    <div className="w-40 h-40 rounded-full border border-primary/5 absolute"></div>
                                    <span className="material-symbols-outlined text-5xl text-primary animate-pulse relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                                    
                                    {/* Abstract Data Nodes */}
                                    <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_#bdf4ff] flex items-center justify-center">
                                        <div className="absolute w-16 h-16 border border-secondary/20 rounded-full animate-ping"></div>
                                    </div>
                                    <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#cdbdff]"></div>
                                    <div className="absolute bottom-1/4 right-[40%] w-2 h-2 bg-tertiary rounded-full shadow-[0_0_8px_#d4bbff]"></div>
                                    
                                    {/* Connecting lines mocked via svg */}
                                    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <line x1="50" y1="50" x2="75" y2="25" stroke="#bdf4ff" strokeWidth="0.5" />
                                        <line x1="50" y1="50" x2="25" y2="66" stroke="#cdbdff" strokeWidth="0.5" />
                                        <line x1="50" y1="50" x2="60" y2="75" stroke="#d4bbff" strokeWidth="0.5" />
                                        <line x1="75" y1="25" x2="60" y2="75" stroke="#cdbdff" strokeWidth="0.2" strokeDasharray="2,2" />
                                    </svg>
                                </div>
                            </div>

                            {/* Tech Stack bars */}
                            <div className="hidden md:flex bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 flex-col justify-center gap-5 text-left">
                                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">tune</span> 
                                    Skill Mastery Audit
                                </div>
                                
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs"><span className="text-white font-medium">Artificial Intelligence Data</span><span className="text-secondary font-bold">92%</span></div>
                                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-violet-600 to-secondary w-[92%]"></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs"><span className="text-white font-medium">Cloud Pipeline Architecture</span><span className="text-secondary font-bold">78%</span></div>
                                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-violet-600 to-secondary w-[78%]"></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs"><span className="text-white font-medium">Predictive Modeling</span><span className="text-primary font-bold">81%</span></div>
                                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-violet-600 to-primary w-[81%]"></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs"><span className="text-white font-medium">System Design</span><span className="text-tertiary-fixed-dim font-bold">45%</span></div>
                                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-violet-600 to-tertiary-fixed-dim w-[45%] bg-opacity-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Floating Glass Card */}
                <div className="absolute -bottom-10 -right-4 md:-right-10 hidden md:block glass-panel p-6 rounded-xl border border-outline-variant/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20 w-72 scale-[0.8] md:scale-100 origin-bottom-right">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Market Value</div>
                            <div className="text-xl font-bold text-secondary-fixed-dim">+$12.4k Increase</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-secondary-fixed-dim to-tertiary-fixed-dim w-3/4"></div>
                        </div>
                        <div className="text-[10px] text-on-surface-variant text-right">85% Skill Match Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
