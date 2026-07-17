import React from "react";

const formatNum = (n) => {
  if (n == null) return "—";
  if (n >= 1000) return n.toLocaleString();
  return String(n);
};

const AppMetricsGrid = ({ metrics, loading }) => {
  if (loading || !metrics) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[100px] animate-pulse">
            <div className="h-2 bg-white/10 rounded w-16" />
            <div className="mt-4 flex items-end justify-between">
              <div className="h-6 bg-white/10 rounded w-14" />
              <div className="h-4 bg-white/5 rounded w-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const grid = [
    {
      label: "TOTAL APPLICATIONS",
      value: formatNum(metrics.totalApps),
      badge: null,
      valueColor: "text-[#00daf3]",
    },
    {
      label: "ACTIVE APPLICATIONS",
      value: formatNum(metrics.activeApps),
      badge: null,
      valueColor: "text-white",
    },
    {
      label: "OFFERS RECEIVED",
      value: formatNum(metrics.offerCount),
      badge: null,
      valueColor: "text-violet-400",
    },
    {
      label: "OFFER RATE",
      value: metrics.computedOfferRate || "0%",
      badge: null,
      valueColor: "text-white",
    },
    {
      label: "AVG APPS / USER",
      value: String(metrics.appsPerUser ?? "0"),
      badge: null,
      valueColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {grid.map((metric, i) => (
        <div
          key={i}
          className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-all duration-200"
        >
          <div className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-tight">
            {metric.label}
          </div>
          <div className="flex items-end justify-between mt-4">
            <div className={`text-2xl font-headline font-black ${metric.valueColor}`}>
              {metric.value}
            </div>
            {metric.badge && (
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${metric.badgeColor}`}>
                {metric.badge}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppMetricsGrid;
