import React from 'react';

const SkillDistributionMatrix = () => {
    return (
        <div className="lg:col-span-8 glass-card rounded-xl border border-outline-variant/15 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">hub</span>
                    Skill Distribution Matrix
                </h3>
                <div className="flex gap-2 items-center">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="text-xs text-on-surface-variant uppercase font-bold font-label">Mohamed</span>
                    <span className="w-3 h-3 rounded-full bg-surface-container-highest ml-4"></span>
                    <span className="text-xs text-on-surface-variant uppercase font-bold font-label">Target</span>
                </div>
            </div>
            <div className="p-8 flex-1 flex items-center justify-center min-h-[400px] relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #cdbdff 0%, transparent 70%)' }}></div>
                <div className="grid grid-cols-5 gap-4 w-full">
                    {/* Mocked Heatmap Blocks as per HTML */}
                    <div className="aspect-square rounded-lg bg-primary-container flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">Python</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-primary/80 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">PyTorch</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-surface-container-highest border border-primary/40 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-primary">TensorFlow</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-primary-container flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">SQL</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-primary/60 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">Scikit</span>
                    </div>
                    
                    <div className="aspect-square rounded-lg bg-primary/90 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">Stats</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-surface-container-highest border border-primary/40 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-primary">Deep Learning</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-primary/40 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">Git</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-primary/20 flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">Cloud</span>
                    </div>
                    <div className="aspect-square rounded-lg bg-primary-container flex items-center justify-center group cursor-help transition-all hover:scale-105">
                        <span className="text-xs font-bold text-on-primary">NLP</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillDistributionMatrix;
