import React from 'react';

const CriticalVoids = () => {
    return (
        <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="glass-card p-8 rounded-xl border border-error/30 bg-error-container/5 flex-1">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3 mb-6 text-error">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    Critical Voids
                </h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-highest/50">
                        <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-error text-lg">schema</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-on-surface">TensorFlow</h4>
                            <p className="text-sm text-on-surface-variant mt-1 font-body">High industry demand for deployment pipelines.</p>
                            <span className="inline-block mt-2 text-[10px] uppercase font-bold text-error tracking-tighter font-label">Missing in Resume</span>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-highest/50">
                        <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-error text-lg">neurology</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-on-surface">Deep Learning</h4>
                            <p className="text-sm text-on-surface-variant mt-1 font-body">Foundational requirement for this specific role level.</p>
                            <span className="inline-block mt-2 text-[10px] uppercase font-bold text-error tracking-tighter font-label">Missing in Resume</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl border border-secondary/20 bg-secondary-container/5">
                <p className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-2 font-label">Bridge the gap</p>
                <h4 className="text-lg font-headline font-bold text-on-surface leading-snug">Generate customized learning path in 12s</h4>
                <button className="mt-6 w-full py-4 bg-secondary text-on-secondary rounded-xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <span className="material-symbols-outlined text-xl">auto_fix_high</span>
                    FIX MY GAPS
                </button>
            </div>
        </div>
    );
};

export default CriticalVoids;
