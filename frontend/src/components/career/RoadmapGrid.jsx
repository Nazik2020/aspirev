import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roadmaps, categories } from "../../data/roadmaps";

// ─── Single Career Card ──────────────────────────────────────────────────────
const RoadmapCard = ({ roadmap }) => {
  const navigate = useNavigate();
  const progress = 0; // Will come from user state in V2

  return (
    <div
      className="group relative flex flex-col h-full rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden cursor-pointer
                       bg-white dark:bg-[#1e1f23] hover:bg-slate-50 dark:bg-[#24252a] hover:border-slate-200 dark:border-white/10 transition-all duration-300
                       hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      onClick={() => navigate(`/career-path/${roadmap.id}`)}
    >
      {/* Top gradient bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${roadmap.color} opacity-80`}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${roadmap.accent}18` }}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{
                color: roadmap.accent,
                fontVariationSettings: "'FILL' 1, 'wght' 400",
              }}
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
          <h3 className="text-[1rem] font-bold text-slate-900 dark:text-white/90 mb-1 group-hover:text-slate-900 dark:text-white transition-colors">
            {roadmap.title}
          </h3>
          <div className="flex items-center gap-3 text-[0.7rem] text-slate-500 dark:text-white/35 font-medium">
            <span className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                code
              </span>
              {roadmap.skillCount} Skills
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
            <span className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                view_agenda
              </span>
              {roadmap.stageCount} Stages
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[0.8rem] text-slate-500 dark:text-white/45 leading-relaxed line-clamp-3 flex-1">
          {roadmap.description}
        </p>

        {/* Progress bar (shown if started) */}
        {progress > 0 && (
          <div>
            <div className="flex justify-between text-[0.65rem] text-slate-500 dark:text-white/40 mb-1.5">
              <span>Progress</span>
              <span style={{ color: roadmap.accent }}>{progress}%</span>
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
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
                               bg-slate-100 dark:bg-white/5 border border-white/12 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:text-white hover:border-white/25 hover:bg-slate-200 dark:bg-white/10
                               transition-all duration-200"
          style={{ "--accent": roadmap.accent }}
        >
          View Path
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          >
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
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onChange(cat.id)}
        className={`px-4 py-1.5 rounded-full text-[0.78rem] font-semibold transition-all duration-200
                    ${
                      selected === cat.id
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/8 hover:border-white/15 hover:text-slate-600 dark:text-white/70"
                    }`}
      >
        {cat.label}
      </button>
    ))}
  </div>
);

// ─── Main Export ─────────────────────────────────────────────────────────────
const RoadmapGrid = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const navigate = useNavigate();

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [search, activeCategory]);

  const filtered = useMemo(() => {
    return roadmaps.filter((r) => {
      const matchCat =
        activeCategory === "all" || r.category === activeCategory;
      const s = search.toLowerCase();
      const matchSearch =
        r.title.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s) ||
        (r.seo?.keywords && r.seo.keywords.some((k) => k.toLowerCase().includes(s)));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <span
          className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 text-[20px]"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
        >
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search roadmaps, skills, or roles..."
          className="w-full bg-white dark:bg-[#1e1f23] border border-slate-200 dark:border-white/8 rounded-xl pl-11 pr-11 py-3 text-[0.9rem]
                               text-slate-700 dark:text-white/80 placeholder:text-slate-400 dark:text-white/25 focus:outline-none focus:border-primary/40
                               focus:bg-slate-50 dark:bg-[#24252a] transition-all relative z-20"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:text-white/60 transition-colors z-20"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}

        {/* Auto-suggest Dropdown */}
        {search && isFocused && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white/90 dark:bg-[#15161a]/95 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-30 animate-in fade-in slide-in-from-top-2">
            {filtered.length > 0 ? (
              <ul className="max-h-72 overflow-y-auto p-2">
                {filtered.map((r) => (
                  <li key={`sugg-${r.id}`}>
                    <button
                      onClick={() => navigate(`/career-path/${r.id}`)}
                      className="group w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 flex items-center gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${r.accent || '#888'}18` }}
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: r.accent || 'currentColor', fontVariationSettings: "'FILL' 1" }}
                        >
                          {r.icon}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[0.95rem] font-semibold text-slate-800 dark:text-white/90 truncate transition-colors">
                          {r.title}
                        </span>
                        <span className="text-[0.75rem] text-slate-500 dark:text-white/40 truncate">
                          {r.stageCount} Stages • {r.skillCount} Skills
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 dark:text-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        arrow_forward
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-8 text-center flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-white/20">search_off</span>
                <span className="text-[0.9rem] text-slate-500 dark:text-white/40 font-medium">No matches found for "{search}"</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category tabs */}
      <CategoryTabs selected={activeCategory} onChange={setActiveCategory} />

      {/* Results count */}
      <p className="text-[0.75rem] text-slate-400 dark:text-white/30 font-medium">
        {filtered.length} {filtered.length === 1 ? "roadmap" : "roadmaps"} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, visibleCount).map((r) => (
              <RoadmapCard key={r.id} roadmap={r} />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-10 mb-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[0.85rem] font-semibold
                           bg-white dark:bg-[#1e1f23] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 
                           hover:text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-white/25 hover:shadow-sm transition-all duration-200 group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:rotate-180 transition-transform duration-500">
                  autorenew
                </span>
                Load More Roadmaps
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-24 flex flex-col items-center gap-3">
          <span
            className="material-symbols-outlined text-5xl text-white/15"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            search_off
          </span>
          <p className="text-slate-500 dark:text-white/40 font-medium">
            No roadmaps match "{search}"
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
            className="text-primary text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapGrid;
