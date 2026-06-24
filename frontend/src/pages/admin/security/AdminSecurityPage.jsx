import React from "react";

const AdminSecurityPage = () => {
  const auditLogs = [
    {
      id: "log1",
      event: "User Login Success",
      details: "Admin Nazik Al-Fayed (nazik@skilio.ai) logged in successfully.",
      ip: "192.168.1.45",
      time: "2 mins ago",
      type: "info",
    },
    {
      id: "log2",
      event: "Roadmap Published",
      details: "Template 'System Architecture' was updated and published.",
      ip: "192.168.1.45",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: "log3",
      event: "Subscription Upgraded",
      details: "User Alex Sterling promoted to PRO subscription plan.",
      ip: "10.0.4.12",
      time: "4 hours ago",
      type: "success",
    },
    {
      id: "log4",
      event: "Blocked Login Attempt",
      details: "Suspended user Ron Tyson (rt99@mail.com) tried login. Request rejected.",
      ip: "45.12.89.200",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: "log5",
      event: "API Key Generated",
      details: "Internal API Gateway system token regenerated.",
      ip: "127.0.0.1",
      time: "3 days ago",
      type: "danger",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-slate-800 dark:text-white mb-2 tracking-tight">
          Security & Audit Logs
        </h1>
        <p className="text-[14px] text-slate-500 dark:text-slate-400">
          Monitor system actions, security exceptions, and configuration change history.
        </p>
      </div>

      {/* Audit Log Box */}
      <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white mb-6">
          Recent System Events
        </h3>

        <div className="space-y-6">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-all"
            >
              <div className="shrink-0 mt-0.5">
                <span
                  className={`material-symbols-outlined text-lg ${
                    log.type === "success"
                      ? "text-emerald-500"
                      : log.type === "warning"
                      ? "text-amber-500"
                      : log.type === "danger"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {log.type === "warning" || log.type === "danger"
                    ? "warning"
                    : "info"}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    {log.event}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {log.time}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {log.details}
                </p>
                <div className="text-[9px] text-slate-400 dark:text-white/20 font-mono mt-1">
                  IP Address: {log.ip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityPage;
