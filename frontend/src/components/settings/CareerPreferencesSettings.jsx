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

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-4 my-8">
    <div className="flex-1 h-[1px] bg-slate-100 dark:bg-white/5"></div>
    <div className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">
      {title}
    </div>
    <div className="flex-1 h-[1px] bg-slate-100 dark:bg-white/5"></div>
  </div>
);

const CareerPreferencesSettings = () => {
  const [openToWork, setOpenToWork] = useState(true);
  const [showBadge, setShowBadge] = useState(true);
  const [openToRelocation, setOpenToRelocation] = useState(false);

  const [experience, setExperience] = useState("student");
  const [workTypes, setWorkTypes] = useState(["remote", "hybrid"]);
  const [empTypes, setEmpTypes] = useState(["full-time", "internship"]);
  const [industries, setIndustries] = useState(["technology", "startup"]);

  const toggleArrayItem = (setter, item) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const expLevels = [
    { id: "student", icon: "school", label: "Student" },
    { id: "fresh", icon: "workspace_premium", label: "Fresh Grad" },
    { id: "1-2", icon: "trending_up", label: "1-2 Years" },
    { id: "3+", icon: "rocket_launch", label: "3+ Years" },
  ];

  const availableIndustries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Startup",
    "E-commerce",
    "Media",
    "Government",
  ];

  return (
    <div className="pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Career Preferences
        </h1>
        <p className="text-[15px] text-slate-600 dark:text-white/60">
          Help Aspirev personalize your roadmap and job recommendations.
        </p>
      </div>

      {/* Open to Work Card */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-[#0c0d11] border border-slate-200 dark:border-white/5 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-slate-900 dark:text-[#00daf3]">
              work
            </span>
          </div>
          <div>
            <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-1">
              Open to Work
            </div>
            <div className="text-[12px] text-slate-500 dark:text-white/50 mb-3">
              Let recruiters know you're looking for new opportunities
            </div>
            <label className="flex items-center gap-2 cursor-pointer w-max">
              <div
                className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors shrink-0 ${showBadge ? "bg-white dark:bg-[#ab8ff4] border-[#ab8ff4]" : "border-slate-300 dark:border-white/20 bg-transparent"}`}
              >
                {showBadge && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-slate-900 dark:text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-white/40">
                Show badge on profile
              </span>
            </label>
          </div>
        </div>
        <div className="self-end sm:self-auto">
          <ToggleSwitch
            checked={openToWork}
            onChange={() => setOpenToWork(!openToWork)}
          />
        </div>
      </div>

      <SectionDivider title="Target Roles" />

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-white/50 mb-2">
            Primary Career Goal
          </label>
          <input
            type="text"
            defaultValue="Frontend Developer"
            className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-white/50 mb-2">
            Secondary Interest
          </label>
          <input
            type="text"
            placeholder="e.g. UI/UX Designer"
            className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors placeholder:text-slate-400 dark:text-white/20"
          />
        </div>
      </div>

      <SectionDivider title="Current Experience Level" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {expLevels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setExperience(lvl.id)}
            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border transition-all ${
              experience === lvl.id
                ? "bg-slate-50 dark:bg-[#ab8ff4]/5 border-[#ab8ff4]/50 text-slate-900 dark:text-white shadow-[0_0_20px_rgba(171,143,244,0.1)]"
                : "bg-white dark:bg-[#17181c] border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/50 hover:border-slate-200 dark:border-white/10 hover:text-slate-700 dark:text-white/80"
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {lvl.icon}
            </span>
            <span className="text-[12px] font-bold">{lvl.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        <div>
          <div className="text-[11px] font-bold text-slate-500 dark:text-white/50 mb-4">
            Work Type
          </div>
          <div className="flex flex-wrap gap-2">
            {["Remote", "Hybrid", "On-site"].map((type) => {
              const id = type.toLowerCase();
              const isActive = workTypes.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleArrayItem(setWorkTypes, id)}
                  className={`px-5 py-2 rounded-full text-[12px] font-bold transition-all border ${
                    isActive
                      ? "bg-slate-50 dark:bg-[#ab8ff4]/10 border-[#ab8ff4]/30 text-slate-900 dark:text-[#ab8ff4]"
                      : "bg-white dark:bg-[#17181c] border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/50 hover:border-slate-200 dark:border-white/10 hover:text-slate-700 dark:text-white/80"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-500 dark:text-white/50 mb-4">
            Employment Type
          </div>
          <div className="flex flex-wrap gap-2">
            {["Full-time", "Internship", "Contract", "Part-time"].map(
              (type) => {
                const id = type.toLowerCase();
                const isActive = empTypes.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleArrayItem(setEmpTypes, id)}
                    className={`px-5 py-2 rounded-full text-[12px] font-bold transition-all border ${
                      isActive
                        ? "bg-slate-50 dark:bg-[#ab8ff4]/10 border-[#ab8ff4]/30 text-slate-900 dark:text-[#ab8ff4]"
                        : "bg-white dark:bg-[#17181c] border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/50 hover:border-slate-200 dark:border-white/10 hover:text-slate-700 dark:text-white/80"
                    }`}
                  >
                    {type}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      <SectionDivider title="Geography" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-white/50 mb-2">
            Country
          </label>
          <input
            type="text"
            defaultValue="Sri Lanka"
            className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 dark:text-white/50 mb-2">
            City (Optional)
          </label>
          <input
            type="text"
            defaultValue="Colombo"
            className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-xl px-5 py-4 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-500 dark:text-white/50 text-[18px]">
            flight_takeoff
          </span>
          <span className="text-[13px] font-bold text-slate-900 dark:text-white/90">
            Open to Relocation
          </span>
        </div>
        <ToggleSwitch
          checked={openToRelocation}
          onChange={() => setOpenToRelocation(!openToRelocation)}
        />
      </div>

      <SectionDivider title="Target Industries" />

      <div className="flex flex-wrap gap-3 mb-10">
        {availableIndustries.map((ind) => {
          const id = ind.toLowerCase();
          const isActive = industries.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleArrayItem(setIndustries, id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-all border ${
                isActive
                  ? "bg-slate-50 dark:bg-[#ab8ff4]/5 border-[#ab8ff4]/30 text-slate-900 dark:text-white"
                  : "bg-white dark:bg-[#17181c] border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/50 hover:border-slate-200 dark:border-white/10 hover:text-slate-700 dark:text-white/80"
              }`}
            >
              {ind}
              {isActive && (
                <span className="material-symbols-outlined text-[12px] text-slate-900 dark:text-[#ab8ff4]">
                  check
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Salary Range */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-3xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] -mt-4 -mr-4">
            payments
          </span>
        </div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="text-[11px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-[0.2em]">
            Salary Range
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-bold text-slate-900 dark:text-white">
              $40k — $80k
            </span>
            <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-600 dark:text-white/60 px-2 py-0.5 rounded uppercase">
              USD
            </div>
          </div>
        </div>

        <div className="relative h-2 bg-slate-50 dark:bg-[#0c0d11] rounded-full mb-6 z-10">
          {/* Active Track */}
          <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-[#ab8ff4] to-[#00daf3] rounded-full"></div>
          {/* Handles */}
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 -ml-2.5 w-5 h-5 bg-white rounded-full shadow-[0_0_10px_rgba(171,143,244,0.5)] cursor-pointer"></div>
          <div className="absolute right-[30%] top-1/2 -translate-y-1/2 -mr-2.5 w-5 h-5 bg-white rounded-full shadow-[0_0_10px_rgba(0,218,243,0.5)] cursor-pointer"></div>
        </div>

        <div className="text-[10px] italic text-slate-400 dark:text-white/30 relative z-10">
          Adjust based on base annual gross salary preferences.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-white/5 mt-8">
        <button className="text-[12px] font-bold text-slate-500 dark:text-white/50 hover:text-slate-900 dark:text-white transition-colors tracking-wide">
          Discard changes
        </button>
        <button className="bg-[#ab8ff4] hover:opacity-90 text-white text-[12px] font-bold px-6 py-3 rounded-full transition-all shadow-[0_10px_20px_rgba(171,143,244,0.2)] tracking-wide">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default CareerPreferencesSettings;
