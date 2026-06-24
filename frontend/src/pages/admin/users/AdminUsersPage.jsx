import React, { useState } from "react";
import UsersTable from "./components/UsersTable";
import UserProfileSidebar from "./components/UserProfileSidebar";

const AdminUsersPage = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setTimeout(() => setSelectedUser(null), 300); // clear after slide out
  };

  return (
    <div className="relative w-full h-full">
      <div className={`transition-all duration-300 ${isProfileOpen ? "pr-0 lg:pr-[400px]" : ""}`}>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-headline text-slate-800 dark:text-white mb-1.5 tracking-tight">
                User Management
              </h1>
              <p className="text-[13px] text-slate-500 dark:text-slate-400">
                Manage and monitor all 1,284 registered Invikt users across platforms.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-[13px] font-semibold transition-all">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#814df3] to-[#5d21df] hover:opacity-90 text-white text-[13px] font-semibold transition-all shadow-[0_4px_12px_rgba(93,33,223,0.3)]">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Admin
              </button>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* TOTAL USERS */}
            <div className="bg-white dark:bg-[#15171b] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">group</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-1">
                  TOTAL USERS
                </div>
                <div className="text-2xl font-headline font-black text-slate-800 dark:text-white">
                  1,284
                </div>
              </div>
            </div>

            {/* PRO USERS */}
            <div className="bg-white dark:bg-[#15171b] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400">workspace_premium</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-1">
                  PRO USERS
                </div>
                <div className="text-2xl font-headline font-black text-slate-800 dark:text-white">
                  47
                </div>
              </div>
            </div>

            {/* FREE USERS */}
            <div className="bg-white dark:bg-[#15171b] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">person</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-1">
                  FREE USERS
                </div>
                <div className="text-2xl font-headline font-black text-slate-800 dark:text-white">
                  1,237
                </div>
              </div>
            </div>

            {/* SUSPENDED */}
            <div className="bg-white dark:bg-[#15171b] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400">block</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-1">
                  SUSPENDED
                </div>
                <div className="text-2xl font-headline font-black text-slate-800 dark:text-white">
                  12
                </div>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white dark:bg-[#15171b] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm flex flex-col">
            <UsersTable onRowClick={handleRowClick} />
          </div>
        </div>
      </div>

      {/* Slide-out User Profile Sidebar */}
      <UserProfileSidebar
        isOpen={isProfileOpen}
        onClose={closeProfile}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminUsersPage;
