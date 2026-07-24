import React from "react";
import Link from "next/link";

const AIFeedbackReport = () => {
  return (
    <div className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all space-y-6 flex flex-col justify-between">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-white/40">
              AI Intelligence Report
            </h3>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              Personalized career insights
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 dark:text-violet-400">
            <span className="material-symbols-outlined text-[18px]">
              auto_awesome
            </span>
          </div>
        </div>

        <div className="space-y-3.5">
          {/* Core Strengths */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141518]/80 border border-slate-200 dark:border-white/5 space-y-1.5 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0" />
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-cyan-600 dark:text-cyan-400">
                Core Strengths
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed font-medium pl-4">
              Exceptional proficiency in{" "}
              <span className="font-black text-slate-900 dark:text-white">
                Coding
              </span>{" "}
              architecture and systematic{" "}
              <span className="font-black text-slate-900 dark:text-white">
                Data Handling
              </span>
              .
            </p>
          </div>

          {/* Growth Gaps */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141518]/80 border border-slate-200 dark:border-white/5 space-y-1.5 hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] shrink-0" />
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400">
                Growth Gaps
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed font-medium pl-4">
              Limited exposure to{" "}
              <span className="font-black text-slate-900 dark:text-white">
                Deep Learning
              </span>{" "}
              neural network deployments at scale.
            </p>
          </div>

          {/* Strategic Suggestion */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141518]/80 border border-slate-200 dark:border-white/5 space-y-1.5 hover:border-violet-500/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)] shrink-0" />
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-violet-600 dark:text-violet-400">
                Strategic Suggestion
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed font-medium pl-4">
              Prioritize learning{" "}
              <span className="font-black text-slate-900 dark:text-white">
                TensorFlow
              </span>{" "}
              to bridge the gap into advanced AI research roles.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/career-path"
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-[0.7rem] uppercase tracking-widest font-extrabold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/35 transition-all group"
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
