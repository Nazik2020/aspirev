import React, { useState, useEffect } from "react";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", "system");
    }
  }, [theme]);
  const [accentColor, setAccentColor] = useState("violet");
  const [sidebarBehavior, setSidebarBehavior] = useState("always_visible");
  const [typographyScale, setTypographyScale] = useState("medium");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactCards, setCompactCards] = useState(false);

  const accentColors = [
    { id: "violet", hex: "#ab8ff4" },
    { id: "cyan", hex: "#00daf3" },
    { id: "blue", hex: "#3b82f6" },
    { id: "green", hex: "#22c55e" },
    { id: "orange", hex: "#f59e0b" },
    { id: "pink", hex: "#ec4899" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Appearance
        </h1>
        <p className="text-[15px] text-slate-600 dark:text-white/60">
          Customize how Aspirev AI looks on your device.
        </p>
      </div>

      {/* Theme Mode */}
      <div className="mb-12">
        <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-6">
          Theme Mode
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Dark Theme */}
          <button
            onClick={() => setTheme("dark")}
            className={`relative flex flex-col items-center rounded-2xl border transition-all ${
              theme === "dark"
                ? "border-[#ab8ff4] bg-slate-50 dark:bg-[#ab8ff4]/5"
                : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#17181c] hover:border-slate-300 dark:border-white/20"
            }`}
          >
            <div className="p-4 w-full aspect-video flex items-center justify-center">
              <div className="w-full h-full rounded-lg bg-[#0c0d11] border border-white/5 p-3 flex flex-col gap-2">
                <div className="w-1/2 h-2 bg-white/10 rounded-full"></div>
                <div className="w-3/4 h-2 bg-white/5 rounded-full"></div>
              </div>
            </div>
            <div className="py-4 border-t border-slate-200 dark:border-white/5 w-full text-center text-sm font-medium">
              Dark
            </div>
            {theme === "dark" && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#ab8ff4] text-white flex items-center justify-center shadow-lg shadow-[#ab8ff4]/30">
                <span className="material-symbols-outlined text-[12px] font-bold">
                  check
                </span>
              </div>
            )}
          </button>

          {/* Light Theme */}
          <button
            onClick={() => setTheme("light")}
            className={`relative flex flex-col items-center rounded-2xl border transition-all ${
              theme === "light"
                ? "border-[#ab8ff4] bg-slate-50 dark:bg-[#ab8ff4]/5"
                : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#17181c] hover:border-slate-300 dark:border-white/20"
            }`}
          >
            <div className="p-4 w-full aspect-video flex items-center justify-center">
              <div className="w-full h-full rounded-lg bg-white border border-black/5 p-3 flex flex-col gap-2 shadow-sm">
                <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            <div className="py-4 border-t border-slate-200 dark:border-white/5 w-full text-center text-sm font-medium">
              Light
            </div>
            {theme === "light" && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#ab8ff4] text-white flex items-center justify-center shadow-lg shadow-[#ab8ff4]/30">
                <span className="material-symbols-outlined text-[12px] font-bold">
                  check
                </span>
              </div>
            )}
          </button>

          {/* System Theme */}
          <button
            onClick={() => setTheme("system")}
            className={`relative flex flex-col items-center rounded-2xl border transition-all ${
              theme === "system"
                ? "border-[#ab8ff4] bg-slate-50 dark:bg-[#ab8ff4]/5"
                : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#17181c] hover:border-slate-300 dark:border-white/20"
            }`}
          >
            <div className="p-4 w-full aspect-video flex items-center justify-center">
              <div className="w-full h-full rounded-lg border border-slate-200 dark:border-white/5 flex overflow-hidden">
                <div className="w-1/2 h-full bg-[#0c0d11]"></div>
                <div className="w-1/2 h-full bg-white"></div>
              </div>
            </div>
            <div className="py-4 border-t border-slate-200 dark:border-white/5 w-full text-center text-sm font-medium">
              System
            </div>
            {theme === "system" && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#ab8ff4] text-white flex items-center justify-center shadow-lg shadow-[#ab8ff4]/30">
                <span className="material-symbols-outlined text-[12px] font-bold">
                  check
                </span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="mb-12">
        <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-6">
          Accent Color
        </div>
        <div className="flex flex-wrap gap-4">
          {accentColors.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccentColor(color.id)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                accentColor === color.id
                  ? "ring-2 ring-slate-300 dark:ring-white/20 ring-offset-4 ring-offset-slate-50 dark:ring-offset-[#0c0d11]"
                  : ""
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {accentColor === color.id && (
                <span className="material-symbols-outlined text-[18px] text-white drop-shadow-sm">
                  check
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Sidebar Behavior */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-6">
            Sidebar Behavior
          </div>
          <div className="flex flex-col gap-3">
            {[
              { id: "always_visible", label: "Always Visible" },
              { id: "auto_hide", label: "Auto Hide" },
              { id: "compact_mode", label: "Compact Mode" },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSidebarBehavior(option.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  sidebarBehavior === option.id
                    ? "border-[#ab8ff4]/30 bg-slate-50 dark:bg-[#ab8ff4]/5"
                    : "border-slate-200 dark:border-white/5 bg-white dark:bg-[#17181c] hover:border-slate-200 dark:border-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                    sidebarBehavior === option.id
                      ? "border-[#ab8ff4]"
                      : "border-white/30"
                  }`}
                >
                  {sidebarBehavior === option.id && (
                    <div className="w-2 h-2 rounded-full bg-[#ab8ff4]"></div>
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-white/90">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Typography & Toggles */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-6">
            Typography Scale
          </div>
          <div className="flex p-1 bg-white dark:bg-[#1c1d22] border border-slate-200 dark:border-white/5 rounded-xl mb-10">
            {["small", "medium", "large"].map((scale) => (
              <button
                key={scale}
                onClick={() => setTypographyScale(scale)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-all ${
                  typographyScale === scale
                    ? "bg-[#ab8ff4] text-white shadow-sm"
                    : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:text-white"
                }`}
              >
                {scale}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-white/90">
                Reduce Motion
              </span>
              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${
                  reduceMotion
                    ? "bg-[#ab8ff4]"
                    : "bg-slate-200 dark:bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    reduceMotion ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-white/90">
                Compact Cards
              </span>
              <button
                onClick={() => setCompactCards(!compactCards)}
                className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${
                  compactCards
                    ? "bg-[#ab8ff4]"
                    : "bg-slate-200 dark:bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    compactCards ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex gap-4 mt-8 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#ab8ff4] to-[#00daf3]"></div>
        <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1d22] border border-slate-200 dark:border-white/5 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-white/70">
            sync
          </span>
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Instant Sync
          </div>
          <div className="text-[13px] text-slate-500 dark:text-white/50 leading-relaxed">
            Changes are automatically saved and synced across all your connected
            devices including the Aspirev mobile app.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
