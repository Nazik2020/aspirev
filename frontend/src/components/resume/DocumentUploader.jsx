import React, { useState } from "react";

const DocumentUploader = () => {
  const [isJDToggleOn, setIsJDToggleOn] = useState(true);
  const [jdText, setJdText] = useState("");
  const activeFileName = "Mohamed Nazik.pdf";
  const [isDragging, setIsDragging] = useState(false);

  const samplePrompts = [
    "Senior Data Scientist role",
    "Focus on MLOps & Python",
    "Require AWS & Cloud Arch",
  ];

  return (
    <div className="space-y-6">
      {/* ── 1. Document Processing Card ── */}
      <div className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 dark:bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 dark:text-violet-400 shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[24px]">
                description
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  Document Processing
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[0.6rem] font-extrabold uppercase tracking-wider">
                  Analyzed
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-white/50 flex-wrap">
                <span>Current file:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                  {activeFileName}
                  <span className="material-symbols-outlined text-emerald-500 text-[14px]">
                    check_circle
                  </span>
                </span>
                <span className="text-slate-300 dark:text-white/20">•</span>
                <span className="text-[0.7rem] text-slate-400 dark:text-white/40">2.4 MB</span>
              </div>
            </div>
          </div>

          <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/15 border border-slate-700 dark:border-white/10 rounded-xl text-[0.7rem] uppercase tracking-widest font-extrabold text-white transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]">
            <input type="file" accept=".pdf,.docx" className="hidden" />
            <span className="material-symbols-outlined text-[16px]">upload</span>
            Select Document
          </label>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          className={`mt-5 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group relative overflow-hidden ${
            isDragging
              ? "border-violet-500 bg-violet-500/10 scale-[1.01]"
              : "border-slate-200 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-500/40 bg-slate-50/50 dark:bg-[#15161a]/60 hover:bg-slate-100/50 dark:hover:bg-[#18191e]/80"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-violet-500 dark:text-violet-400 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
            <span className="material-symbols-outlined text-[24px]">
              cloud_upload
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-white/80 font-bold mb-1">
            Drag & drop a new resume version to re-analyze
          </p>
          <p className="text-[0.7rem] text-slate-400 dark:text-white/40">
            Supports PDF, DOCX, TXT up to 10MB
          </p>
        </div>
      </div>

      {/* ── 2. ATS Strategy Optimization Card ── */}
      <div className="p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[20px]">
                tune
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                ATS Strategy Optimization
              </h3>
              <p className="text-xs text-slate-500 dark:text-white/40">
                Compare your resume directly against target job requirements
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer select-none bg-slate-100 dark:bg-white/5 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10"
            onClick={() => setIsJDToggleOn(!isJDToggleOn)}
          >
            <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-slate-600 dark:text-white/60">
              Compare With Job Description
            </span>
            <div
              className={`w-9 h-5 rounded-full relative transition-colors p-0.5 shrink-0 ${
                isJDToggleOn ? "bg-violet-600" : "bg-slate-300 dark:bg-white/20"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transition-all ${
                  isJDToggleOn ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>

        {isJDToggleOn && (
          <div className="space-y-3 pt-2">
            {/* Quick Prompt Suggestions */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[0.65rem] font-bold text-slate-400 dark:text-white/30 uppercase tracking-wider">
                Quick fill:
              </span>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    setJdText(
                      `Target Role: ${prompt}\nKey Responsibilities:\n- Lead scalable architecture\n- Optimize machine learning pipelines\n- Collaborate across DevOps and Product`
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-violet-500/10 border border-slate-200 dark:border-white/10 hover:border-violet-500/30 text-[0.7rem] text-slate-700 dark:text-white/70 hover:text-violet-500 dark:hover:text-violet-300 font-medium transition-all"
                >
                  + {prompt}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the target job description here to analyze alignment..."
                className="w-full bg-slate-50 dark:bg-[#141518] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none leading-relaxed font-mono"
              />
              <span className="absolute bottom-3 right-3 text-[0.65rem] text-slate-400 dark:text-white/30 font-mono">
                {jdText.length} chars
              </span>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-[0.75rem] uppercase tracking-wider font-extrabold shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span className="material-symbols-outlined text-[16px]">
                  auto_awesome
                </span>
                Optimize Alignment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
