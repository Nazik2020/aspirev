import React from "react";
import SecurityStatusBanner from "./components/SecurityStatusBanner";
import SecurityStatsCards   from "./components/SecurityStatsCards";
import FailedLoginTable     from "./components/FailedLoginTable";
import BlockedIPsList       from "./components/BlockedIPsList";
import ActiveSessionsList   from "./components/ActiveSessionsList";
import AdminActionsLog      from "./components/AdminActionsLog";

const AdminSecurityPage = () => {
  const handleDownloadReport = () => {
    // Future: trigger real download
    alert("Generating security report…");
  };

  return (
    <div className="space-y-6 min-h-full bg-[#0f1117] dark:bg-[#0f1117] -m-6 md:-m-8 p-6 md:p-8">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight">
            Security Center
          </h1>
          <p className="text-[13px] text-white/40 mt-1">
            Monitor threats, manage sessions, and protect your platform.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 text-white/70 hover:text-white text-[12px] font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span className="hidden sm:block">Download Security Report</span>
            <span className="sm:hidden">Report</span>
          </button>
          <button className="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/8 hover:bg-white/10 rounded-xl text-white/50 hover:text-white transition-all">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>

      {/* ── Status Banner ── */}
      <SecurityStatusBanner />

      {/* ── Stats Cards ── */}
      <SecurityStatsCards />

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <FailedLoginTable />
          <BlockedIPsList />
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ActiveSessionsList />
          <AdminActionsLog />
        </div>

      </div>
    </div>
  );
};

export default AdminSecurityPage;
