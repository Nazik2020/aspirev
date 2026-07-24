import React, { useState } from "react";

const skillBars = [
  { name: "LOGIC", val: 60, height: "60%", color: "from-violet-500 to-purple-600" },
  { name: "ARCH", val: 85, height: "85%", color: "from-purple-500 to-indigo-600" },
  { name: "DATA", val: 45, height: "45%", color: "from-cyan-400 to-blue-500" },
  { name: "AI/ML", val: 70, height: "70%", color: "from-violet-500 to-cyan-400" },
  { name: "UI", val: 30, height: "30%", color: "from-cyan-400 to-teal-400" },
  { name: "DEVOPS", val: 95, height: "95%", color: "from-purple-600 to-violet-500" },
  { name: "SEC", val: 55, height: "55%", color: "from-cyan-500 to-blue-600" },
  { name: "SOFT", val: 75, height: "75%", color: "from-violet-500 to-purple-500" },
];

const metrics = [
  { label: "TECHNICAL SCORE", value: "84%", icon: "code", trend: "High" },
  { label: "DOMAIN MATCH", value: "91%", icon: "target", trend: "Optimal" },
  { label: "GROWTH RATE", value: "+12%", icon: "trending_up", highlight: true },
  { label: "GLOBAL RANK", value: "Top 15%", icon: "stars", highlight: true },
];

const SkillRadarChart = () => {
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all space-y-6">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Career DNA Visualization
            </h3>
            <span className="material-symbols-outlined text-violet-500 text-[18px]">
              analytics
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">
            Topological mapping of technical and operational expertise.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full text-[0.6rem] font-black uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Active Scan
          </span>
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 rounded-full text-[0.6rem] font-black uppercase tracking-widest">
            v2.4.0
          </span>
        </div>
      </div>

      {/* Vertical Pill Bar Chart */}
      <div className="bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden">
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="h-52 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 relative z-10">
          {skillBars.map((bar, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredBar(bar)}
              onMouseLeave={() => setHoveredBar(null)}
              className="flex-1 flex flex-col items-center gap-3 group h-full justify-end relative cursor-pointer"
            >
              {/* Tooltip on Hover */}
              {hoveredBar?.name === bar.name && (
                <div className="absolute -top-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[0.65rem] font-black px-2.5 py-1 rounded-lg shadow-xl z-30 whitespace-nowrap animate-in fade-in zoom-in-95">
                  {bar.name}: {bar.val}%
                </div>
              )}

              <div className="w-full max-w-[42px] bg-slate-200 dark:bg-white/5 rounded-2xl overflow-hidden flex items-end h-full p-1 group-hover:bg-slate-300 dark:group-hover:bg-white/10 transition-colors">
                <div
                  className={`w-full rounded-xl bg-gradient-to-t ${bar.color} transition-all duration-700 group-hover:brightness-125 shadow-lg relative`}
                  style={{ height: bar.height }}
                >
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="text-[0.65rem] font-extrabold text-slate-500 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white tracking-wider transition-colors">
                {bar.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Bottom Stats Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 rounded-xl p-4 space-y-1.5 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.55rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-black">
                {metric.label}
              </span>
              <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-white/30 group-hover:text-violet-500 transition-colors">
                {metric.icon}
              </span>
            </div>
            <span
              className={`text-lg font-black block tracking-tight ${
                metric.highlight
                  ? "text-cyan-600 dark:text-cyan-400"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRadarChart;
