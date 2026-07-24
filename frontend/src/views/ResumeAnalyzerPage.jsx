import React from "react";
import DocumentUploader from "../components/resume/DocumentUploader";
import ResumeScoreMeter from "../components/resume/ResumeScoreMeter";
import ContentBreakdown from "../components/resume/ContentBreakdown";
import IdentifiedProfile from "../components/resume/IdentifiedProfile";
import AIFeedbackReport from "../components/resume/AIFeedbackReport";
import SkillRadarChart from "../components/resume/SkillRadarChart";

const ResumeAnalyzerPage = () => {
  return (
    <div className="w-full space-y-8 pb-12">
      {/* ── Page Header & Current Session ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Resume{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400">
                Analyzer
              </span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[0.65rem] font-extrabold uppercase tracking-wider">
              v2.4 AI Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 font-medium max-w-md">
            Evaluate, benchmark, and optimize your resume for target roles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white dark:bg-[#1e1f23]/70 border border-slate-200 dark:border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm backdrop-blur-md">
            <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-black">
              Current Session
            </span>
            <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full text-cyan-600 dark:text-cyan-400 text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">
                description
              </span>
              <span>MOHAMED NAZIK.PDF</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main 12-Column Grid Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <DocumentUploader />
          <IdentifiedProfile />
          <SkillRadarChart />
        </div>

        {/* Right Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <ResumeScoreMeter />
          <ContentBreakdown />
          <AIFeedbackReport />
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
