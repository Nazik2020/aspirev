import React, { useState } from "react";

const AdminDashboardPage = () => {
  const [healthChecking, setHealthChecking] = useState(false);
  const [healthStatus, setHealthStatus] = useState("all_good");

  const runHealthCheck = () => {
    setHealthChecking(true);
    setTimeout(() => {
      setHealthChecking(false);
      setHealthStatus("all_good");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-slate-800 dark:text-white mb-2 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-[14px] text-slate-500 dark:text-slate-400">
            Welcome back, Nazik. Here is your platform at a glance.
          </p>
        </div>

        {/* Global status state pill */}
        <div className="flex items-center gap-3 bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-2.5 shadow-sm w-fit self-start md:self-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest">
              ALL GOOD
            </span>
          </div>
          <span className="text-slate-300 dark:text-white/10">|</span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-white/40">
            Oct 24, 2024
          </span>
        </div>
      </div>

      {/* Metrics Row Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* TOTAL USERS */}
        <div className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm text-left relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            Total Users
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-headline font-black text-slate-800 dark:text-white">
              1,284
            </span>
          </div>
          <div className="text-[10px] font-bold text-violet-500 dark:text-violet-400 mt-2 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/10 w-fit">
            +12 today
          </div>
        </div>

        {/* ACTIVE NOW */}
        <div className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-[#00daf3]/20 dark:border-[#00daf3]/10 shadow-sm border-l-4 border-l-[#00daf3] text-left flex flex-col justify-between min-h-[110px]">
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            Active Now
          </div>
          <div className="text-2xl font-headline font-black text-slate-800 dark:text-white mt-2 flex items-center gap-2">
            38
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
          </div>
          <div className="text-[9px] font-black text-[#00daf3] uppercase tracking-widest mt-2 flex items-center gap-1.5 bg-[#00daf3]/10 px-2 py-0.5 rounded-md border border-[#00daf3]/10 w-fit">
            <span className="w-1 h-1 rounded-full bg-[#00daf3]"></span>
            LIVE
          </div>
        </div>

        {/* PRO SUBS */}
        <div className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm text-left flex flex-col justify-between min-h-[110px]">
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            Pro Subs
          </div>
          <div className="text-2xl font-headline font-black text-slate-800 dark:text-white mt-2">
            47
          </div>
          <div className="text-[10px] font-bold text-violet-500 dark:text-violet-400 mt-2 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/10 w-fit">
            +3 week
          </div>
        </div>

        {/* APPS */}
        <div className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm text-left flex flex-col justify-between min-h-[110px]">
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            Apps
          </div>
          <div className="text-2xl font-headline font-black text-slate-800 dark:text-white mt-2 flex items-center justify-between">
            6,492
            <span className="material-symbols-outlined text-slate-400 dark:text-white/20 text-lg">
              folder
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Registered links
          </div>
        </div>

        {/* ROADMAPS */}
        <div className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm text-left flex flex-col justify-between min-h-[110px]">
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            Roadmaps
          </div>
          <div className="text-2xl font-headline font-black text-slate-800 dark:text-white mt-2 flex items-center justify-between">
            312
            <span className="material-symbols-outlined text-slate-400 dark:text-white/20 text-lg">
              route
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Generated templates
          </div>
        </div>

        {/* MRR */}
        <div className="bg-white dark:bg-[#101216] p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm text-left flex flex-col justify-between min-h-[110px]">
          <div className="text-[10px] text-slate-500 dark:text-white/40 uppercase font-black tracking-widest">
            MRR
          </div>
          <div className="text-2xl font-headline font-black text-slate-800 dark:text-white mt-2 flex items-baseline gap-1">
            $376
            <span className="text-[10px] text-slate-500 dark:text-white/30 font-bold uppercase ml-1">
              USD
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Current subscription
          </div>
        </div>
      </div>

      {/* Charts & signups Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: User Growth Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-base font-bold text-slate-800 dark:text-white">
                User Growth
              </h3>
              <p className="text-xs text-slate-500 dark:text-white/40 mt-1">
                Total Users vs Pro Conversions (30D)
              </p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
                <span className="text-slate-600 dark:text-slate-400">TOTAL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span className="text-slate-600 dark:text-slate-400">PRO</span>
              </div>
            </div>
          </div>

          {/* SVG Graph Grid Layout */}
          <div className="relative flex-1 min-h-[220px] w-full mt-4">
            {/* Subtle horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
              <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
              <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
              <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
            </div>

            {/* Custom Interactive SVG Graph Drawing */}
            <svg
              className="w-full h-full min-h-[200px]"
              viewBox="0 0 700 200"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#814df3" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#814df3" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="proGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area Fills */}
              <path
                d="M 10 170 Q 180 140, 350 70 T 690 60 L 690 200 L 10 200 Z"
                fill="url(#totalGrad)"
              />
              <path
                d="M 10 190 Q 180 180, 350 175 T 690 145 L 690 200 L 10 200 Z"
                fill="url(#proGrad)"
              />

              {/* Line 1 (TOTAL) - purple brand curve */}
              <path
                d="M 10 170 Q 180 140, 350 70 T 690 60"
                fill="none"
                stroke="#ab8ff4"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Line 2 (PRO) - cyan dotted curve */}
              <path
                d="M 10 190 Q 180 180, 350 175 T 690 145"
                fill="none"
                stroke="#00daf3"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Grid dot triggers */}
              <circle cx="330" cy="78" r="5" fill="#ab8ff4" />
              <circle cx="330" cy="176" r="4" fill="#00daf3" />
            </svg>

            {/* Custom hovering Tooltip */}
            <div className="absolute top-[35px] left-[40%] -translate-x-1/2 bg-slate-900/95 dark:bg-[#17181c]/95 border border-slate-800 dark:border-white/10 rounded-2xl p-3 shadow-2xl text-left pointer-events-none z-10 scale-95 md:scale-100">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                Oct 18
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">1,142 Users</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  +8%
                </span>
              </div>
            </div>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between items-center px-2 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Sep 24</span>
            <span>Oct 04</span>
            <span>Oct 14</span>
            <span>Today</span>
          </div>
        </div>

        {/* Right Column: Recent Signups */}
        <div className="lg:col-span-4 bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-base font-bold text-slate-800 dark:text-white">
              Recent Signups
            </h3>
            <button className="text-xs font-bold text-violet-500 hover:text-violet-600 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors uppercase tracking-wider">
              View All
            </button>
          </div>

          {/* User Signups list */}
          <div className="space-y-4 flex-grow">
            {[
              {
                initials: "AS",
                name: "Alex Sterling",
                email: "alex.s@gmail.com",
                type: "PRO",
                time: "4m ago",
                color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
              },
              {
                initials: "MK",
                name: "Maya Kincaid",
                email: "maya.k@invikt.io",
                type: "FREE",
                time: "18m ago",
                color: "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400",
              },
              {
                initials: "JL",
                name: "Jordan Li",
                email: "jordan@li.com",
                type: null,
                time: "1h ago",
                color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
              },
              {
                initials: "BW",
                name: "Beth Wells",
                email: "b.wells@corp.io",
                type: null,
                time: "2h ago",
                color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
              },
              {
                initials: "RT",
                name: "Ron Tyson",
                email: "rt99@mail.com",
                type: null,
                time: "5h ago",
                color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
              },
            ].map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${user.color} flex items-center justify-center font-bold text-xs shrink-0`}
                  >
                    {user.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {user.type && (
                    <span
                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase ${
                        user.type === "PRO"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/30"
                      }`}
                    >
                      {user.type}
                    </span>
                  )}
                  <div className="text-[9px] text-slate-400 mt-1">{user.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom widgets section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1: System Health */}
        <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-violet-500">
                dns
              </span>
              System Health
            </h3>
            <span className="material-symbols-outlined text-slate-400 text-sm">
              settings_ethernet
            </span>
          </div>

          {/* Health list */}
          <div className="space-y-4">
            {[
              { label: "API Gateway", status: "ok" },
              { label: "Database", status: "ok" },
              { label: "Email (SMTP)", status: "ok" },
              { label: "Redis Cache", status: "ok" },
            ].map((node, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-white/5"
              >
                <span className="text-xs font-semibold text-slate-700 dark:text-white/80">
                  {node.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-cyan-500 tracking-wider">
                    ONLINE
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={runHealthCheck}
            disabled={healthChecking}
            className="w-full mt-6 py-2.5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span
              className={`material-symbols-outlined text-[14px] ${
                healthChecking ? "animate-spin" : ""
              }`}
            >
              sync
            </span>
            {healthChecking ? "Checking..." : "Run Health Check"}
          </button>
        </div>

        {/* Widget 2: Feature Usage */}
        <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-cyan-400">
                bar_chart
              </span>
              Feature Usage
            </h3>
            <span className="material-symbols-outlined text-slate-400 text-sm">
              monitoring
            </span>
          </div>

          {/* Usage bars */}
          <div className="space-y-4">
            {[
              {
                name: "Roadmaps",
                pct: "82%",
                width: "w-[82%]",
                color: "bg-gradient-to-r from-cyan-500 to-cyan-300",
              },
              {
                name: "Job Tracker",
                pct: "64%",
                width: "w-[64%]",
                color: "bg-gradient-to-r from-violet-500 to-violet-300",
              },
              {
                name: "Intelligence Canvas",
                pct: "41%",
                width: "w-[41%]",
                color: "bg-gradient-to-r from-[#ab8ff4] to-violet-400",
              },
              {
                name: "Skill Matrix",
                pct: "19%",
                width: "w-[19%]",
                color: "bg-gradient-to-r from-slate-400 to-slate-300 dark:from-white/20 dark:to-white/10",
              },
            ].map((feat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">
                  <span>{feat.name}</span>
                  <span className="text-slate-800 dark:text-white">{feat.pct}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${feat.color} ${feat.width} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Quick Actions */}
        <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-violet-500">
                bolt
              </span>
              Quick Actions
            </h3>
            <span className="material-symbols-outlined text-slate-400 text-sm">
              offline_bolt
            </span>
          </div>

          <div className="space-y-3 flex-grow flex flex-col justify-center">
            {/* Primary Brand Action Button */}
            <button className="w-full bg-gradient-to-br from-[#814df3] to-[#5d21df] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-[0_4px_15px_rgba(93,33,223,0.35)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between">
              <span>Add New Roadmap</span>
              <span className="material-symbols-outlined text-sm">add</span>
            </button>

            {/* Megaphone bordered Action Button */}
            <button className="w-full border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 bg-slate-50 dark:bg-[#16171d]/60 text-slate-800 dark:text-white py-3 px-4 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-[#16171d] transition-all flex items-center justify-between">
              <span>Send Announcement</span>
              <span className="material-symbols-outlined text-sm text-slate-500">
                campaign
              </span>
            </button>

            {/* Bottom mini actions grid */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button className="border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 py-2.5 rounded-xl text-[10px] font-bold text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all text-center">
                Export User List
              </button>
              <button className="border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 py-2.5 rounded-xl text-[10px] font-bold text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all text-center">
                Security Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
