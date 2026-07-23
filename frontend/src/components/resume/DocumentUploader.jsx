import React, { useState } from "react";

const DocumentUploader = () => {
  const [isJDToggleOn, setIsJDToggleOn] = useState(true);
  const [jdText, setJdText] = useState("");
  const [activeFileName, setActiveFileName] = useState("Mohamed Nazik.pdf");

  return (
    <div className="space-y-6">
      {/* 1. Document Processing Card */}
      <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
              <span className="material-symbols-outlined text-[20px]">
                note_add
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Document Processing
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 dark:text-white/50">
                <span>Current file:</span>
                <span className="font-semibold text-cyan-500 dark:text-cyan-400">
                  {activeFileName}
                </span>
                <span className="material-symbols-outlined text-emerald-400 text-[14px]">
                  check_circle
                </span>
              </div>
            </div>
          </div>

          <label className="inline-flex items-center justify-center px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 rounded-xl text-[0.7rem] uppercase tracking-widest font-extrabold text-slate-800 dark:text-white transition-all cursor-pointer">
            <input type="file" accept=".pdf,.docx" className="hidden" />
            Select Document
          </label>
        </div>

        {/* Drag & Drop Area */}
        <div className="border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-500/40 bg-slate-50/50 dark:bg-[#18191d]/50 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">
              cloud_upload
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-white/40 font-medium">
            Drag and drop a new version to re-analyze
          </p>
        </div>
      </div>

      {/* 2. ATS Strategy Optimization Card */}
      <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <span className="material-symbols-outlined text-[18px]">
                tune
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                ATS Strategy Optimization
              </h3>
            </div>
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setIsJDToggleOn(!isJDToggleOn)}
          >
            <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/40">
              Compare With Job Description
            </span>
            <div
              className={`w-10 h-5 rounded-full relative transition-colors p-0.5 shrink-0 ${
                isJDToggleOn ? "bg-violet-600" : "bg-slate-300 dark:bg-white/10"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow transition-all ${
                  isJDToggleOn ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>

        {isJDToggleOn && (
          <div className="space-y-3 pt-2">
            <textarea
              rows={4}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the target job description here to analyze alignment..."
              className="w-full bg-slate-50 dark:bg-[#18191d] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-none leading-relaxed"
            />
            <div className="flex justify-end">
              <button className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-[0.7rem] uppercase tracking-wider font-extrabold shadow-lg shadow-violet-600/20 transition-all">
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
