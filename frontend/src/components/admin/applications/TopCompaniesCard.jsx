import React from "react";

const COMPANY_ICONS = {
  google: "cloud",
  meta: "devices",
  amazon: "shopping_cart",
  microsoft: "laptop_mac",
  apple: "phone_iphone",
  netflix: "movie",
  spotify: "music_note",
  airbnb: "apartment",
  stripe: "payments",
  openai: "smart_toy",
};

function getIcon(name) {
  const lower = (name || "").toLowerCase();
  for (const [key, icon] of Object.entries(COMPANY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "business";
}

const TopCompaniesCard = ({ data, loading }) => {
  if (loading || !data || data.length === 0) {
    return (
      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full">
        <div className="px-6 py-5 border-b border-white/5">
          <h3 className="text-sm font-bold text-white">Top Companies Applied To</h3>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-3 border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
            <div>COMPANY</div>
            <div>TOTAL APPS</div>
            <div className="text-right">OFFER RATE</div>
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
                <div className="h-3 bg-white/10 rounded w-24 animate-pulse" />
              </div>
              <div className="h-3 bg-white/10 rounded w-8 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-8 ml-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <h3 className="text-sm font-bold text-white">Top Companies Applied To</h3>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-3 border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
          <div>COMPANY</div>
          <div>TOTAL APPS</div>
          <div className="text-right">OFFER RATE</div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {data.map((comp, i) => (
            <div key={i} className="grid grid-cols-[2fr,1fr,1fr] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-white/40">
                    {getIcon(comp.company)}
                  </span>
                </div>
                <div className="text-[12px] font-bold text-white truncate">{comp.company}</div>
              </div>
              <div className="text-[12px] text-white/60">{comp.totalApps}</div>
              <div className="text-right text-[12px] font-bold text-[#00daf3]">{comp.offerRate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompaniesCard;
