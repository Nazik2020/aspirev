import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { API_URL } from "../../../config/api";

import MetricsRow from "../../../components/admin/overview/MetricsRow";
import UserGrowthChart from "../../../components/admin/overview/UserGrowthChart";
import RecentSignups from "../../../components/admin/overview/RecentSignups";
import SystemHealthWidget from "../../../components/admin/overview/SystemHealthWidget";
import FeatureUsageWidget from "../../../components/admin/overview/FeatureUsageWidget";
import QuickActionsWidget from "../../../components/admin/overview/QuickActionsWidget";

const AdminDashboardPage = () => {
  const { user, getAuthHeaders } = useAuth();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/admin/overview`, {
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (data.success && !cancelled) {
          setOverview(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch overview:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [getAuthHeaders]);

  const firstName = user?.firstName || user?.username || "Admin";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-slate-800 dark:text-white mb-2 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-[14px] text-slate-500 dark:text-slate-400">
            Welcome back, {firstName}. Here is your platform at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-2.5 shadow-sm w-fit self-start md:self-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-widest">
              ALL GOOD
            </span>
          </div>
          <span className="text-slate-300 dark:text-white/10">|</span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-white/40">
            {dateStr}
          </span>
        </div>
      </div>

      {/* ── Metrics Row ── */}
      <MetricsRow metrics={overview?.metrics} loading={loading} />

      {/* ── Charts & Signups ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <UserGrowthChart data={overview?.chartData} loading={loading} />
        </div>
        <div className="lg:col-span-4">
          <RecentSignups signups={overview?.recentSignups} loading={loading} />
        </div>
      </div>

      {/* ── Bottom Widgets ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SystemHealthWidget health={overview?.systemHealth} loading={loading} />
        <FeatureUsageWidget usage={overview?.featureUsage} loading={loading} />
        <QuickActionsWidget />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
