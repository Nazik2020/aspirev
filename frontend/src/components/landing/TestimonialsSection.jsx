import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-8 py-32 bg-surface-container-low/30 rounded-xl my-20">
            <div className="text-center mb-16">
                <h2 className="font-headline text-3xl font-bold text-white">Real results from real students</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="glass-panel p-8 rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                    <p className="italic text-on-surface mb-8 leading-relaxed">
                        "Invikt completely restructured how I view my career preparation. The skill roadmap and tracker were exactly what I needed to focus my prep."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-sm shrink-0">
                            MS
                        </div>
                        <div>
                            <div className="font-bold text-white">Marcus Sterling</div>
                            <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Graduate Engineer</div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="glass-panel p-8 rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                    <p className="italic text-on-surface mb-8 leading-relaxed">
                        "The interface alone makes tracking applications enjoyable. The career roadmap tool helped me land an internship in just 3 weeks."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                            ER
                        </div>
                        <div>
                            <div className="font-bold text-white">Elena Rodriguez</div>
                            <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Product Design Student</div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="glass-panel p-8 rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                    <p className="italic text-on-surface mb-8 leading-relaxed">
                        "I finally stopped guessing what skills companies wanted. Invikt gave me a clear, step-by-step roadmap to guide my learning journey."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                            DC
                        </div>
                        <div>
                            <div className="font-bold text-white">David Chen</div>
                            <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Self-Taught Developer</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
