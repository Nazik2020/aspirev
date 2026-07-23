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
      {/* Header & Session Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Resume{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400">
              Analyzer
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 mt-1 font-medium max-w-md">
            Evaluate and optimize your resume for your target roles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#131417]/80 dark:bg-[#131417]/90 border border-slate-200 dark:border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm">
            <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 dark:text-white/30 font-black">
              Current Session
            </span>
            <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full text-cyan-500 dark:text-cyan-400 text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">
                description
              </span>
              <span>MOHAMED NAZIK.PDF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <DocumentUploader />
          <IdentifiedProfile />
          <SkillRadarChart />
        </div>

        {/* Right Column (4 cols) */}
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
