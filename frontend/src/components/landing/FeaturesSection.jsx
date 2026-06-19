import React from 'react';
import abstractDataFlow from '../../assets/abstract_data_flow.png';

const FeaturesSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
            <div className="mb-16 md:mb-20 text-center md:text-left">
                <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4 tracking-tight">Engineered for your evolution</h2>
                <p className="text-on-surface-variant max-w-xl text-lg mx-auto md:mx-0">Everything you need to land your dream job.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Card: Resume Analysis */}
                <div className="md:col-span-4 group relative rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-outline-variant/30 transition-all flex flex-col min-h-[350px]">
                    <div className="absolute inset-0 z-0">
                        <img 
                            alt="Abstract Data Flow" 
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" 
                            src={abstractDataFlow}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 flex flex-col flex-1 mt-auto justify-end">
                        <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-primary text-2xl font-light" data-icon="description">description</span>
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-3">Resume Analysis</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                            Analyze your experience to see how it aligns with target job openings, highlighting hidden strengths and formatting recommendations.
                        </p>
                    </div>
                </div>

                {/* Middle Card: Career Path */}
                <div className="md:col-span-4 rounded-2xl glass-panel p-8 border border-outline-variant/10 hover:border-tertiary/30 transition-all flex flex-col justify-end min-h-[350px]">
                    <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-tertiary font-light text-2xl" data-icon="auto_awesome">auto_awesome</span>
                    </div>
                    <h3 className="font-headline text-xl font-bold mb-3">Career Path</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                        Personalized learning paths showing you exactly what skills to master next to reach your target professional career.
                    </p>
                </div>

                {/* Right Card: Skill Gap Detection */}
                <div className="md:col-span-4 rounded-2xl bg-gradient-to-br from-surface-container-low to-secondary-container/10 p-8 border border-outline-variant/10 hover:border-secondary-fixed-dim/30 transition-all flex flex-col justify-end min-h-[350px]">
                    <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-secondary-fixed-dim font-light text-2xl" data-icon="query_stats">query_stats</span>
                    </div>
                    <h3 className="font-headline text-xl font-bold mb-3">Skill Gap Detection</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                        Identify exactly what skills are missing between your current resume and your dream job description using real-time market data.
                    </p>
                </div>

                {/* Bottom Wide Banner: Elite Learning Hub */}
                <div className="md:col-span-12 bg-surface-container-high rounded-2xl p-10 mt-2 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 bg-gradient-to-bl from-primary to-transparent z-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="flex-1 relative z-10 w-full">
                        <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">Elite Learning Hub</h3>
                        <p className="text-on-surface-variant leading-relaxed mb-6 max-w-2xl">
                            Access free courses and resources selected specifically to teach you the skills you need. Bridge the gap between where you are today and where you want to be.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 font-medium text-slate-300">
                                    <span className="material-symbols-outlined text-secondary text-xl font-light" data-icon="check_circle">check_circle</span>
                                    Personalized AI Curriculum
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 font-medium text-slate-300">
                                    <span className="material-symbols-outlined text-secondary text-xl font-light" data-icon="check_circle">check_circle</span>
                                    Industry Benchmarking
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-auto flex justify-center md:justify-end relative z-10 mt-8 md:mt-0 pt-4 md:pt-0 pr-0 md:pr-10 lg:pr-20">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[8px] border-primary-container/20 border-t-primary animate-pulse flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-4xl md:text-5xl text-primary font-light" data-icon="school">school</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default FeaturesSection;
