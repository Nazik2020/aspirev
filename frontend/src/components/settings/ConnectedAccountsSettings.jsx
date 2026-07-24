import React, { useState } from "react";

const ConnectedAccountsSettings = () => {
  return (
    <div className="pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Connected Accounts
        </h1>
        <p className="text-[15px] text-slate-600 dark:text-white/60">
          Link external accounts to enhance your Aspirev experience.
        </p>
      </div>

      {/* Social & Professional Accounts */}
      <div className="mb-12">
        <div className="text-[10px] font-bold text-slate-900 dark:text-[#ab8ff4] uppercase tracking-widest mb-6">
          Social & Professional Accounts
        </div>

        <div className="flex flex-col gap-4">
          {/* Google */}
          <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-3xl p-4 md:pr-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-600 dark:text-white/70">
                  account_circle
                </span>
              </div>
              <div>
                <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-0.5">
                  Google
                </div>
                <div className="text-[12px] text-slate-500 dark:text-white/50">
                  Used for sign in and syncing your profile.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 self-start md:self-auto ml-16 md:ml-0">
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                Connected
              </div>
              <button className="border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-[11px] font-bold px-5 py-2.5 rounded-full transition-colors">
                Disconnect
              </button>
            </div>
          </div>

          {/* GitHub */}
          <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-3xl p-4 md:pr-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-600 dark:text-white/70">
                  code
                </span>
              </div>
              <div>
                <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-0.5">
                  GitHub
                </div>
                <div className="text-[12px] text-slate-500 dark:text-white/50">
                  Showcase your projects and repositories.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 self-start md:self-auto ml-16 md:ml-0">
              <div className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                Not Connected
              </div>
              <button className="border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-[11px] font-bold px-5 py-2.5 rounded-full transition-colors">
                Connect
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-3xl p-4 md:pr-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-600 dark:text-white/70">
                  work
                </span>
              </div>
              <div>
                <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-0.5">
                  LinkedIn
                </div>
                <div className="text-[12px] text-slate-500 dark:text-white/50">
                  Import your work experience automatically.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 self-start md:self-auto ml-16 md:ml-0">
              <div className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                Not Connected
              </div>
              <button className="border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-[11px] font-bold px-5 py-2.5 rounded-full transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Import Your Data */}
      <div className="mb-12">
        <div className="text-[10px] font-bold text-slate-900 dark:text-[#00daf3] uppercase tracking-widest mb-6">
          Import Your Data
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LinkedIn Auto-Sync */}
          <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col">
            <span className="material-symbols-outlined text-slate-900 dark:text-[#00daf3] text-[24px] mb-6">
              sync_alt
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              LinkedIn Auto-Sync
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-white/50 mb-10 leading-relaxed flex-1">
              Automatically import your work experience, education, and skills
              from LinkedIn to keep your Aspirev profile current.
            </p>

            <div className="flex flex-col gap-3">
              <button className="w-full border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-[12px] font-bold py-3.5 rounded-full transition-colors">
                Import from LinkedIn
              </button>
              <div className="text-[9px] italic text-slate-400 dark:text-white/30 text-center uppercase tracking-widest">
                Requires LinkedIn connection above
              </div>
            </div>
          </div>

          {/* Resume Parsing */}
          <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col relative">
            <div className="absolute top-8 right-8 bg-slate-50 dark:bg-[#ab8ff4]/10 text-slate-900 dark:text-[#ab8ff4] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Recommended
            </div>
            <span className="material-symbols-outlined text-slate-900 dark:text-[#ab8ff4] text-[24px] mb-6">
              upload_file
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Resume Parsing
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-white/50 mb-6 leading-relaxed">
              Upload your existing resume to auto-fill your profile and detect
              your current skills using our AI engine.
            </p>

            <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center mb-6 bg-white/[0.02]">
              <span className="material-symbols-outlined text-slate-500 dark:text-white/40 text-[24px] mb-2">
                cloud_upload
              </span>
              <div className="text-[12px] font-bold text-slate-900 dark:text-white mb-1">
                Drop your resume here or click to browse
              </div>
              <div className="text-[10px] text-slate-400 dark:text-white/30">
                PDF or DOCX — Max 5MB
              </div>
            </div>

            <button className="w-full bg-white dark:bg-[#ab8ff4] hover:bg-white dark:bg-[#bda5f7] text-slate-900 dark:text-white text-[12px] font-bold py-3.5 rounded-full transition-colors shadow-[0_10px_20px_rgba(171,143,244,0.2)] mt-auto">
              Upload Resume
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-t border-slate-200 dark:border-white/5 pt-10">
        <div className="bg-orange-500/5 border border-orange-500/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-orange-400 text-[18px]">
                warning
              </span>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                Account Connections
              </div>
            </div>
            <p className="text-[13px] text-slate-500 dark:text-white/50 max-w-xl leading-relaxed">
              Disconnecting an account will not delete your Aspirev data, but
              will disable live synchronization.
            </p>
          </div>
          <button className="shrink-0 border border-orange-500/20 hover:bg-orange-500/10 text-orange-400 text-[11px] font-bold px-6 py-3 rounded-full transition-colors">
            Revoke All Connections
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccountsSettings;
