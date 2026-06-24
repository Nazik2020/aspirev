import React from "react";

const UserProfileSidebar = ({ isOpen, onClose, user }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full lg:w-[400px] bg-slate-50 dark:bg-[#15171b] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-slate-200 dark:border-white/5 z-50 transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5 shrink-0">
        <h2 className="text-xl font-bold font-headline text-slate-800 dark:text-white">
          User Profile
        </h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Profile Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
        {/* Glow behind Avatar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="relative">
            {user?.imgUrl ? (
              <img
                src={user.imgUrl}
                alt=""
                className="w-20 h-20 rounded-full border-[3px] border-[#15171b] object-cover shadow-[0_0_0_2px_rgba(139,92,246,0.5)]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 text-white flex items-center justify-center font-headline font-bold text-3xl border-[3px] border-[#15171b] shadow-[0_0_0_2px_rgba(139,92,246,0.5)]">
                {user?.initials || "U"}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00daf3] rounded-full border-2 border-[#15171b]"></div>
          </div>
          <h3 className="text-xl font-bold font-headline text-slate-800 dark:text-white mt-4 tracking-tight">
            {user?.name || "Select User"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {user?.email || "-"}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <span className="bg-[#00daf3]/10 text-[#00daf3] border border-[#00daf3]/20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
              {user?.role === "PRO" ? "PRO ACCOUNT" : `${user?.role || "USER"} ACCOUNT`}
            </span>
            <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
              LEVEL 42
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/5 mb-6">
          {["OVERVIEW", "APPLICATIONS", "ROADMAP", "ACTIVITY"].map(
            (tab, idx) => (
              <button
                key={tab}
                className={`flex-1 pb-3 text-[10px] font-black tracking-widest uppercase transition-colors relative ${
                  idx === 0
                    ? "text-[#00daf3] border-b-2 border-[#00daf3]"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4">
            <div className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
              ACCOUNT ID
            </div>
            <div className="font-mono text-sm font-bold text-slate-800 dark:text-white">
              INV-98234-X
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4">
            <div className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
              JOINED DATE
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              {user?.joined || "-"}
            </div>
          </div>
        </div>

        {/* Active Roadmap Box */}
        <div className="mb-8">
          <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            ACTIVE ROADMAP
          </div>
          <div className="bg-gradient-to-br from-[#1a2332] to-[#121926] border border-[#00daf3]/20 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h4 className="text-[#00daf3] font-bold text-sm">
                Senior Cloud Architect
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                Step 4 of 12 (33% Complete)
              </p>
            </div>
            <span className="material-symbols-outlined text-[#00daf3] text-[24px]">
              account_tree
            </span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
            RECENT ACTIVITY
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[16px]">
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-800 dark:text-white font-medium leading-relaxed">
                  Completed "AWS Infrastructure" assessment.
                </p>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 block">
                  2 hours ago
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[16px]">
                  login
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-800 dark:text-white font-medium leading-relaxed">
                  Logged in from San Francisco, US.
                </p>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 block">
                  6 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#15171b] shrink-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button className="border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
            Suspend User
          </button>
          <button className="bg-[#00daf3] hover:bg-cyan-300 text-slate-900 py-3 rounded-xl text-xs font-black shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all">
            Send Notification
          </button>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors">
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Delete Account Permanently
        </button>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
