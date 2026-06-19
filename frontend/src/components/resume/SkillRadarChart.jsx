import React from 'react';

const SkillRadarChart = () => {
    return (
        <section className="col-span-12">
            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="font-headline text-xl font-bold mb-1">Career DNA Visualization</h2>
                        <p className="text-sm text-on-surface-variant">Topological mapping of your technical expertise.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded text-[10px] font-bold uppercase tracking-widest">Active Scan</span>
                        <span className="px-3 py-1 bg-surface-bright text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-widest">v2.4.0</span>
                    </div>
                </div>

                {/* Decorative Chart Area */}
                <div className="relative h-64 w-full bg-surface-container-lowest rounded-lg overflow-hidden flex items-end px-8 py-6 gap-4">
                    <div className="flex-1 h-[60%] bg-gradient-to-t from-primary/40 to-primary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[85%] bg-gradient-to-t from-primary/40 to-primary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[45%] bg-gradient-to-t from-secondary/40 to-secondary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[70%] bg-gradient-to-t from-primary/40 to-primary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[30%] bg-gradient-to-t from-secondary/40 to-secondary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[95%] bg-gradient-to-t from-primary/40 to-primary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[55%] bg-gradient-to-t from-secondary/40 to-secondary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-[75%] bg-gradient-to-t from-primary/40 to-primary rounded-t-lg relative group">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Labels Overlay */}
                    <div className="absolute bottom-1 left-8 right-8 flex justify-between">
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">Logic</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">Arch</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">Data</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">AI/ML</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">UI</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">DevOps</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">Sec</span>
                        <span className="text-[8px] font-label uppercase text-on-surface-variant">Soft</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillRadarChart;
