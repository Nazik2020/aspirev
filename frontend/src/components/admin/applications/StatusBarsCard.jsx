import React from "react";

const STAGE_META = {
  WISHLIST:   { color: "bg-white/10",            label: "WISHLIST" },
  APPLIED:    { color: "bg-[#00daf3]",            label: "APPLIED" },
  ASSESSMENT: { color: "bg-[#c6a0ff]",            label: "ASSESSMENT" },
  INTERVIEW:  { color: "bg-violet-600",           label: "INTERVIEW" },
  FINAL:      { color: "bg-indigo-500",           label: "FINAL" },
  FINAL_INTERVIEW: { color: "bg-indigo-500",      label: "FINAL" },
  OFFER:      { color: "bg-emerald-400",          label: "OFFER" },
  REJECTED:   { color: "bg-rose-400/60",          label: "REJECTED" },
};

const StatusBarsCard = ({ data, loading }) => {
  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
        <h3 className="text-sm font-bold text-white mb-6">Applications by Status</h3>
        <div className="space-y-5 flex-grow flex flex-col justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2"><div className="h-2 bg-white/10 rounded w-16" /><div className="h-2 bg-white/10 rounded w-8" /></div>
              <div className="h-1.5 bg-white/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white">Applications by Status</h3>
        <span className="material-symbols-outlined text-[16px] text-white/30">info</span>
      </div>

      <div className="space-y-5 flex-grow justify-center flex flex-col">
        {data.map((item) => {
          const meta = STAGE_META[item.stage] || { color: "bg-white/10", label: item.stage };
          const pct = maxCount > 0 ? Math.round((item.count / maxCount) * 100) : 0;
          return (
            <div key={item.stage}>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                <span>{meta.label}</span>
                <span className="text-white">{item.count.toLocaleString()}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${meta.color} rounded-full transition-all duration-500`}
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

export default StatusBarsCard;
