import React, { useState } from "react";

const TableView = ({ stages, filteredApps, setSelectedApp, apps, setApps }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApps.length && filteredApps.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApps.map((a) => a.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setApps((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Selection Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-violet-900/20 border border-violet-500/30 rounded-xl px-4 py-3 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white shrink-0"
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-[0.85rem] font-bold text-violet-100">
              {selectedIds.length} applications selected
            </span>
          </div>
          <div className="flex items-center gap-3 sm:w-auto w-full">
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[0.8rem] font-bold transition-colors text-center">
              Move to...
            </button>
            <button 
              onClick={handleDeleteSelected}
              className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[0.8rem] font-bold transition-colors text-center"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1e1f23]/60">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/5">
              <th className="py-4 px-4 w-12">
                <button
                  onClick={toggleSelectAll}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    selectedIds.length === filteredApps.length && filteredApps.length > 0
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "border-slate-300 dark:border-white/20 hover:border-violet-500 text-transparent"
                  }`}
                >
                  {selectedIds.length === filteredApps.length && filteredApps.length > 0 && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </th>
              <th className="py-4 px-2 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                #
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                Company
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                Position
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                Date Applied
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                Status
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                Source
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 w-1/5">
                Notes
              </th>
              <th className="py-4 px-4 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app, index) => {
              const stageObj = stages.find((s) => s.key === app.stage);
              const isSelected = selectedIds.includes(app.id);

              return (
                <tr
                  key={app.id}
                  className={`border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group ${
                    isSelected ? "bg-violet-500/5 dark:bg-violet-500/10" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleSelect(app.id)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-violet-600 border-violet-600 text-white"
                          : "border-slate-300 dark:border-white/20 hover:border-violet-500 text-transparent"
                      }`}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-2 text-[0.8rem] text-slate-500 dark:text-white/40 font-medium">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${app.logoColor} flex items-center justify-center shrink-0 font-extrabold text-xs`}
                      >
                        {app.logoText}
                      </div>
                      <span className="text-[0.85rem] font-bold text-slate-900 dark:text-white group-hover:text-violet-400 transition-colors">
                        {app.company}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[0.85rem] font-medium text-slate-700 dark:text-white/80">
                    {app.role}
                  </td>
                  <td className="py-4 px-4 text-[0.85rem] text-slate-500 dark:text-white/60">
                    {app.time}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[0.6rem] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border ${stageObj?.badgeStyle}`}
                    >
                      {stageObj?.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[0.85rem] text-slate-500 dark:text-white/60">
                    {app.source || "Direct"}
                  </td>
                  <td className="py-4 px-4 text-[0.8rem] text-slate-500 dark:text-white/40 italic truncate max-w-[200px]">
                    {app.notes || "No notes"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-slate-400 dark:text-white/20 hover:text-slate-600 dark:text-white/60 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredApps.length === 0 && (
              <tr>
                <td colSpan="9" className="py-12 text-center text-slate-400 dark:text-white/30 text-sm">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2">
        <span className="text-[0.8rem] text-slate-500 dark:text-white/40">
          Showing <strong className="text-slate-900 dark:text-white">1-{filteredApps.length}</strong> of{" "}
          <strong className="text-slate-900 dark:text-white">{apps.length}</strong> applications
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableView;
