import React, { useState } from "react";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import ProfileSettings from "../components/settings/ProfileSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import PrivacySecuritySettings from "../components/settings/PrivacySecuritySettings";
import CareerPreferencesSettings from "../components/settings/CareerPreferencesSettings";
import BillingSettings from "../components/settings/BillingSettings";
import ConnectedAccountsSettings from "../components/settings/ConnectedAccountsSettings";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: "person" },
    { id: "notifications", label: "Notifications", icon: "notifications" },
    { id: "appearance", label: "Appearance", icon: "palette" },
    { id: "privacy", label: "Privacy & Security", icon: "shield" },
    { id: "career", label: "Career Preferences", icon: "timeline" },
    { id: "resume", label: "Resume Settings", icon: "description" },
    { id: "accounts", label: "Connected Accounts", icon: "link" },
    { id: "billing", label: "Billing & Plan", icon: "payments" },
    { id: "support", label: "Help & Support", icon: "help" },
  ];

  const accentColors = [
    { id: "violet", hex: "#ab8ff4" },
    { id: "cyan", hex: "#00daf3" },
    { id: "blue", hex: "#3b82f6" },
    { id: "green", hex: "#22c55e" },
    { id: "orange", hex: "#f59e0b" },
    { id: "pink", hex: "#ec4899" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-80px)] md:min-h-0 text-slate-900 dark:text-white w-full">
      {/* Secondary Sidebar */}
      <div className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 shrink-0 flex flex-col md:h-full md:overflow-y-auto">
        <div className="p-4 md:p-8 md:pr-4 flex-1">
          <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-4 md:mb-6 hidden md:block">
            System Settings
          </div>

          <nav className="flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-[13px] md:text-[14px] font-semibold whitespace-nowrap shrink-0 md:shrink text-left ${
                    isActive
                      ? "bg-white dark:bg-[#202126] text-slate-900 dark:text-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-200/50 dark:border-white/5"
                      : "text-slate-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-[#1c1d22]/50 hover:text-slate-700 dark:hover:text-white/80 border border-transparent"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-violet-500 dark:bg-primary hidden md:block" />
                  )}
                  <span 
                    className={`material-symbols-outlined text-[18px] md:text-[20px] transition-all duration-200 ${
                      isActive ? "text-violet-600 dark:text-primary" : "text-slate-400 dark:text-white/40 group-hover:text-slate-500 dark:group-hover:text-white/60"
                    }`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400" }}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-12 max-w-4xl">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "privacy" && <PrivacySecuritySettings />}
          {activeTab === "career" && <CareerPreferencesSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "accounts" && <ConnectedAccountsSettings />}

          {/* Placeholder for other tabs */}
          {activeTab !== "profile" &&
            activeTab !== "appearance" &&
            activeTab !== "notifications" &&
            activeTab !== "privacy" &&
            activeTab !== "career" &&
            activeTab !== "billing" &&
            activeTab !== "accounts" && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-white/20 mb-4">
                  construction
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Coming Soon
                </h2>
                <p className="text-slate-500 dark:text-white/50 text-sm max-w-md">
                  The {tabs.find((t) => t.id === activeTab)?.label} settings
                  page is currently under construction.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
