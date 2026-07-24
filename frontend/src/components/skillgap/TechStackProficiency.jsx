import React from "react";

const TechStackProficiency = () => {
  return (
    <div className="lg:col-span-12 glass-card p-10 rounded-xl border border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h3 className="text-2xl font-headline font-bold">
            Tech Stack Proficiency
          </h3>
          <p className="text-slate-600 dark:text-on-surface-variant font-body">
            Comparative analysis vs. Senior ML Benchmarks
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-background"
              alt="professional portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-3GSfKfX4YO7q2-lbnALzXKHY8I6ksxs8QUJ_gowd7uPYgLzgE2qMOViMOuTcUOik-6YdoWu_0EzVr4hNLujrbST5dIZ3TNi-khS3Ua5QLApBsbKvRqt9GNR32UJzarDiidSiPiHOdtyJSuN7jMP41SqiSQ72E_KtThhDGGsJFBTXs2JVdWo4w3emGHohz1Zag1ZGcBVA6XHrnPUlFPm7pd5PNBqMUgvehNgjxifewvamBS_zbr63zGBbLftLKUYSnORz5koFd82j"
            />
            <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-xs text-slate-600 dark:text-on-surface-variant">
                smart_toy
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-on-surface-variant tracking-widest uppercase font-label">
            Benchmarked by Aspirev
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-bold tracking-tight">
              Advanced Python Systems
            </span>
            <span className="text-sm font-bold text-secondary">92%</span>
          </div>
          <div className="h-2 w-full bg-slate-50 dark:bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-400"
              style={{ width: "92%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-bold tracking-tight">
              Statistical Inference
            </span>
            <span className="text-sm font-bold text-secondary">84%</span>
          </div>
          <div className="h-2 w-full bg-slate-50 dark:bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-400"
              style={{ width: "84%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-bold tracking-tight">
              Natural Language Processing
            </span>
            <span className="text-sm font-bold text-secondary">65%</span>
          </div>
          <div className="h-2 w-full bg-slate-50 dark:bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-400"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-bold tracking-tight">
              MLOps & Pipeline Arch
            </span>
            <span className="text-sm font-bold text-secondary">41%</span>
          </div>
          <div className="h-2 w-full bg-slate-50 dark:bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-400"
              style={{ width: "41%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackProficiency;
