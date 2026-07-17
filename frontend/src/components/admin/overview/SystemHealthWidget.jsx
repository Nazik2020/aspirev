import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { API_URL } from "../../../config/api";

const SERVICES = [
  { key: "api",      label: "API Gateway", icon: "dns" },
  { key: "database", label: "Database",    icon: "storage" },
  { key: "smtp",     label: "Email (SMTP)", icon: "mail" },
  { key: "cache",    label: "Redis Cache",  icon: "memory" },
];

const SystemHealthWidget = ({ health, loading }) => {
  const { getAuthHeaders } = useAuth();
  const [checking, setChecking] = useState(false);
  const [liveHealth, setLiveHealth] = useState(null);

  const display = liveHealth || health;

  const runCheck = async () => {
    setChecking(true);
    try {
      const res = await fetch(`${API_URL}/admin/overview/health`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setLiveHealth(data.data);
      }
    } catch {
      setLiveHealth({ api: false, database: false, smtp: false, cache: false });
    } finally {
      setChecking(false);
    }
  };

  if (loading || !display) {
    return (
      <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="mb-6">
          <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-violet-500">
            dns
          </span>
          System Health
        </h3>
        <span className="material-symbols-outlined text-slate-400 text-sm">
          settings_ethernet
        </span>
      </div>

      <div className="space-y-4">
        {SERVICES.map((svc) => {
          const isUp = display[svc.key] === true;
          return (
            <div
              key={svc.key}
              className="flex items-center justify-between bg-slate-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-white/5"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-white/80">
                {svc.label}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isUp ? "bg-cyan-400 animate-pulse" : "bg-rose-400"
                  }`}
                />
                <span
                  className={`text-[9px] font-bold tracking-wider ${
                    isUp ? "text-cyan-500" : "text-rose-500"
                  }`}
                >
                  {isUp ? "ONLINE" : "DOWN"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={runCheck}
        disabled={checking}
        className="w-full mt-6 py-2.5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <span
          className={`material-symbols-outlined text-[14px] ${
            checking ? "animate-spin" : ""
          }`}
        >
          sync
        </span>
        {checking ? "Checking..." : "Run Health Check"}
      </button>
    </div>
  );
};

export default SystemHealthWidget;
