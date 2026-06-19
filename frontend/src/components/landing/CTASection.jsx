import React from 'react';

const CTASection = () => {
    return (
        <section className="max-w-5xl mx-auto px-8 py-32 text-center">
            <div className="p-16 rounded-xl relative overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container-lowest border border-outline-variant/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">Ready to launch your career?</h2>
                <p className="text-on-surface-variant mb-10 max-w-xl mx-auto px-4">Join thousands of students and professionals using Invikt to land their dream jobs.</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-primary px-8 py-4 rounded-xl text-on-primary font-bold hover:bg-white transition-colors duration-300">
                        Start for Free
                    </button>
                    <button className="glass-panel border border-outline-variant/20 px-8 py-4 rounded-xl font-bold text-on-surface hover:border-primary/50 transition-colors">
                        View Pricing
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
