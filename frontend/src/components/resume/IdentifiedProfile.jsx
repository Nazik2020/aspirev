import React from "react";

const skills = [
  { name: "Python", category: "Core" },
  { name: "SQL", category: "Data" },
  { name: "Machine Learning", category: "AI/ML" },
  { name: "Java", category: "Backend" },
  { name: "Cloud Architecture", category: "DevOps" },
];

const IdentifiedProfile = () => {
  return (
    <div className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all space-y-6">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[20px]">
              fingerprint
            </span>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-white/40">
              Identified Intelligence Profile
            </h3>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Parsed candidate & skill attributes
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full text-[0.65rem] font-black uppercase tracking-wider">
          Verified Parsing
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Metadata & Skill Matrix */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-[#15161a]/60 border border-slate-200 dark:border-white/5 rounded-xl p-3.5 space-y-1">
              <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block">
                Candidate Name
              </span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-violet-600 text-white font-black text-[10px] flex items-center justify-center">
                  MN
                </div>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  Mohamed Nazik
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#15161a]/60 border border-slate-200 dark:border-white/5 rounded-xl p-3.5 space-y-1">
              <span className="text-[0.6rem] uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold block">
                Target Role Detected
              </span>
              <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                Senior Data Scientist
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#15161a]/60 border border-slate-200 dark:border-white/5 rounded-xl p-3.5 space-y-1">
              <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block">
                Education
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-white/90">
                BSc Computer Science
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#15161a]/60 border border-slate-200 dark:border-white/5 rounded-xl p-3.5 space-y-1">
              <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block">
                Experience Level
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-white/90">
                Mid-Senior (4.5 Years)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block">
              Detected Skill Matrix
            </span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-[#15161a] border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white/90 hover:border-violet-500/40 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: ATS Compatibility Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-cyan-500/10 border border-violet-500/20 rounded-xl p-5 space-y-3 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
              <span className="text-[0.65rem] uppercase tracking-wider font-black">
                ATS Compatibility
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[0.65rem] font-black uppercase">
              Strong Match
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              92% Alignment
            </div>
            <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed font-medium">
              Profile strongly matches target job description. Recommending slight emphasis on MLOps & model deployment.
            </p>
          </div>

          <div className="pt-2 border-t border-violet-500/15 flex items-center justify-between text-[0.65rem] text-slate-400 dark:text-white/40">
            <span>Parsing Confidence: 99.4%</span>
            <span className="text-violet-500 dark:text-violet-400 font-bold">Passed 14 ATS Checks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentifiedProfile;
