import React from 'react';
import RoadmapGrid from '../components/career/RoadmapGrid';

const CareerPathPage = () => {
    return (
        <div className="w-full space-y-10">
            {/* ── Page Header ── */}
            <div className="space-y-1">
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-white/90 tracking-tight">
                    Explore Career Roadmaps
                </h1>
                <p className="text-white/40 text-sm md:text-base max-w-xl leading-relaxed pt-1">
                    Find your path. Learn what matters. Track your progress. Our curated,
                    industry-standard roadmaps guide you through every essential skill for modern careers.
                </p>
            </div>

            {/* ── Roadmap Grid with Search + Filters ── */}
            <RoadmapGrid />

            {/* ── "Don't see your role?" CTA ── */}
            <div className="rounded-2xl border border-white/8 bg-[#1e1f23] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white/80">Don't see your target role?</h3>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                        We're constantly adding new roadmaps. Subscribe to get notified when
                        new career paths are released, or suggest a new one to our team.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 md:w-56 bg-[#14151a] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-sm
                                   text-white/70 placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-all"
                    />
                    <button className="shrink-0 px-5 py-3 sm:py-2.5 rounded-xl bg-gradient-to-br from-primary-container to-primary text-white text-sm font-bold
                                       hover:opacity-90 hover:scale-105 transition-all duration-200 whitespace-nowrap text-center">
                        Notify Me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CareerPathPage;
