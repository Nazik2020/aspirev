import React from "react";

const GeneralSettings = () => {
  return (
    <section id="general" className="scroll-mt-24 space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-bold text-white tracking-tight">
          General Settings
        </h2>
        <p className="text-[12px] text-white/40 mt-1">Core platform configuration</p>
      </div>

      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              PLATFORM NAME
            </label>
            <input
              type="text"
              defaultValue="Aspirev"
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              TAGLINE
            </label>
            <input
              type="text"
              defaultValue="Conquer your career."
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              SUPPORT EMAIL
            </label>
            <input
              type="email"
              defaultValue="support@aspirev.com"
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              CONTACT URL
            </label>
            <input
              type="text"
              defaultValue="https://aspirev.com/contact"
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              TOS URL
            </label>
            <input
              type="text"
              defaultValue="https://aspirev.com/terms"
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">
              PRIVACY URL
            </label>
            <input
              type="text"
              defaultValue="https://aspirev.com/privacy"
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 flex items-center justify-between gap-4">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-red-400">warning</span>
            <div>
              <h4 className="text-[12px] font-black text-white tracking-widest uppercase">
                MAINTENANCE MODE
              </h4>
              <p className="text-[11px] text-white/40 mt-1">
                Warning: Activating this will block all non-admin users from accessing the platform immediately.
              </p>
            </div>
          </div>
          <button className="w-11 h-6 rounded-full bg-white/10 relative transition-colors shrink-0">
            <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"></span>
          </button>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[12px] font-bold shadow-[0_4px_15px_rgba(124,58,237,0.3)] transition-all">
            Save General Settings
          </button>
        </div>
      </div>
    </section>
  );
};

export default GeneralSettings;
