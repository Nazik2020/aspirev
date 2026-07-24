import React from "react";

const items = [
  { label: "CONTACT INFO", percentage: 100, status: "Perfect" },
  { label: "PROFILE SUMMARY", percentage: 85, status: "Good" },
  { label: "SKILLS MATRIX", percentage: 93, status: "Optimal" },
  { label: "WORK EXPERIENCE", percentage: 78, status: "Needs Detail" },
  { label: "EDUCATION", percentage: 100, status: "Verified" },
  { label: "BULLET QUALITY", percentage: 65, status: "Actionable" },
];

const ContentBreakdown = () => {
  return (
    <div className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-white/40">
            Content Breakdown
          </h3>
          <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
            Quality score per resume section
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 dark:text-violet-400">
          <span className="material-symbols-outlined text-[18px]">
            bar_chart
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1.5 group">
            <div className="flex justify-between items-center text-[0.65rem] font-extrabold tracking-wider">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 dark:text-white/60 uppercase">
                  {item.label}
                </span>
                <span className="text-[0.6rem] text-slate-400 dark:text-white/30 font-medium hidden sm:inline">
                  • {item.status}
                </span>
              </div>
              <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">
                {item.percentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-white/5">
              <div
                className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 group-hover:brightness-125 shadow-sm"
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
