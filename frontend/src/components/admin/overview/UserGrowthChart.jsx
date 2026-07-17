import React from "react";

const UserGrowthChart = ({ data, loading }) => {
  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="mb-8">
          <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
          <div className="h-3 bg-white/5 rounded w-48 mt-2 animate-pulse" />
        </div>
        <div className="flex-1 min-h-[220px] bg-white/5 rounded-xl animate-pulse" />
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => d.cumulative), 1);
  const svgWidth = 700;
  const svgHeight = 200;
  const padding = { top: 10, bottom: 10, left: 0, right: 0 };
  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  // Build SVG path for cumulative line
  const points = data.map((d, i) => ({
    x: padding.left + (i / Math.max(data.length - 1, 1)) * chartW,
    y: padding.top + chartH - (d.cumulative / maxVal) * chartH,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${svgHeight} L ${points[0].x.toFixed(1)} ${svgHeight} Z`;

  // Find peak week
  const peakIdx = data.reduce((best, d, i) => (d.weeklyNew > data[best].weeklyNew ? i : best), 0);

  // X-axis labels: first, middle, last
  const labelIndices = [0, Math.floor(data.length / 2), data.length - 1];

  return (
    <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-headline text-base font-bold text-slate-800 dark:text-white">
            User Growth
          </h3>
          <p className="text-xs text-slate-500 dark:text-white/40 mt-1">
            Cumulative users over last 30 days
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-1 text-[9px] font-bold text-white/50 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          TOTAL USERS
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px] w-full mt-4">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-slate-100 dark:border-white/5 w-full h-0" />
          ))}
        </div>

        <svg
          className="w-full h-full min-h-[200px]"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="overviewTotalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#814df3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#814df3" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#overviewTotalGrad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#ab8ff4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Peak dot */}
          <circle
            cx={points[peakIdx].x}
            cy={points[peakIdx].y}
            r="5"
            fill="#ab8ff4"
          />
          <circle
            cx={points[peakIdx].x}
            cy={points[peakIdx].y}
            r="8"
            fill="none"
            stroke="#ab8ff4"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>

        {/* Peak tooltip */}
        <div
          className="absolute bg-slate-900/95 dark:bg-[#17181c]/95 border border-slate-800 dark:border-white/10 rounded-2xl p-3 shadow-2xl text-left pointer-events-none z-10"
          style={{
            left: `${(points[peakIdx].x / svgWidth) * 100}%`,
            top: `${(points[peakIdx].y / svgHeight) * 100 - 15}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            {data[peakIdx].label}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white">
              {data[peakIdx].cumulative.toLocaleString()} Users
            </span>
            {data[peakIdx].weeklyNew > 0 && (
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                +{data[peakIdx].weeklyNew}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between items-center px-2 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {labelIndices.map((idx) => (
          <span key={idx}>{data[idx].label}</span>
        ))}
      </div>
    </div>
  );
};

export default UserGrowthChart;
