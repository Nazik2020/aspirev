import React, { useState } from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors shrink-0 ${
        checked ? "bg-[#ab8ff4]" : "bg-slate-200 dark:bg-white/10"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

const NotificationSettings = () => {
  const [globalEmail, setGlobalEmail] = useState(true);

  // Subscription Preferences
  const [subs, setSubs] = useState({
    application: true,
    roadmap: true,
    newPaths: false,
    interview: true,
    tips: false,
    product: true,
    milestones: true,
  });

  const toggleSub = (key) =>
    setSubs((prev) => ({ ...prev, [key]: !prev[key] }));

  // Push Notifications
  const [push, setPush] = useState({
    appStatus: true,
    dailyLearning: false,
    interviewDay: true,
  });

  const togglePush = (key) =>
    setPush((prev) => ({ ...prev, [key]: !prev[key] }));

  // Digest Frequency
  const [digest, setDigest] = useState("daily");

  const subscriptionItems = [
    {
      key: "application",
      icon: "inventory_2",
      title: "Application Reminders",
      desc: "Remind me to follow up 7 days after applying.",
    },
    {
      key: "roadmap",
      icon: "map",
      title: "Roadmap Progress",
      desc: "Weekly summary of skills I have completed.",
    },
    {
      key: "newPaths",
      icon: "verified",
      title: "New Career Paths",
      desc: "Notify when new roadmaps are added.",
    },
    {
      key: "interview",
      icon: "event",
      title: "Interview Reminders",
      desc: "Remind me 24 hours before an interview.",
    },
    {
      key: "tips",
      icon: "lightbulb",
      title: "Career Tips",
      desc: "Personalized tips based on my job search stage.",
    },
    {
      key: "product",
      icon: "campaign",
      title: "Product Updates",
      desc: "New features, improvements, and announcements.",
    },
    {
      key: "milestones",
      icon: "celebration",
      title: "Success Milestones",
      desc: "Celebrate when I complete a stage or get an offer.",
    },
  ];

  const pushItems = [
    { key: "appStatus", title: "Application Status Changes" },
    { key: "dailyLearning", title: "Daily Learning Reminder" },
    { key: "interviewDay", title: "Interview Day Reminder" },
  ];

  return (
    <div className="pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Notifications
        </h1>
        <p className="text-[15px] text-slate-600 dark:text-white/60">
          Control what updates you receive and how.
        </p>
      </div>

      {/* Global Email Toggle */}
      <div className="bg-white dark:bg-[#1c1d22] border border-slate-200 dark:border-white/5 rounded-2xl p-5 mb-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#ab8ff4]/10 border border-[#ab8ff4]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-slate-900 dark:text-[#ab8ff4] text-[20px]">
              mail
            </span>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
              Email Notifications
            </div>
            <div className="text-[12px] text-slate-500 dark:text-white/50">
              Enable or disable all email notifications from Aspirev AI.
            </div>
          </div>
        </div>
        <ToggleSwitch
          checked={globalEmail}
          onChange={() => setGlobalEmail(!globalEmail)}
        />
      </div>

      {/* Subscription Preferences */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-slate-900 dark:text-[#ab8ff4] text-[18px]">
            tune
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Subscription Preferences
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {subscriptionItems.map((item) => (
            <div key={item.key} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-slate-500 dark:text-white/40 text-[22px]">
                  {item.icon}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-slate-900 dark:text-white/90 mb-0.5">
                  {item.title}
                </div>
                <div className="text-[12px] text-slate-500 dark:text-white/40">
                  {item.desc}
                </div>
              </div>
              <ToggleSwitch
                checked={subs[item.key]}
                onChange={() => toggleSub(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Push Notifications
          </h2>
          <p className="text-[12px] text-slate-500 dark:text-white/50">
            Browser and mobile push notifications.
          </p>
        </div>

        <div className="flex flex-col gap-5 bg-white dark:bg-[#17181c] p-6 rounded-2xl border border-slate-200 dark:border-white/5">
          {pushItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4"
            >
              <div className="text-[13px] font-medium text-slate-700 dark:text-white/80">
                {item.title}
              </div>
              <ToggleSwitch
                checked={push[item.key]}
                onChange={() => togglePush(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Email Digest Frequency */}
      <div className="mb-12">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Email Digest Frequency
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { id: "realtime", label: "Real-time" },
            { id: "daily", label: "Daily Digest" },
            { id: "weekly", label: "Weekly Digest" },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setDigest(option.id)}
              className={`px-6 py-2.5 rounded-full text-[12px] font-bold transition-all border ${
                digest === option.id
                  ? "bg-slate-50 dark:bg-[#ab8ff4]/10 border-[#ab8ff4]/50 text-slate-900 dark:text-[#ab8ff4] shadow-[0_0_15px_rgba(171,143,244,0.15)]"
                  : "bg-white dark:bg-[#17181c] border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:border-slate-300 dark:border-white/20 hover:text-slate-700 dark:text-white/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200 dark:border-white/5 mt-8">
        <button className="text-[12px] font-bold text-slate-500 dark:text-white/50 hover:text-slate-900 dark:text-white transition-colors tracking-wide">
          Discard Changes
        </button>
        <button className="bg-gradient-to-r from-[#ab8ff4] to-[#814df3] hover:from-[#bda5f7] hover:to-[#9165f5] text-white text-[12px] font-bold px-6 py-3 rounded-full transition-all shadow-[0_10px_20px_rgba(129,77,243,0.2)] tracking-wide">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
