import React from "react";

const items = [
  { label: "CONTACT INFO", percentage: 100 },
  { label: "PROFILE SUMMARY", percentage: 85 },
  { label: "SKILLS MATRIX", percentage: 93 },
  { label: "WORK EXPERIENCE", percentage: 78 },
  { label: "EDUCATION", percentage: 100 },
  { label: "BULLET QUALITY", percentage: 65 },
];

const ContentBreakdown = () => {
  return (
    <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[0.7rem] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-white/40">
          Content Breakdown
        </h3>
        <span className="material-symbols-outlined text-slate-400 dark:text-white/30 text-[18px]">
          bar_chart
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-[0.65rem] font-bold tracking-wider">
              <span className="text-slate-500 dark:text-white/50 uppercase">
                {item.label}
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">
                {item.percentage}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 rounded-full transition-all duration-700"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentBreakdown;
