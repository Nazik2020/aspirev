import React, { useState } from "react";

const AdminRoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([
    {
      id: "rm1",
      title: "Frontend Master",
      category: "Software Development",
      steps: 8,
      popularity: "High",
      status: "Published",
    },
    {
      id: "rm2",
      title: "System Architecture",
      category: "Engineering",
      steps: 12,
      popularity: "Medium",
      status: "Published",
    },
    {
      id: "rm3",
      title: "Cloud Infrastructure",
      category: "DevOps",
      steps: 10,
      popularity: "Medium",
      status: "Draft",
    },
    {
      id: "rm4",
      title: "Database Design",
      category: "Data Science",
      steps: 6,
      popularity: "Low",
      status: "Published",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Software Development");

  const addRoadmap = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRM = {
      id: `rm${roadmaps.length + 1}`,
      title: newTitle,
      category: newCategory,
      steps: 5,
      popularity: "Low",
      status: "Draft",
    };

    setRoadmaps((prev) => [newRM, ...prev]);
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-slate-800 dark:text-white mb-2 tracking-tight">
          Roadmaps
        </h1>
        <p className="text-[14px] text-slate-500 dark:text-slate-400">
          Design, edit, and publish master career roadmaps.
        </p>
      </div>

      {/* Grid configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Create Roadmap Template */}
        <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white mb-4">
            New Template
          </h3>
          <form onSubmit={addRoadmap} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/40">
                Roadmap Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Machine Learning Specialist"
                className="w-full bg-slate-50 dark:bg-[#1c1d22]/50 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/40">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1c1d22]/50 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-violet-500/50"
              >
                <option value="Software Development">Software Development</option>
                <option value="Engineering">Engineering</option>
                <option value="DevOps">DevOps</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#814df3] to-[#5d21df] text-white py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(93,33,223,0.3)] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Create Draft Template
            </button>
          </form>
        </div>

        {/* Right Templates List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#101216] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h3 className="font-headline text-sm font-bold text-slate-800 dark:text-white mb-6">
              Active Templates
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {roadmaps.map((rm) => (
                <div
                  key={rm.id}
                  className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">
                      {rm.title}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-white/40 mt-1">
                      <span>{rm.category}</span>
                      <span>•</span>
                      <span>{rm.steps} steps</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase ${
                        rm.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/30"
                      }`}
                    >
                      {rm.status}
                    </span>
                    <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[16px]">
                        edit
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoadmapsPage;
