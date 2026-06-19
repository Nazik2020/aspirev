import React from 'react';

const InteractiveNodes = () => {
    return (
        <section className="max-w-5xl mx-auto relative px-4">
            {/* Vertical Line Connector */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 roadmap-line opacity-30 md:block hidden"></div>
            
            {/* Stage 1: Beginner */}
            <div className="relative mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="md:w-1/2 md:pr-16 text-right order-2 md:order-1">
                    <div className="glass-panel p-8 rounded-xl border border-outline-variant/10 shadow-lg hover:border-primary/30 transition-all group relative z-10 bg-surface">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">Level 01</span>
                        <h3 className="text-2xl font-headline font-bold mb-4 text-slate-100 group-hover:text-primary transition-colors">Foundational Logic</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                            Master the mathematical rigor and programming fluency required to understand what's happening under the hood of every algorithm.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-end mb-6">
                            {['Python 3.12', 'Linear Algebra', 'Probability', 'Calculus'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-slate-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="bg-surface-container-low p-4 rounded-lg border-l-2 border-primary text-left">
                            <p className="text-[10px] font-bold text-primary uppercase mb-1">Project Suggestion</p>
                            <p className="text-xs text-on-surface">Build a from-scratch Matrix Library in Python to understand tensor operations without external dependencies.</p>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center glow-node order-1 md:order-2">
                    <span className="material-symbols-outlined text-primary text-xl">functions</span>
                </div>
                <div className="md:w-1/2 md:pl-16 hidden md:block order-3"></div>
            </div>

            {/* Stage 2: Intermediate */}
            <div className="relative mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="md:w-1/2 md:pr-16 hidden md:block"></div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-background border-4 border-secondary-fixed-dim flex items-center justify-center glow-node">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-xl">query_stats</span>
                </div>
                <div className="md:w-1/2 md:pl-16">
                    <div className="glass-panel p-8 rounded-xl border border-outline-variant/10 shadow-lg hover:border-secondary-fixed-dim/30 transition-all group relative z-10 bg-surface">
                        <span className="text-xs font-bold text-secondary-fixed-dim uppercase tracking-[0.2em] mb-3 block">Level 02</span>
                        <h3 className="text-2xl font-headline font-bold mb-4 text-slate-100 group-hover:text-secondary-fixed-dim transition-colors">Statistical Learning</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                            Transition into applied machine learning by mastering feature engineering, cross-validation, and classical algorithms.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {['Scikit-Learn', 'Pandas', 'Matplotlib', 'XGBoost'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-slate-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="bg-surface-container-low p-4 rounded-lg border-l-2 border-secondary-fixed-dim">
                            <p className="text-[10px] font-bold text-secondary-fixed-dim uppercase mb-1">Project Suggestion</p>
                            <p className="text-xs text-on-surface">Predict house prices using a Kaggle dataset, focusing on deep exploratory data analysis and feature selection.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stage 3: Advanced */}
            <div className="relative mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="md:w-1/2 md:pr-16 text-right order-2 md:order-1">
                    <div className="glass-panel p-8 rounded-xl border border-outline-variant/10 shadow-lg hover:border-tertiary/30 transition-all group relative z-10 bg-surface">
                        <span className="text-xs font-bold text-tertiary uppercase tracking-[0.2em] mb-3 block">Level 03</span>
                        <h3 className="text-2xl font-headline font-bold mb-4 text-slate-100 group-hover:text-tertiary transition-colors">Neural Architectures</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                            Dive into deep learning, computer vision, and NLP. Learn how to scale models and deploy them to production environments.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-end mb-6">
                            {['PyTorch', 'Transformers', 'Docker', 'FastAPI'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-slate-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="bg-surface-container-low p-4 rounded-lg border-l-2 border-tertiary text-left">
                            <p className="text-[10px] font-bold text-tertiary uppercase mb-1">Project Suggestion</p>
                            <p className="text-xs text-on-surface">Deploy a custom Fine-Tuned LLM using PyTorch and containerize it with Docker for a scalable real-time API.</p>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-background border-4 border-tertiary flex items-center justify-center glow-node order-1 md:order-2">
                    <span className="material-symbols-outlined text-tertiary text-xl">auto_awesome</span>
                </div>
                <div className="md:w-1/2 md:pl-16 hidden md:block order-3"></div>
            </div>

            {/* Final Node: Mastery */}
            <div className="relative flex flex-col items-center">
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(205,189,255,0.6)]">
                    <span className="material-symbols-outlined text-on-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div className="mt-6 text-center">
                    <h4 className="font-headline text-2xl font-extrabold text-white">Full Stack ML Engineer</h4>
                    <p className="text-on-surface-variant text-sm mt-2">Ready for Industry Leadership</p>
                </div>
            </div>
        </section>
    );
};

export default InteractiveNodes;
