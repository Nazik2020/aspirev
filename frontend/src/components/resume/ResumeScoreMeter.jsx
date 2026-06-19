import React from 'react';

const ResumeScoreMeter = () => {
    return (
        <section className="col-span-12 lg:col-span-4">
            <div className="bg-surface-container-highest rounded-xl p-8 h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent -rotate-45 translate-x-[-100%] animate-pulse"></div>
                
                <div className="relative w-48 h-48 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle className="text-surface-container-low" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                        <circle className="text-primary transition-all duration-1000" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="82.93" strokeLinecap="round" strokeWidth="12"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-headline text-6xl font-black text-on-surface">85</span>
                        <span className="font-label text-xs uppercase tracking-tighter text-on-surface-variant mt-1">Resume Score</span>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="font-body text-on-surface-variant text-sm mb-4">You're in the top 15% of candidates for similar roles.</p>
                    <div className="flex justify-center gap-1 items-end h-8">
                        <div className="w-1 h-4 bg-primary rounded-full"></div>
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        <div className="w-1 h-3 bg-primary rounded-full"></div>
                        <div className="w-1 h-5 bg-secondary-fixed-dim rounded-full"></div>
                        <div className="w-1 h-8 bg-secondary-fixed-dim rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeScoreMeter;
