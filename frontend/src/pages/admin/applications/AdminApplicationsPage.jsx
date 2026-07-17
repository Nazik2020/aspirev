import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { API_URL } from "../../../config/api";

import PrivacyBanner from "../../../components/admin/applications/PrivacyBanner";
import AppMetricsGrid from "../../../components/admin/applications/AppMetricsGrid";
import StatusBarsCard from "../../../components/admin/applications/StatusBarsCard";
import StatusDonutCard from "../../../components/admin/applications/StatusDonutCard";
import VolumeChartCard from "../../../components/admin/applications/VolumeChartCard";
import TopCompaniesCard from "../../../components/admin/applications/TopCompaniesCard";
import TopJobTitlesCard from "../../../components/admin/applications/TopJobTitlesCard";

const RANGE_OPTIONS = [
  { value: "7d",  label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "all", label: "All Time" },
];

const AdminApplicationsPage = () => {
  const { getAuthHeaders } = useAuth();
  const [range, setRange] = useState("30d");
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/admin/applications?range=${range}`, {
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (data.success && !cancelled) {
          setAnalytics(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch application analytics:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [range, getAuthHeaders]);

  const handleExport = async () => {
    try {
      setExporting(true);
      const res = await fetch(`${API_URL}/admin/applications/export?range=${range}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        downloadCSV(data.data);
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  const currentLabel =
    RANGE_OPTIONS.find((o) => o.value === range)?.label || "Last 30 Days";

  return (
    <div className="space-y-6 min-h-full bg-[#0f1117] dark:bg-[#0f1117] -m-6 md:-m-8 p-6 md:p-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight">
            Application Data
          </h1>
          <p className="text-[13px] text-white/40 mt-1">
            Platform-wide job application insights and statistics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Date Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRangeDropdownOpen(!rangeDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 text-white/70 hover:text-white text-[12px] font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>{currentLabel.toUpperCase()}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {rangeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setRangeDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#1a1c23] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {RANGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setRange(opt.value);
                        setRangeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold transition-colors ${
                        range === opt.value
                          ? "bg-violet-600/20 text-violet-300"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={exporting || loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c6a0ff] hover:bg-[#b084f7] disabled:opacity-50 text-[#3b1d70] text-[12px] font-bold shadow-[0_4px_15px_rgba(198,160,255,0.25)] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">
              {exporting ? "hourglass_top" : "download"}
            </span>
            <span className="hidden sm:block">{exporting ? "EXPORTING..." : "EXPORT DATA"}</span>
          </button>
        </div>
      </div>

      {/* ── Privacy Banner ── */}
      <PrivacyBanner />

      {/* ── Key Metrics Grid ── */}
      <AppMetricsGrid metrics={analytics?.metrics} loading={loading} />

      {/* ── Main Dashboard Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Row 1 */}
        <div className="lg:col-span-8">
          <StatusBarsCard data={analytics?.statusBreakdown} loading={loading} />
        </div>
        <div className="lg:col-span-4">
          <StatusDonutCard
            data={analytics?.statusBreakdown}
            loading={loading}
          />
        </div>

        {/* Row 2 (Full width) */}
        <div className="lg:col-span-12">
          <VolumeChartCard data={analytics?.volumeOverTime} loading={loading} />
        </div>

        {/* Row 3 */}
        <div className="lg:col-span-6">
          <TopCompaniesCard data={analytics?.topCompanies} loading={loading} />
        </div>
        <div className="lg:col-span-6">
          <TopJobTitlesCard data={analytics?.topJobTitles} loading={loading} />
        </div>
      </div>
    </div>
  );
};

function downloadCSV(rows) {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = String(row[h] ?? "");
          return val.includes(",") || val.includes('"')
            ? `"${val.replace(/"/g, '""')}"`
            : val;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `applications-export-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default AdminApplicationsPage;
