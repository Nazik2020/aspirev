import React from "react";
import Link from "next/link";

const AIFeedbackReport = () => {
  return (
    <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none"></div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-white/40">
            AI Intelligence Report
          </h3>
          <span className="material-symbols-outlined text-violet-400 text-[20px]">
            auto_awesome
          </span>
        </div>

        <div className="space-y-5">
          {/* Core Strengths */}
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] mt-1 shrink-0" />
            <div className="space-y-1">
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-cyan-500 dark:text-cyan-400 block">
                Core Strengths
              </span>
              <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Exceptional proficiency in{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  Coding
                </span>{" "}
                architecture and systematic{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  Data Handling
                </span>
                .
              </p>
            </div>
          </div>

          {/* Growth Gaps */}
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] mt-1 shrink-0" />
            <div className="space-y-1">
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-amber-500 dark:text-amber-400 block">
                Growth Gaps
              </span>
              <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Limited exposure to{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  Deep Learning
                </span>{" "}
                neural network deployments at scale.
              </p>
            </div>
          </div>

          {/* Strategic Suggestion */}
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)] mt-1 shrink-0" />
            <div className="space-y-1">
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-violet-500 dark:text-violet-400 block">
                Strategic Suggestion
              </span>
              <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                Prioritize learning{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  TensorFlow
                </span>{" "}
                to bridge the gap into advanced AI research roles.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Link
          href="/career-path"
          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 rounded-xl text-[0.7rem] uppercase tracking-widest font-extrabold text-slate-800 dark:text-white transition-all group"
        >
          <span>Generate Full Roadmap</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AIFeedbackReport;
