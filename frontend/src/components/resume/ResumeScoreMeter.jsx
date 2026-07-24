import React from "react";

const ResumeScoreMeter = () => {
  const score = 85;

  return (
    <div className="p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-xl transition-all">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-violet-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Top Status Pill */}
      <div className="mb-4">
        <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[0.65rem] font-black uppercase tracking-widest">
          Overall Resume Score
        </span>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-100 dark:text-white/5"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="url(#scorePurpleGradient)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - score / 100)}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="scorePurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
            {score}
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest text-slate-400 dark:text-white/40 font-black mt-1">
            SCORE
          </span>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="space-y-1.5 mb-5">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Exceptional Performance
        </h3>
        <p className="text-xs text-slate-500 dark:text-white/50 max-w-xs leading-relaxed font-medium">
          You're in the top <span className="font-extrabold text-cyan-600 dark:text-cyan-400">15%</span> of candidates for similar Senior Data Scientist roles.
        </p>
      </div>

      {/* Mini Performance Indicators */}
      <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-slate-200 dark:border-white/5">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/5 text-center">
          <span className="text-[0.55rem] font-bold text-slate-400 dark:text-white/30 uppercase block">Impact Factor</span>
          <span className="text-xs font-black text-slate-900 dark:text-white">9.2 / 10</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/5 text-center">
          <span className="text-[0.55rem] font-bold text-slate-400 dark:text-white/30 uppercase block">ATS Standard</span>
          <span className="text-xs font-black text-emerald-500">Passed</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreMeter;
