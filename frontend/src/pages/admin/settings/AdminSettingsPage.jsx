import React, { useState } from "react";

const AdminSettingsPage = () => {
  const [name, setName] = useState("Nazik Al-Fayed");
  const [email, setEmail] = useState("nazik@skilio.ai");
  const [role] = useState("Lead Administrator");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-slate-800 dark:text-white mb-2 tracking-tight">
          Admin Settings
        </h1>
        <p className="text-[14px] text-slate-500 dark:text-slate-400">
          Update profile settings and configuration keys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Settings Form */}
        <div className="lg:col-span-2 bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white mb-6">
            Administrator Profile
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/40">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#1c1d22]/50 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/40">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#1c1d22]/50 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/40">
                Security Role (Read Only)
              </label>
              <input
                type="text"
                value={role}
                disabled
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/30 rounded-xl px-4 py-2.5 text-xs cursor-not-allowed"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                Save Profile
              </button>
              {isSaved && (
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  Changes saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Info Box */}
        <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white mb-4">
            Internal Config
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            This administration portal manages core content assets of Skilio AI. Be careful when updating roadmaps, suspending members, or changing health metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
