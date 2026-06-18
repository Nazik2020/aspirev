import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadmaps, categories } from '../../data/roadmaps';

// ─── Single Career Card ──────────────────────────────────────────────────────
const RoadmapCard = ({ roadmap }) => {
    const navigate = useNavigate();
    const progress = 0; // Will come from user state in V2

    return (
        <div
            className="group relative flex flex-col rounded-2xl border border-white/5 overflow-hidden cursor-pointer
                       bg-[#1e1f23] hover:bg-[#24252a] hover:border-white/10 transition-all duration-300
                       hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            onClick={() => navigate(`/career-path/${roadmap.id}`)}
        >
            {/* Top gradient bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${roadmap.color} opacity-80`} />

            <div className="p-6 flex flex-col flex-1 gap-4">
                {/* Icon + badge row */}
                <div className="flex items-start justify-between">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${roadmap.accent}18` }}
                    >
                        <span
                            className="material-symbols-outlined text-2xl"
                            style={{ color: roadmap.accent, fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                        >
                            {roadmap.icon}
                        </span>
                    </div>
                    {progress > 0 && (
                        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-secondary-fixed-dim bg-secondary-fixed-dim/10 px-2 py-1 rounded-full border border-secondary-fixed-dim/20">
                            In Progress
                        </span>
                    )}
                </div>

                {/* Title + meta */}
                <div>
                    <h3 className="text-[1rem] font-bold text-white/90 mb-1 group-hover:text-white transition-colors">
                        {roadmap.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[0.7rem] text-white/35 font-medium">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                code
                            </span>
                            {roadmap.skillCount} Skills
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                view_agenda
                            </span>
                            {roadmap.stageCount} Stages
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[0.8rem] text-white/45 leading-relaxed line-clamp-3 flex-1">
                    {roadmap.description}
                </p>

                {/* Progress bar (shown if started) */}
                {progress > 0 && (
                    <div>
                        <div className="flex justify-between text-[0.65rem] text-white/40 mb-1.5">
                            <span>Progress</span>
                            <span style={{ color: roadmap.accent }}>{progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${roadmap.color} rounded-full`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* CTA */}
                <button
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[0.8rem] font-semibold
                               border border-white/8 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/5
                               group-hover:border-opacity-100 transition-all duration-200"
                    style={{ '--accent': roadmap.accent }}
                >
                    View Path
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                        arrow_forward
                    </span>
                </button>
            </div>
        </div>
    );
};

// ─── Category Filter Tabs ────────────────────────────────────────────────────
const CategoryTabs = ({ selected, onChange }) => (
    <div className="flex items-center gap-2 flex-wrap">
        {categories.map(cat => (
            <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[0.78rem] font-semibold transition-all duration-200
                    ${selected === cat.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-white/40 border border-white/8 hover:border-white/15 hover:text-white/70'
                    }`}
            >
                {cat.label}
            </button>
        ))}
    </div>
);

// ─── Main Export ─────────────────────────────────────────────────────────────
const RoadmapGrid = () => {
    const [search, setSearch]       = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = useMemo(() => {
        return roadmaps.filter(r => {
            const matchCat    = activeCategory === 'all' || r.category === activeCategory;
            const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                                r.description.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        });
    }, [search, activeCategory]);

    return (
        <div className="space-y-6">
            {/* Search bar */}
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                    search
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search roadmaps, skills, or roles..."
                    className="w-full bg-[#1e1f23] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-[0.9rem]
                               text-white/80 placeholder:text-white/25 focus:outline-none focus:border-primary/40
                               focus:bg-[#24252a] transition-all"
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                )}
            </div>

            {/* Category tabs */}
            <CategoryTabs selected={activeCategory} onChange={setActiveCategory} />

            {/* Results count */}
            <p className="text-[0.75rem] text-white/30 font-medium">
                {filtered.length} {filtered.length === 1 ? 'roadmap' : 'roadmaps'} found
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map(r => <RoadmapCard key={r.id} roadmap={r} />)}
                </div>
            ) : (
                <div className="text-center py-24 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-5xl text-white/15" style={{ fontVariationSettings: "'FILL' 1" }}>
                        search_off
                    </span>
                    <p className="text-white/40 font-medium">No roadmaps match "{search}"</p>
                    <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="text-primary text-sm hover:underline">
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoadmapGrid;
