import React from "react";

const CTASection = () => {
  return (
    <section className="max-w-5xl mx-auto px-8 py-32 text-center">
      <div className="p-12 sm:p-16 rounded-xl relative overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container-lowest border border-slate-200 dark:border-outline-variant/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
          Ready to launch your career?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-on-surface-variant mb-8 max-w-xl mx-auto px-4">
          Join thousands of students and professionals using Aspirev to land
          their dream jobs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary px-6 py-3 rounded-xl text-sm text-on-primary font-bold hover:opacity-90 transition-opacity duration-300">
            Start for Free
          </button>
          <button className="glass-panel dark:border-white/10 border-slate-200 bg-white/60 dark:bg-transparent border border-slate-200 dark:border-outline-variant/20 px-6 py-3 rounded-xl text-sm font-bold text-slate-900 dark:text-on-surface hover:border-primary/50 transition-colors">
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
