import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";
import { roadmaps } from "../data/roadmaps.js";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, authFetch } = useAuth();
  
  const rawUsername = user?.username || "User";
  const displayName = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1);

  const [metrics, setMetrics] = useState([]);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await authFetch(`${API_URL}/dashboard`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setMetrics(data.data.metrics);
          setRecentApplications(data.data.recentApplications);
          const active = data.data.activeRoadmap;
          try {
            const importedRoadmap = roadmaps.find(r => r.id === (active.roadmapId || 'frontend'));
            
            if (importedRoadmap) {
              const totalSkills = importedRoadmap.stages.reduce((acc, stage) => acc + (stage.skills ? stage.skills.length : 0), 0);
              active.skillsValidated = `${active.completedNodesCount}/${totalSkills}`;
              
              const completedNodes = active.completedNodes || [];
              
              const allStagesData = importedRoadmap.stages.map(stage => {
                const stageTotal = stage.skills ? stage.skills.length : 0;
                const stageCompleted = stage.skills ? stage.skills.filter(s => completedNodes.includes(s.id)).length : 0;
                const isCompleted = stageTotal > 0 && stageCompleted === stageTotal;
                return { stage, stageTotal, stageCompleted, isCompleted };
              });

              let firstIncompleteFound = false;
              let activeStageIndex = -1;
              
              const allStages = allStagesData.map((data, idx) => {
                 let status = "locked";
                 if (data.isCompleted) {
                   status = "completed";
                 } else if (!firstIncompleteFound) {
                   status = "active";
                   firstIncompleteFound = true;
                   activeStageIndex = idx;
                 }
                 
                 return {
                  title: data.stage.title,
                  desc: data.stage.description || (data.stage.skills ? data.stage.skills.slice(0,3).map(s=>s.name).join(', ') : ""),
                  status: status,
                  badge: status === "completed" ? "COMPLETED" : (status === "active" ? "IN PROGRESS" : "UP NEXT"),
                  progress: data.stageTotal > 0 ? Math.round((data.stageCompleted / data.stageTotal) * 100) : 0
                 }
              });

              if (activeStageIndex === -1) {
                activeStageIndex = allStages.length; // all completed
              }

              let startIndex = Math.max(0, activeStageIndex - 1);
              if (startIndex + 3 > allStages.length) {
                startIndex = Math.max(0, allStages.length - 3);
              }

              active.stages = allStages.slice(startIndex, startIndex + 3);
            }
          } catch (e) {
            console.error("Failed to load roadmap dynamically", e);
          }
          setActiveRoadmap(active);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [authFetch]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!activeRoadmap) return null;

  return (
    <div className="w-full space-y-8">
      {/* Premium Waving Hand Animation style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                @keyframes premiumWave {
                    0% { transform: rotate( 0.0deg) }
                    10% { transform: rotate(14.0deg) }
                    20% { transform: rotate(-8.0deg) }
                    30% { transform: rotate(14.0deg) }
                    40% { transform: rotate(-4.0deg) }
                    50% { transform: rotate(10.0deg) }
                    60% { transform: rotate( 0.0deg) }
                    100% { transform: rotate( 0.0deg) }
                }
                .animate-premium-wave {
                    display: inline-block;
                    animation: premiumWave 2.2s infinite;
                    transform-origin: 75% 75%;
                }
            `,
        }}
      />

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {displayName} <span className="animate-premium-wave">👋</span>
          </h1>
          <p className="text-slate-500 dark:text-white/40 text-sm md:text-base font-medium">
            Here's your career progress at a glance.
          </p>
        </div>
        <button
          onClick={() => navigate(`/career-path/${activeRoadmap?.roadmapId || 'frontend'}`)}
          className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-full
                               bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400
                               text-slate-900 dark:text-white text-sm font-bold shadow-[0_10px_25px_rgba(93,33,223,0.25)] hover:scale-102 transition-all"
        >
          Continue Learning
          <span className="material-symbols-outlined text-[16px] font-bold">
            arrow_forward
          </span>
        </button>
      </div>

      {/* ── Metrics Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex flex-col justify-between min-h-[140px] relative overflow-hidden"
          >
            <div>
              <span className="text-[0.68rem] text-slate-500 dark:text-white/35 font-bold uppercase tracking-wider block mb-2">
                {m.title}
              </span>
              <div className="flex items-baseline gap-2 flex-wrap mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                  {m.value}
                </span>
                {m.subtext && (
                  <span
                    className={`text-[0.7rem] font-bold leading-tight uppercase tracking-wide ${m.subtext.startsWith("+") ? "text-emerald-400" : m.subtext.includes("Neutral") ? "text-slate-500 dark:text-white/40" : "text-violet-500 dark:text-violet-300"}`}
                    title={m.subtext}
                  >
                    {m.subtext}
                  </span>
                )}
              </div>
            </div>

            {/* Card visual elements based on metric type */}
            <div className="mt-4">
              {m.type === "progress" && (
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${m.color} rounded-full`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              )}

              {m.type === "segments" && (
                <div className="flex gap-1.5">
                  {Array.from({ length: m.totalCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < m.activeCount
                          ? "bg-gradient-to-r from-violet-500 to-cyan-400"
                          : "bg-slate-200 dark:bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}

              {m.type === "radial" && (
                <div className="absolute right-5 bottom-4 w-12 h-12 flex items-center justify-center">
                  {/* SVG Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-white/5"
                      fill="transparent"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      stroke="url(#purpleCyanGrad)"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 18}
                      strokeDashoffset={
                        2 * Math.PI * 18 * (1 - m.percentage / 100)
                      }
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="purpleCyanGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-[0.65rem] font-black text-slate-700 dark:text-white/80">
                    {m.value}
                  </span>
                </div>
              )}

              {m.type === "bars" && (
                <div className="flex items-end justify-between h-7 w-28 mt-1">
                  {m.bars.map((bar, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-violet-500/20 rounded-full overflow-hidden h-full relative"
                    >
                      <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-violet-500 to-purple-400 rounded-full"
                        style={{ height: `${bar}%` }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Dashboard Layout Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left side: Active Roadmap */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[0.65rem] text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest">
                Your Active Roadmap
              </span>
              <h2 className="text-[1.375rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                {activeRoadmap.title}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {activeRoadmap.skillsValidated}
              </span>
              <span className="text-[0.6rem] text-slate-400 dark:text-white/30 uppercase tracking-widest font-black">
                Skills learned
              </span>
            </div>
          </div>

          {/* Timeline Stages */}
          <div className="relative pl-[40px] space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-white/10">
            {activeRoadmap.stages.map((stage, idx) => {
              const isCompleted = stage.status === "completed";
              const isActive = stage.status === "active";
              const isLocked = stage.status === "locked";

              return (
                <div key={idx} className="relative group">
                  {/* Icon Indicator dot */}
                  <div
                    className={`absolute -left-[32px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white dark:bg-[#17181c] z-10 transition-all duration-300
                                        ${isCompleted ? "bg-violet-600 border-violet-600 text-white shadow-[0_0_10px_rgba(93,33,223,0.3)]" : ""}
                                        ${isActive ? "border-cyan-500/50 shadow-[0_0_8px_rgba(34,211,238,0.2)]" : ""}
                                        ${isLocked ? "border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20" : ""}
                                    `}
                  >
                    {isCompleted ? (
                      <span
                        className="material-symbols-outlined text-slate-900 dark:text-white leading-[0]"
                        style={{
                          fontSize: "12px",
                          fontVariationSettings: "'FILL' 1, 'wght' 700",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        check
                      </span>
                    ) : isActive ? (
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    ) : (
                      <span
                        className="material-symbols-outlined text-slate-400 dark:text-white/30 leading-[0]"
                        style={{
                          fontSize: "12px",
                          fontVariationSettings: "'FILL' 0, 'wght' 300",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        lock
                      </span>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`space-y-2.5 ${isLocked ? "opacity-40" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex flex-col">
                        <h3
                          className={`text-[0.95rem] font-bold leading-tight ${isLocked ? "text-slate-500 dark:text-white/50" : "text-slate-900 dark:text-white"}`}
                        >
                          {stage.title}
                        </h3>
                        <p className="text-[0.78rem] text-slate-500 dark:text-white/40 leading-normal mt-0.5">
                          {stage.desc}
                        </p>
                      </div>
                      <span
                        className={`text-[0.55rem] uppercase tracking-widest font-black px-2 py-0.5 rounded-full border leading-none
                                                ${isCompleted ? "text-violet-400 bg-violet-400/5 border-violet-400/20" : ""}
                                                ${isActive ? "text-cyan-400 bg-cyan-400/5 border-cyan-400/20" : ""}
                                                ${isLocked ? "text-slate-400 dark:text-white/20 bg-white/5 border-slate-200 dark:border-white/5" : ""}
                                            `}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    {/* Progress bar inside active node */}
                    {isActive && (
                      <div className="pt-1.5 max-w-sm">
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${stage.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Recent Applications */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex flex-col justify-between min-h-[360px] space-y-6">
          <div className="space-y-0.5">
            <span className="text-[0.65rem] text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest">
              Overview
            </span>
            <h2 className="text-[1.375rem] font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recent Applications
            </h2>
          </div>

          {/* Applications List */}
          <div className="flex-1 flex flex-col gap-3.5">
            {recentApplications.map((app, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl border border-white/3 bg-slate-50 dark:bg-[#1e1f23]/30 hover:bg-slate-100 dark:hover:bg-[#24252a]/40 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/8">
                    <span className="material-symbols-outlined text-[18px] text-slate-500 dark:text-white/50">
                      {app.company === "Vercel" ? "cloud" : "corporate_fare"}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {app.company}
                    </span>
                    <span className="text-[0.7rem] text-slate-400 dark:text-white/30 font-medium leading-none mt-0.5">
                      {app.role}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[0.55rem] uppercase tracking-widest font-black px-2.5 py-1 rounded-full border leading-none shrink-0 ${app.color}`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/job-tracker")} className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 bg-white/3 hover:bg-slate-100 dark:hover:bg-white/5 text-[0.8rem] font-bold text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-all">
            View All Applications
          </button>
        </div>
      </div>

      {/* ── Bottom Quick Actions Row (4 Columns) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => navigate("/job-tracker")}
          className="p-5 rounded-2xl bg-white dark:bg-[#1e1f23]/40 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-slate-200 dark:border-white/10 hover:shadow hover:bg-slate-50 dark:hover:bg-[#24252a]/50 cursor-pointer flex gap-4 items-center transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px] text-slate-600 dark:text-white/60">
              add_circle
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white/90 group-hover:text-slate-900 dark:text-white transition-colors">
              Add Application
            </span>
            <span className="text-[0.7rem] text-slate-400 dark:text-white/30 font-medium">
              Track new job
            </span>
          </div>
        </div>

        <div
          onClick={() => navigate(`/career-path/${activeRoadmap?.roadmapId || 'frontend'}`)}
          className="p-5 rounded-2xl bg-white dark:bg-[#1e1f23]/40 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-slate-200 dark:border-white/10 hover:shadow hover:bg-slate-50 dark:hover:bg-[#24252a]/50 cursor-pointer flex gap-4 items-center transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px] text-slate-600 dark:text-white/60">
              map
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white/90 group-hover:text-slate-900 dark:text-white transition-colors">
              Continue Roadmap
            </span>
            <span className="text-[0.7rem] text-slate-400 dark:text-white/30 font-medium">
              Resume your path
            </span>
          </div>
        </div>

        <div
          onClick={() => navigate("/career-path")}
          className="p-5 rounded-2xl bg-white dark:bg-[#1e1f23]/40 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-slate-200 dark:border-white/10 hover:shadow hover:bg-slate-50 dark:hover:bg-[#24252a]/50 cursor-pointer flex gap-4 items-center transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px] text-slate-600 dark:text-white/60">
              explore
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white/90 group-hover:text-slate-900 dark:text-white transition-colors">
              Explore Paths
            </span>
            <span className="text-[0.7rem] text-slate-400 dark:text-white/30 font-medium">
              Find new skills
            </span>
          </div>
        </div>

        <div
          onClick={() => navigate("/portfolio")}
          className="p-5 rounded-2xl bg-white dark:bg-[#1e1f23]/40 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-slate-200 dark:border-white/10 hover:shadow hover:bg-slate-50 dark:hover:bg-[#24252a]/50 cursor-pointer flex gap-4 items-center transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px] text-slate-600 dark:text-white/60">
              language
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white/90 group-hover:text-slate-900 dark:text-white transition-colors">
              Manage Portfolio
            </span>
            <span className="text-[0.7rem] text-slate-400 dark:text-white/30 font-medium">
              Update your site
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
