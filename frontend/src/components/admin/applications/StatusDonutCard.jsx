import React, { useMemo } from "react";

const STAGE_COLORS = {
  WISHLIST:   "#6b7280",
  APPLIED:    "#00daf3",
  ASSESSMENT: "#c6a0ff",
  INTERVIEW:  "#7c3aed",
  FINAL:      "#6366f1",
  FINAL_INTERVIEW: "#6366f1",
  OFFER:      "#34d399",
  REJECTED:   "#f43f5e",
};

const StatusDonutCard = ({ data, loading }) => {
  const totalCount = useMemo(
    () => (data ? data.reduce((sum, d) => sum + d.count, 0) : 0),
    [data]
  );

  const segments = useMemo(() => {
    if (!data || data.length === 0) return [];
    const total = totalCount || 1;
    let running = 0;
    return data.map((d) => {
      const start = running;
      const pct = (d.count / total) * 100;
      running += pct;
      return { stage: d.stage, color: STAGE_COLORS[d.stage] || "#6b7280", start, end: running, count: d.count };
    });
  }, [data, totalCount]);

  const gradientStops = segments
    .map((s) => `${s.color} ${s.start.toFixed(1)}% ${s.end.toFixed(1)}%`)
    .join(", ");

  const top4 = segments.slice(0, 4);
  const othersCount = segments.slice(4).reduce((sum, s) => sum + s.count, 0);

  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
        <h3 className="text-sm font-bold text-white mb-8">Status Distribution</h3>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <h3 className="text-sm font-bold text-white mb-8">Status Distribution</h3>

      <div className="flex-grow flex flex-col items-center justify-center relative min-h-[200px]">
        <div
          className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,218,243,0.15)]"
          style={{ background: `conic-gradient(${gradientStops})` }}
        >
          <div className="absolute inset-0 m-3 rounded-full bg-[#1a1c23] flex flex-col items-center justify-center">
            <span className="text-2xl font-headline font-black text-white leading-none">
              {totalCount.toLocaleString()}
            </span>
            <span className="text-[9px] font-black tracking-widest uppercase text-white/40 mt-1">
              TOTAL
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 mt-8">
        {top4.map((s) => (
          <div key={s.stage} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: s.color }} />
            <span className="text-[11px] font-bold text-white/70">
              {s.stage.charAt(0) + s.stage.slice(1).toLowerCase()}
            </span>
          </div>
        ))}
        {othersCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-white/10" />
            <span className="text-[11px] font-bold text-white/70">Others</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusDonutCard;
