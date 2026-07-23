import React from "react";

const skills = [
  "Python",
  "SQL",
  "Machine Learning",
  "Java",
  "Cloud Architecture",
];

const IdentifiedProfile = () => {
  return (
    <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
          <span className="material-symbols-outlined text-[18px]">
            fingerprint
          </span>
        </div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 dark:text-white/40">
          Identified Intelligence Profile
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Details & Skills Matrix */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block mb-1">
                Candidate Name
              </span>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Mohamed Nazik
              </p>
            </div>

            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-cyan-500 dark:text-cyan-400 font-bold block mb-1">
                Target Role Detected
              </span>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Senior Data Scientist
              </p>
            </div>

            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block mb-1">
                Education
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-white/90">
                BSc Computer Science
              </p>
            </div>

            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-bold block mb-1">
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
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-semibold text-slate-800 dark:text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: ATS Compatibility Box */}
        <div className="lg:col-span-5 bg-violet-950/20 dark:bg-violet-950/30 border border-violet-500/20 rounded-xl p-4.5 space-y-2.5 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-violet-400">
            <span className="material-symbols-outlined text-[16px]">
              verified_user
            </span>
            <span className="text-[0.65rem] uppercase tracking-wider font-extrabold">
              ATS Compatibility
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed font-medium">
            Profile alignment with target role is{" "}
            <span className="font-bold text-emerald-500 dark:text-emerald-400">
              Strong
            </span>
            . Recommendation: Emphasize MLOps experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentifiedProfile;
