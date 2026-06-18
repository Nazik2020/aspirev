import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-8 py-32 bg-surface-container-low/30 rounded-xl my-20">
            <div className="text-center mb-16">
                <h2 className="font-headline text-3xl font-bold">Resonating through the nebula</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="glass-panel p-8 rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                    <p className="italic text-on-surface mb-8 leading-relaxed">
                        "Invikt completely restructured how I view my professional value. The gap analysis was surgical and frighteningly accurate."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOokhKuct2lhJpYyGSbcjeojWsheTcMLPIScM_TggzOb5IoCq_6YjD97mWUy5M8KdUPPIByPum0_pQdfNnBqF5NeMJ3s-yQPHdGcTEir8UnvrAVySkrErKaFImg2namb5qj8Oh3qVNyhKFg6qetxUfuBGXfcCt-jvORENc1sIZEFScE-JEjWtszeTBEBKuLQqO98XohDLRC2Yph_TiC5Q7KIeRr38gY2c1ALbpMdA5dZAHWIL6DoXF9quTKLm_BYo4eDiNihrl-ol8" />
                        </div>
                        <div>
                            <div className="font-bold">Marcus Sterling</div>
                            <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Senior Architect</div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="glass-panel p-8 rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                    <p className="italic text-on-surface mb-8 leading-relaxed">
                        "The interface alone makes you feel like you're working with future tech. The career roadmap tool landed me a role in 3 weeks."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUKNqjPBUk-YncyXXrrpGjB0p09YQnynSAf9Vdoo7ESZ5KTsjgsJmIvyZ0TaK4nQQipMBdg57Vr5YeTqcCKJOlKX-uDLMcynNTN653wFPEIMm_xPQWfSMWG6Ef_CdKMojJxWLLTg8eZ8v2vcj7i8dDkpepTmm02YPWkFiG0qVTX-90D_jbkHwr2OhMO6v30QvUzdA-L52EcVVGq9xvveZbNdJpyBw9m1SiZ7eqNaLOrlfRATxj8kVGu8cpRzfcRGweFINk9hfJGl0U" />
                        </div>
                        <div>
                            <div className="font-bold">Elena Rodriguez</div>
                            <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Product Designer</div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="glass-panel p-8 rounded-lg border border-outline-variant/10 flex flex-col justify-between">
                    <p className="italic text-on-surface mb-8 leading-relaxed">
                        "I finally stopped guessing what recruiters wanted. Invikt gave me the technical translation I needed to stand out."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHYlQKf2wgwd0MSxc0cULAfTBwwDLBwg_2_i1JxKfW53B1CwhyI2EW9ROKi1sL1irfRNKY-lNr_Uwlqh2cudvvSLKYxYyF7SlInGwyc4mMIVf853JbtlFCPG75OdBH8IDIW3zRYVdSJjqf47IPFv0iSljBBZ0Mi-6fafAJ1nal3n2hOlQoIaWNvIOMXJ70mfcANMus7053Rxk1c9qcZQlNelrdGhcpmuS-0yhpYhsxP3lqz_VtF9DS6yVKqT-RLWS9KrBBqyufkuTO" />
                        </div>
                        <div>
                            <div className="font-bold">David Chen</div>
                            <div className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Fullstack Developer</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
