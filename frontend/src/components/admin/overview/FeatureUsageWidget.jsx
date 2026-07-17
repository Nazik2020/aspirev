import React from "react";

const FeatureUsageWidget = ({ usage, loading }) => {
  if (loading || !usage) {
    return (
      <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="mb-6">
          <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-2 bg-white/10 rounded w-20 mb-2 animate-pulse" />
              <div className="h-1.5 bg-white/5 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const features = [
    {
      name: "Users",
      count: usage.users,
      color: "bg-gradient-to-r from-violet-500 to-violet-300",
    },
    {
      name: "Job Applications",
      count: usage.jobs,
      color: "bg-gradient-to-r from-cyan-500 to-cyan-300",
    },
    {
      name: "Roadmaps In Progress",
      count: usage.roadmaps,
      color: "bg-gradient-to-r from-[#ab8ff4] to-violet-400",
    },
    {
      name: "Portfolios",
      count: usage.portfolios,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-300",
    },
  ];

  const maxCount = Math.max(...features.map((f) => f.count), 1);

  return (
    <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-cyan-400">
            bar_chart
          </span>
          Platform Usage
        </h3>
        <span className="material-symbols-outlined text-slate-400 text-sm">
          monitoring
        </span>
      </div>

      <div className="space-y-4">
        {features.map((feat, idx) => {
          const pct = maxCount > 0 ? Math.round((feat.count / maxCount) * 100) : 0;
          return (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">
                <span>{feat.name}</span>
                <span className="text-slate-800 dark:text-white">
                  {feat.count.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${feat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureUsageWidget;
