import React from 'react';

const SkillGapHeader = () => {
    return (
        <header className="mb-12 relative">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10"></div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary/20 mb-4">
                        <span className="material-symbols-outlined text-secondary text-sm">psychology</span>
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest">AI Analysis Engine</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-[1.1]">
                        Mohamed vs. <span className="text-gradient">ML Engineer</span>
                    </h1>
                    <p className="mt-4 text-on-surface-variant text-lg max-w-2xl leading-relaxed font-body">
                        Precision audit of your technical architecture. We've identified critical voids in your neural engineering stack that separate you from the Elite 1%.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card p-6 rounded-xl border border-outline-variant/15 text-center">
                        <div className="text-3xl font-headline font-black text-secondary">72%</div>
                        <div className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mt-1">Match Core</div>
                    </div>
                    <div className="glass-card p-6 rounded-xl border border-outline-variant/15 text-center">
                        <div className="text-3xl font-headline font-black text-primary">02</div>
                        <div className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mt-1">Critical Gaps</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SkillGapHeader;
