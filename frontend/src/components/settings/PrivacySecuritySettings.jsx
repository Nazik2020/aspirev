import React, { useState } from "react";

const PrivacySecuritySettings = () => {
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [visibility, setVisibility] = useState("private");

  return (
    <div className="pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Privacy & Security
        </h1>
        <p className="text-[15px] text-slate-600 dark:text-white/60">
          Manage your account security, sessions, and data privacy.
        </p>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-slate-900 dark:text-[#ab8ff4] text-[18px]">
            password
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Change Password
          </h2>
        </div>

        <div className="flex flex-col gap-5 max-w-xl">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-900 dark:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  visibility
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest mb-2">
              New Password
            </label>
            <div className="relative mb-2">
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-900 dark:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  visibility
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="text-[10px] font-bold text-slate-900 dark:text-[#00daf3]">
                Password Strength: Strong
              </div>
              <div className="flex gap-1 h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 dark:bg-[#00daf3] w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 hover:text-slate-900 dark:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  visibility
                </span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button className="bg-primary text-on-primary hover:opacity-90 text-[11px] font-bold px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow">
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-900 dark:text-[#00daf3] text-[18px]">
              shield_person
            </span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Two-Factor Authentication
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-full px-2 py-1">
            <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest pl-2">
              {tfaEnabled ? "Enabled" : "Not Enabled"}
            </span>
            <button
              onClick={() => setTfaEnabled(!tfaEnabled)}
              className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${
                tfaEnabled ? "bg-cyan-500 dark:bg-[#00daf3]" : "bg-slate-200 dark:bg-white/10"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${
                  tfaEnabled ? "translate-x-4" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>
        <p className="text-[13px] text-slate-600 dark:text-white/60 mb-6 max-w-3xl leading-relaxed">
          Add an extra layer of security to your account by requiring more than
          just a password to log in. We support industry-standard Authenticator
          Apps (like Google or Authy) and SMS-based verification.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex flex-col items-start bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 hover:border-[#ab8ff4]/30 rounded-xl p-5 transition-colors text-left group">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-slate-900 dark:text-[#ab8ff4] text-[18px]">
                smartphone
              </span>
              <span className="text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-slate-900 dark:text-[#ab8ff4] transition-colors">
                Authenticator App
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-white/40">
              Highly recommended for superior protection.
            </span>
          </button>
          <button className="flex flex-col items-start bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 hover:border-[#ab8ff4]/30 rounded-xl p-5 transition-colors text-left group">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-slate-900 dark:text-[#ab8ff4] text-[18px]">
                sms
              </span>
              <span className="text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-slate-900 dark:text-[#ab8ff4] transition-colors">
                SMS Verification
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-white/40">
              Codes sent via text message to your phone.
            </span>
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-slate-900 dark:text-[#00daf3] text-[18px]">
            devices
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Active Sessions
          </h2>
        </div>
        <p className="text-[12px] text-slate-500 dark:text-white/50 mb-6">
          Devices currently signed into your Aspirev account.
        </p>

        <div className="flex flex-col gap-2 mb-6">
          {/* Current Session */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-xl p-4 gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-600 dark:text-white/70">
                  laptop_mac
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-slate-900 dark:text-white mb-0.5 truncate">
                  Chrome on MacBook Pro
                </div>
                <div className="text-[11px] text-slate-500 dark:text-white/40 truncate">
                  Colombo, Sri Lanka • Active now
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest shrink-0 whitespace-nowrap">
              Current
            </div>
          </div>

          {/* Other Sessions */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-xl p-4 gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-500 dark:text-white/40">
                  window
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-slate-900 dark:text-white mb-0.5 truncate">
                  Firefox on Windows
                </div>
                <div className="text-[11px] text-slate-500 dark:text-white/40 truncate">
                  New York, USA • 3 days ago
                </div>
              </div>
            </div>
            <button className="text-[10px] font-bold text-slate-500 dark:text-white/40 hover:text-slate-900 dark:text-white uppercase tracking-widest transition-colors shrink-0 whitespace-nowrap">
              Sign Out
            </button>
          </div>

          <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 rounded-xl p-4 gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-500 dark:text-white/40">
                  phone_iphone
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-slate-900 dark:text-white mb-0.5 truncate">
                  Safari on iPhone
                </div>
                <div className="text-[11px] text-slate-500 dark:text-white/40 truncate">
                  London, UK • 1 week ago
                </div>
              </div>
            </div>
            <button className="text-[10px] font-bold text-slate-500 dark:text-white/40 hover:text-slate-900 dark:text-white uppercase tracking-widest transition-colors shrink-0 whitespace-nowrap">
              Sign Out
            </button>
          </div>
        </div>

        <button className="w-full border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white text-[11px] font-bold py-3.5 rounded-xl uppercase tracking-widest transition-colors">
          Sign Out All Other Devices
        </button>
      </div>

      {/* Profile Visibility */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-slate-900 dark:text-[#00daf3] text-[18px]">
            visibility
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Profile Visibility
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              id: "private",
              title: "Private",
              desc: "Your profile is only visible to you. AI data analysis is restricted to your private dashboard.",
            },
            {
              id: "connections",
              title: "Connections",
              desc: "Only verified professional connections can see your career roadmap and skills analysis.",
            },
            {
              id: "public",
              title: "Public",
              desc: "Your profile is discoverable by recruiters and potential partners in the Aspirev network.",
            },
          ].map((option) => (
            <div
              key={option.id}
              onClick={() => setVisibility(option.id)}
              className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                visibility === option.id
                  ? "bg-slate-50 dark:bg-[#ab8ff4]/5 border-[#ab8ff4]/30"
                  : "bg-slate-50 dark:bg-[#0c0d11] border-slate-200 dark:border-white/5 hover:border-slate-200 dark:border-white/10"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  visibility === option.id
                    ? "border-[#ab8ff4]"
                    : "border-slate-300 dark:border-white/20"
                }`}
              >
                {visibility === option.id && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900 dark:text-white mb-1">
                  {option.title}
                </div>
                <div className="text-[12px] text-slate-500 dark:text-white/50 leading-relaxed">
                  {option.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-orange-400 text-[18px]">
            dataset
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Data & Privacy
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
            <div>
              <div className="text-[13px] font-bold text-slate-900 dark:text-white mb-1">
                Download My Data
              </div>
              <div className="text-[12px] text-slate-500 dark:text-white/50 max-w-md">
                Export a complete archive of your career history, goals, and
                skill mappings.
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 text-slate-900 dark:text-white text-[11px] font-bold transition-colors shrink-0">
              Request Download
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-t border-slate-200 dark:border-white/5 pt-6">
            <div>
              <div className="text-[13px] font-bold text-orange-400 mb-1">
                Delete All Data
              </div>
              <div className="text-[12px] text-slate-500 dark:text-white/50 max-w-md">
                Permanently remove your account and all associated career
                intelligence data. This cannot be undone.
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl border border-orange-500/20 text-orange-400 hover:bg-orange-500/10 text-[11px] font-bold transition-colors shrink-0">
              Delete Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecuritySettings;
