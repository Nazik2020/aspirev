import React from "react";
import { Link } from "react-router-dom";

const SKELETON_COUNT = 5;

const RecentSignups = ({ signups, loading }) => {
  if (loading || !signups || signups.length === 0) {
    return (
      <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 bg-white/10 rounded w-28 animate-pulse" />
        </div>
        <div className="space-y-4 flex-grow">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
              <div className="flex-1">
                <div className="h-3 bg-white/10 rounded w-24 animate-pulse" />
                <div className="h-2 bg-white/5 rounded w-32 mt-1 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-base font-bold text-slate-800 dark:text-white">
          Recent Signups
        </h3>
        <Link
          to="/admin/users"
          className="text-xs font-bold text-violet-500 hover:text-violet-600 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors uppercase tracking-wider"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4 flex-grow">
        {signups.map((user, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-full ${user.avatarColor} flex items-center justify-center font-bold text-xs shrink-0`}
              >
                {user.initials}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 ml-3">
              <div className="text-[9px] text-slate-400">{user.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSignups;
