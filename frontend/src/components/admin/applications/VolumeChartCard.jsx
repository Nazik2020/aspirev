import React from "react";

const VolumeChartCard = ({ data, loading }) => {
  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-bold text-white">Application Volume Over Time</h3>
        </div>
        <div className="flex-grow flex items-end justify-between gap-2 min-h-[200px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 h-full justify-end flex flex-col">
              <div className="w-full max-w-[24px] rounded-t-lg bg-white/5 animate-pulse mx-auto" style={{ height: `${20 + (i * 5) % 60}%` }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const maxCountIdx = data.findIndex((d) => d.count === maxCount);

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-white">Application Volume Over Time</h3>
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-1 text-[9px] font-bold text-white/50 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6a0ff]" />
          NEW APPS
        </div>
      </div>

      <div className="flex-grow flex items-end justify-between gap-2 min-h-[200px] relative">
        {data.map((bar, i) => {
          const pct = maxCount > 0 ? (bar.count / maxCount) * 100 : 0;
          const isPeak = i === maxCountIdx;
          return (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
              <div
                className={`w-full max-w-[24px] rounded-t-lg transition-all duration-300 ${
                  isPeak
                    ? "bg-[#c6a0ff] shadow-[0_0_20px_rgba(198,160,255,0.4)]"
                    : "bg-white/10 group-hover:bg-white/20"
                }`}
                style={{ height: `${Math.max(pct, 4)}%` }}
              />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-white font-bold mt-1">
                {bar.count}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-4 text-[9px] font-black text-white/30 uppercase tracking-widest px-1 overflow-hidden">
        {data.length <= 7
          ? data.map((d, i) => (
              <span key={i} className={i === maxCountIdx ? "text-[#c6a0ff]" : ""}>
                {d.label}
              </span>
            ))
          : [0, Math.floor(data.length * 0.25), Math.floor(data.length * 0.5), maxCountIdx, data.length - 1]
              .filter((v, i, a) => a.indexOf(v) === i)
              .sort((a, b) => a - b)
              .map((idx) => (
                <span key={idx} className={idx === maxCountIdx ? "text-[#c6a0ff]" : ""}>
                  {data[idx].label}
                </span>
              ))}
      </div>
    </div>
  );
};

export default VolumeChartCard;
