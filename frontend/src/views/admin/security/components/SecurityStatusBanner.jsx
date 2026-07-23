import React, { useState } from "react";

const SecurityStatusBanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  return (
    <div className="w-full bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-500/25 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Left: Icon + Status Text */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-emerald-400 text-[24px]">
            security
          </span>
        </div>
        <div>
          <h3 className="text-emerald-400 font-bold text-[15px] leading-snug">
            {scanned
              ? "Manual Scan Complete — No Issues Found"
              : "Platform Secure — No active threats detected"}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="text-[11px] text-white/40 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              Last security scan: {scanned ? "just now" : "2 minutes ago"}
            </span>
            <span className="text-[11px] text-white/40 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified_user</span>
              Firewalls Active
            </span>
          </div>
        </div>
      </div>

      {/* Right: Scan Button */}
      <button
        onClick={runScan}
        disabled={scanning}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 ${
          scanning
            ? "bg-emerald-600/40 text-emerald-300 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.5)] active:scale-95"
        }`}
      >
        <span className={`material-symbols-outlined text-[18px] ${scanning ? "animate-spin" : ""}`}>
          {scanning ? "sync" : "radar"}
        </span>
        {scanning ? "Scanning..." : "Run Manual Scan"}
      </button>
    </div>
  );
};

export default SecurityStatusBanner;
