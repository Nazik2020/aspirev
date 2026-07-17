import React from "react";

const STAGE_BADGE = {
  WISHLIST:   { text: "WISHLIST",   cls: "text-slate-400 bg-slate-400/10" },
  APPLIED:    { text: "APPLIED",    cls: "text-[#00daf3] bg-[#00daf3]/10" },
  ASSESSMENT: { text: "ASSESSMENT", cls: "text-[#c6a0ff] bg-[#c6a0ff]/10" },
  INTERVIEW:  { text: "INTERVIEW",  cls: "text-violet-400 bg-violet-500/20" },
  FINAL:      { text: "FINAL",      cls: "text-indigo-400 bg-indigo-500/20" },
  FINAL_INTERVIEW: { text: "FINAL", cls: "text-indigo-400 bg-indigo-500/20" },
  OFFER:      { text: "OFFER",      cls: "text-emerald-400 bg-emerald-500/20" },
  REJECTED:   { text: "REJECTED",   cls: "text-rose-400 bg-rose-500/20" },
};

const TopJobTitlesCard = ({ data, loading }) => {
  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full">
        <div className="px-6 py-5 border-b border-white/5">
          <h3 className="text-sm font-bold text-white">Most Common Job Titles</h3>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-3 border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
            <div>JOB TITLE</div>
            <div>TOTAL APPS</div>
            <div className="text-right">COMMON STAGE</div>
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-4 items-center">
              <div className="h-3 bg-white/10 rounded w-32 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-8 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-16 ml-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <h3 className="text-sm font-bold text-white">Most Common Job Titles</h3>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-3 border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
          <div>JOB TITLE</div>
          <div>TOTAL APPS</div>
          <div className="text-right">COMMON STAGE</div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {data.map((job, i) => {
            const badge = STAGE_BADGE[job.commonStage] || { text: job.commonStage, cls: "text-white/50 bg-white/5" };
            return (
              <div key={i} className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="text-[12px] font-bold text-white truncate pr-2">{job.role}</div>
                <div className="text-[12px] text-white/60">{job.totalApps}</div>
                <div className="text-right flex justify-end">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest whitespace-nowrap ${badge.cls}`}>
                    {badge.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopJobTitlesCard;
