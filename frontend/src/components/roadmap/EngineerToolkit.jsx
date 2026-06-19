import React from 'react';

const EngineerToolkit = () => {
    return (
        <section className="mt-32 max-w-6xl mx-auto">
            <h2 className="font-headline text-3xl font-bold mb-12 text-center">
                The Engineer's <span className="text-primary">Toolkit</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="md:col-span-2 glass-panel rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-bold mb-4">Deep Learning Compute</h4>
                        <p className="text-on-surface-variant text-sm mb-6">
                            Our integration suite allows you to track GPU utilization and distributed training metrics directly in your roadmap.
                        </p>
                    </div>
                    <div className="h-48 w-full bg-surface-container rounded-lg overflow-hidden relative border border-outline-variant/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
                        <img 
                            className="w-full h-full object-cover" 
                            alt="Motherboard Compute" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnhhpow6FJRruUNTa8gq4xj3XYL-HKXkcui67vdJcgkFCSQpw_GDQ2-egR03KgcmKOC4OuB2TETGoN3yByRjjJhN3fA0btQFo0Wxmwo-s3jCOouj4Bu3lnXMbmS4HMKURL_L-8CaI00jKuwtxx8muvb7PWL151TiVvaMBR2TTi2r3XjcSqbmD6xoyI9RLYql8IOlGLbx9yfUllsoI6Kee7a2Em_x9nHtihQllJR_cIpRSrH-q2yI8WPjOuCofBXysq4IqaSOH4Vy8D"
                        />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="glass-panel rounded-xl p-8 border border-outline-variant/10">
                    <span className="material-symbols-outlined text-4xl text-secondary-fixed-dim mb-6">terminal</span>
                    <h4 className="text-xl font-bold mb-4">CLI First</h4>
                    <p className="text-on-surface-variant text-sm">
                        Automate your learning milestones using our proprietary CLI. Pull resources, submit projects, and get instant feedback.
                    </p>
                    <ul className="mt-6 space-y-3">
                        <li className="flex items-center gap-2 text-xs text-on-surface">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim"></span> Invikt roadmap sync
                        </li>
                        <li className="flex items-center gap-2 text-xs text-on-surface">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim"></span> Invikt verify --project=ml-101
                        </li>
                    </ul>
                </div>

                {/* Card 3 */}
                <div className="glass-panel rounded-xl p-8 border border-outline-variant/10 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">groups</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Cohort Learning</h4>
                    <p className="text-on-surface-variant text-sm">
                        Join over 12,000 ML students in real-time study sessions.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="md:col-span-2 glass-panel rounded-xl p-8 border border-outline-variant/10 flex items-center gap-8">
                    <div className="hidden sm:block w-40 h-40 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
                        <img 
                            className="w-full h-full object-cover" 
                            alt="Neural Connections" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEpJmn5dlm79p33eOgkgopMMEL92hnsqJt_ohZ9XFt9N2Hxmrs24KIcTCPJJXV3eZ-nSASy-XGzk3nmuII7UiUgLRiizm0_cz-jjbJ-pwuxIcub2unFoc__A07NvOmNGx-X3BywxS7HwyEKrOXrZI5KKcZfSh_8BP-_cfAdERZ-wwMCCcZm1C5fQ3DqYX1Tl7YOO8dIKLFpFyuRTkrDwtgKqjI3AS_R0ewPfuKhXfQygz6c4b8pm8hqQR7mQs4dbXozjroogLA9o9Q"
                        />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">Automated Peer Review</h4>
                        <p className="text-on-surface-variant text-sm">
                            Our AI analyzes your code structure, efficiency, and documentation quality to provide university-level grading in seconds.
                        </p>
                        <button className="mt-4 text-primary text-sm font-bold flex items-center gap-2 hover:gap-4 transition-all">
                            Explore the Sandbox <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EngineerToolkit;
