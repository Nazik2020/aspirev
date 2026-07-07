import React, { useRef, useEffect } from "react";

const KanbanBoard = ({ stages, filteredApps, statusFilter, setSelectedApp }) => {
  const kanbanContainerRef = useRef(null);
  const columnRefs = useRef({});

  // Auto-scroll Kanban board when a specific status is selected
  useEffect(() => {
    if (kanbanContainerRef.current) {
      const container = kanbanContainerRef.current;
      
      if (statusFilter === "All") {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else if (columnRefs.current[statusFilter]) {
        const targetColumn = columnRefs.current[statusFilter];
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetColumn.getBoundingClientRect();
        const scrollTarget =
          container.scrollLeft + targetRect.left - containerRect.left - 16; // 16px padding

        container.scrollTo({
          left: scrollTarget,
          behavior: "smooth",
        });
      }
    }
  }, [statusFilter]);

  return (
    <div
      ref={kanbanContainerRef}
      className="flex gap-6 overflow-x-auto pb-4 pt-2 -mx-4 px-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
    >
      {stages.map((stage) => {
        const columnApps = filteredApps.filter((a) => a.stage === stage.key);
        return (
          <div
            key={stage.key}
            ref={(el) => (columnRefs.current[stage.key] = el)}
            className="w-80 shrink-0 space-y-4"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                <span className="text-[0.7rem] uppercase tracking-[0.15em] font-black text-slate-500 dark:text-white/45">
                  {stage.name}
                </span>
              </div>
              <span
                className={`text-[0.7rem] font-bold px-2 py-0.5 rounded-full ${stage.badgeStyle}`}
              >
                {columnApps.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-3 min-h-[420px]">
              {columnApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="p-5 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 space-y-4 hover:border-slate-200 dark:border-white/10 hover:bg-white dark:bg-[#1e1f23]/80 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${app.logoColor} flex items-center justify-center shrink-0 font-extrabold text-sm`}
                      >
                        {app.logoText}
                      </div>
                      <div>
                        <h4 className="text-[0.95rem] font-bold text-slate-900 dark:text-white group-hover:text-violet-400 transition-colors leading-tight">
                          {app.role}
                        </h4>
                        <p className="text-[0.75rem] text-slate-500 dark:text-white/40 mt-0.5">
                          {app.company} • {app.time}
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 dark:text-white/20 hover:text-slate-600 dark:text-white/60">
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-[0.6rem] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md border ${stage.badgeStyle}`}
                    >
                      {app.badge}
                    </span>
                    {app.info ? (
                      <span className="text-[0.7rem] text-rose-400 font-bold">
                        {app.info}
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-slate-400 dark:text-white/25 text-[16px]">
                        schedule
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {columnApps.length === 0 && (
                <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/5 rounded-2xl text-slate-400 dark:text-white/20 text-xs">
                  No applications in this stage
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
