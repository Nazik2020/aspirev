import React from "react";

const fmt = (n) => (n != null ? n.toLocaleString() : "—");

const SKELETON_COUNT = 6;

const MetricsRow = ({ metrics, loading }) => {
  if (loading || !metrics) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm min-h-[110px] animate-pulse">
            <div className="h-2 bg-white/10 rounded w-16" />
            <div className="h-6 bg-white/10 rounded w-12 mt-4" />
            <div className="h-3 bg-white/5 rounded w-14 mt-3" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Users",
      value: fmt(metrics.totalUsers),
      badge: `+${metrics.usersToday} today`,
      badgeClass: "text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/10",
    },
    {
      label: "Active Now",
      value: fmt(metrics.activeUsers),
      live: true,
      badge: "LIVE",
      badgeClass: "text-[#00daf3] bg-[#00daf3]/10 border-[#00daf3]/10",
    },
    {
      label: "Apps This Week",
      value: fmt(metrics.appsLastWeek),
      badge: "+ this week",
      badgeClass: "text-slate-500 dark:text-white/40 bg-white/5 border-white/5",
    },
    {
      label: "Job Applications",
      value: fmt(metrics.totalApps),
      icon: "folder",
      sub: "All time",
    },
    {
      label: "Active Roadmaps",
      value: fmt(metrics.activeRoadmaps),
      icon: "route",
      sub: "In progress",
    },
    {
      label: "New Users (7d)",
      value: fmt(metrics.usersLastWeek),
      badge: "+ this week",
      badgeClass: "text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`bg-white dark:bg-[#101216] p-5 rounded-2xl border shadow-sm text-left relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
            c.live
              ? "border-[#00daf3]/20 dark:border-[#00daf3]/10 border-l-4 border-l-[#00daf3]"
              : "border-slate-200 dark:border-white/5"
          }`}
        >
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            {c.label}
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-headline font-black text-slate-800 dark:text-white">
              {c.value}
            </span>
            {c.live && <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />}
            {c.icon && (
              <span className="material-symbols-outlined text-slate-400 dark:text-white/20 text-lg ml-auto">
                {c.icon}
              </span>
            )}
          </div>
          {c.badge && (
            <div
              className={`text-[10px] font-bold mt-2 px-2 py-0.5 rounded-md border w-fit ${c.badgeClass}`}
            >
              {c.live && <span className="w-1 h-1 rounded-full bg-[#00daf3] inline-block mr-1.5" />}
              {c.badge}
            </div>
          )}
          {c.sub && (
            <div className="text-[10px] text-slate-400 mt-2">{c.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsRow;
