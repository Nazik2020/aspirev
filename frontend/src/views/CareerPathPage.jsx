import React, { useState } from "react";
import RoadmapGrid from "../components/career/RoadmapGrid";

const CareerPathPage = () => {
  // #17 FIX: Notify Me was a dead button. Added state + feedback so it works.
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);

  const handleNotify = () => {
    if (!notifyEmail.trim() || !notifyEmail.includes("@")) return;
    setNotifySent(true);
    setNotifyEmail("");
    setTimeout(() => setNotifySent(false), 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* ── Page Header ── */}
      <div className="space-y-1">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-slate-900 dark:text-white/90 tracking-tight">
          Explore Career Roadmaps
        </h1>
        <p className="text-slate-500 dark:text-white/40 text-sm md:text-base max-w-xl leading-relaxed pt-1">
          Find your path. Learn what matters. Track your progress. Our curated,
          industry-standard roadmaps guide you through every essential skill for
          modern careers.
        </p>
      </div>

      {/* ── Roadmap Grid with Search + Filters ── */}
      <RoadmapGrid />

      {/* ── "Don't see your role?" CTA ── */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#1e1f23] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-700 dark:text-white/80">
            Don't see your target role?
          </h3>
          <p className="text-slate-500 dark:text-white/35 text-sm leading-relaxed max-w-sm">
            We're constantly adding new roadmaps. Subscribe to get notified when
            new career paths are released, or suggest a new one to our team.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          {notifySent ? (
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              You're on the list!
            </div>
          ) : (
            <>
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                placeholder="Enter your email"
                className="flex-1 md:w-56 bg-white dark:bg-[#14151a] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-sm
                                   text-slate-600 dark:text-white/70 placeholder:text-slate-400 dark:text-white/25 focus:outline-none focus:border-primary/40 transition-all"
              />
              <button
                onClick={handleNotify}
                className="shrink-0 px-5 py-3 sm:py-2.5 rounded-xl bg-gradient-to-br from-primary-container to-primary text-slate-900 dark:text-white text-sm font-bold
                                       hover:opacity-90 hover:scale-105 transition-all duration-200 whitespace-nowrap text-center"
              >
                Notify Me
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathPage;

