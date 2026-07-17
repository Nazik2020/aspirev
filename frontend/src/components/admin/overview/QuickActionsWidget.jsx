import React from "react";
import { Link } from "react-router-dom";

const QuickActionsWidget = () => {
  return (
    <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-violet-500">
            bolt
          </span>
          Quick Actions
        </h3>
        <span className="material-symbols-outlined text-slate-400 text-sm">
          offline_bolt
        </span>
      </div>

      <div className="space-y-3 flex-grow flex flex-col justify-center">
        <Link
          to="/admin/roadmaps"
          className="w-full bg-gradient-to-br from-[#814df3] to-[#5d21df] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-[0_4px_15px_rgba(93,33,223,0.35)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between"
        >
          <span>Add New Roadmap</span>
          <span className="material-symbols-outlined text-sm">add</span>
        </Link>

        <Link
          to="/admin/users"
          className="w-full border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 bg-slate-50 dark:bg-[#16171d]/60 text-slate-800 dark:text-white py-3 px-4 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-[#16171d] transition-all flex items-center justify-between"
        >
          <span>Manage Users</span>
          <span className="material-symbols-outlined text-sm text-slate-500">
            group
          </span>
        </Link>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <Link
            to="/admin/applications"
            className="border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 py-2.5 rounded-xl text-[10px] font-bold text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all text-center"
          >
            Export User List
          </Link>
          <Link
            to="/admin/security"
            className="border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 py-2.5 rounded-xl text-[10px] font-bold text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all text-center"
          >
            Security Logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsWidget;
