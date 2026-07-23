import React from "react";

const ResumeScoreMeter = () => {
  const score = 85;

  return (
    <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-7 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-600/15 blur-3xl rounded-full pointer-events-none"></div>

      {/* Circular Progress Gauge */}
      <div className="relative w-44 h-44 mb-5 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r="76"
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-200 dark:text-white/5"
            fill="transparent"
          />
          <circle
            cx="88"
            cy="88"
            r="76"
            stroke="url(#purpleGradient)"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 76}
            strokeDashoffset={2 * Math.PI * 76 * (1 - score / 100)}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
            {score}
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest text-slate-400 dark:text-white/40 font-bold mt-1">
            Score
          </span>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="space-y-1.5 mb-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Exceptional Performance
        </h3>
        <p className="text-xs text-slate-500 dark:text-white/50 max-w-xs leading-relaxed">
          You're in the top 15% of candidates for similar roles.
        </p>
      </div>

      {/* Indicator Bars */}
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
        <span className="w-6 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
        <span className="w-8 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-sm" />
        <span className="w-6 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  );
};

export default ResumeScoreMeter;
