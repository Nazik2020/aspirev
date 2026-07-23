import React from "react";

const skillBars = [
  { name: "LOGIC", height: "60%", color: "from-violet-500 to-purple-600" },
  { name: "ARCH", height: "85%", color: "from-purple-500 to-indigo-600" },
  { name: "DATA", height: "45%", color: "from-cyan-400 to-blue-500" },
  { name: "AI/ML", height: "70%", color: "from-violet-500 to-cyan-400" },
  { name: "UI", height: "30%", color: "from-cyan-400 to-teal-400" },
  { name: "DEVOPS", height: "95%", color: "from-purple-600 to-violet-500" },
  { name: "SEC", height: "55%", color: "from-cyan-500 to-blue-600" },
  { name: "SOFT", height: "75%", color: "from-violet-500 to-purple-500" },
];

const metrics = [
  { label: "TECHNICAL SCORE", value: "84%" },
  { label: "DOMAIN MATCH", value: "91%" },
  { label: "GROWTH RATE", value: "+12%", highlight: true },
  { label: "GLOBAL RANK", value: "Top 15%", highlight: true },
];

const SkillRadarChart = () => {
  return (
    <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Career DNA Visualization
          </h3>
          <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">
            Topological mapping of technical and operational expertise.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-md text-[0.6rem] font-extrabold uppercase tracking-widest">
            Active Scan
          </span>
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 rounded-md text-[0.6rem] font-extrabold uppercase tracking-widest">
            v2.4.0
          </span>
        </div>
      </div>

      {/* Vertical Pill Bar Chart */}
      <div className="bg-slate-50 dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-xl p-6 relative">
        <div className="h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
          {skillBars.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
              <div className="w-full max-w-[36px] bg-slate-200 dark:bg-white/5 rounded-2xl overflow-hidden flex items-end h-full">
                <div
                  className={`w-full rounded-2xl bg-gradient-to-t ${bar.color} transition-all duration-700 group-hover:brightness-125 shadow-lg`}
                  style={{ height: bar.height }}
                />
              </div>
              <span className="text-[0.6rem] font-extrabold text-slate-400 dark:text-white/40 tracking-wider">
                {bar.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Metrics Bottom Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/5 rounded-xl p-3.5 text-center space-y-1"
          >
            <span className="text-[0.55rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-black block">
              {metric.label}
            </span>
            <span
              className={`text-base font-black ${
                metric.highlight
                  ? "text-cyan-500 dark:text-cyan-400"
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
