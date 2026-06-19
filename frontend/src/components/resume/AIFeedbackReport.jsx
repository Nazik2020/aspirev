import React from 'react';

const AIFeedbackReport = () => {
    return (
        <section className="col-span-12 lg:col-span-5">
            <div className="bg-surface-container-high rounded-xl p-8 relative overflow-hidden h-full">
                {/* AI Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-container/30 blur-[60px] rounded-full"></div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    </div>
                    <h2 className="font-headline text-xl font-bold">AI Intelligence Report</h2>
                </div>
                
                <div className="space-y-6 relative z-10">
                    <div className="relative pl-6 border-l border-secondary-fixed-dim/30">
                        <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-secondary-fixed-dim shadow-[0_0_8px_rgba(0,218,243,0.8)]"></div>
                        <span className="font-label text-[10px] uppercase text-secondary-fixed-dim block mb-1 tracking-widest">Core Strengths</span>
                        <p className="text-sm font-body text-on-surface leading-relaxed">
                            Exceptional proficiency in <span className="text-white font-bold">Coding</span> architecture and systematic <span className="text-white font-bold">Data Handling</span>.
                        </p>
                    </div>
                    
                    <div className="relative pl-6 border-l border-error/30">
                        <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-error shadow-[0_0_8px_rgba(255,180,171,0.8)]"></div>
                        <span className="font-label text-[10px] uppercase text-error block mb-1 tracking-widest">Growth Gaps</span>
                        <p className="text-sm font-body text-on-surface leading-relaxed">
                            Limited exposure to <span className="text-white font-bold">Deep Learning</span> neural network deployments.
                        </p>
                    </div>
                    
                    <div className="relative pl-6 border-l border-primary/30">
                        <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(205,189,255,0.8)]"></div>
                        <span className="font-label text-[10px] uppercase text-primary block mb-1 tracking-widest">Strategic Suggestion</span>
                        <p className="text-sm font-body text-on-surface leading-relaxed">
                            Prioritize learning <span className="text-white font-bold">TensorFlow</span> to bridge the gap into advanced AI research roles.
                        </p>
                    </div>
                </div>
                
                <button className="mt-8 w-full py-4 glass-panel rounded-lg border border-outline-variant/20 font-headline font-bold text-sm hover:bg-white/10 transition-colors relative z-10">
                    Generate Full Roadmap
                </button>
            </div>
        </section>
    );
};

export default AIFeedbackReport;
