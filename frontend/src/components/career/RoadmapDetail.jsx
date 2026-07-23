import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RoadmapDiagram from "../roadmap/RoadmapDiagram";
import { useAuth } from "../../context/AuthContext";
import { roadmaps } from "../../data/roadmaps.js";
import { API_URL } from "../../config/api";

const SkillRow = ({ skill, onToggle }) => {
  return (
    <div className="flex flex-col py-3 border-b border-slate-200 dark:border-white/5 last:border-0 gap-3">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(skill.id)}
          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
            skill.done
              ? "bg-violet-600 border-violet-600 text-white"
              : "border-slate-300 dark:border-white/20 hover:border-white/40 bg-slate-100 dark:bg-white/5"
          }`}
        >
          {skill.done && (
            <span
              className="material-symbols-outlined text-slate-900 dark:text-white leading-[0]"
              style={{
                fontSize: "16px",
                fontVariationSettings: "'FILL' 1, 'wght' 700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              check
            </span>
          )}
        </button>
        <div className="min-w-0">
          <p
            className={`text-[0.88rem] font-semibold leading-tight ${skill.done ? "text-slate-500 dark:text-white/40 line-through" : "text-slate-900 dark:text-white/90"}`}
          >
            {skill.name}
          </p>
          {skill.description && (
            <p className="text-[0.72rem] text-slate-500 dark:text-white/35 mt-1 leading-relaxed">
              {skill.description}
            </p>
          )}
        </div>
      </div>
      {skill.resources?.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-8 shrink-0">
          {skill.resources.map((res, idx) => {
            let url, name, type;
            if (typeof res === "string") {
              url = res;
              const isYouTube = res.includes("youtube.com") || res.includes("youtu.be");
              const isGitHub = res.includes("github.com");
              const isCourse = res.includes("deeplearning.ai") || res.includes("coursera") || res.includes("kaggle.com/learn") || res.includes("scrimba") || res.includes("fast.ai") || res.includes("huggingface.co/learn");
              const isDocs = res.includes("/docs") || res.includes("developer.mozilla") || res.includes("platform.openai") || res.includes("arxiv.org");
              type = isYouTube ? "YouTube" : isGitHub ? "GitHub" : isCourse ? "Course" : isDocs ? "Docs" : "Article";
              name = type;
            } else {
              url = res.url;
              name = res.name || res.title;
              type = res.type || (res.platform ? "Course" : "Article");
            }

            const isYouTube = type === "YouTube" || url.includes("youtube.com") || url.includes("youtu.be");
            const isGitHub = type === "GitHub" || type === "OpenSource" || url.includes("github.com");
            const isCourse = type === "Course" || type === "Courses" || type === "Tutorial + Challenges" || type === "Challenges" || url.includes("coursera");
            const isDocs = type === "Docs" || type === "Book" || type === "eBook" || type === "Paper";
            
            const icon = isYouTube ? "smart_display" : isGitHub ? "code" : isCourse ? "school" : isDocs ? "menu_book" : "article";
            
            const colorClass = "text-slate-600 dark:text-white/60 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10";
            
            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noreferrer"
                title={name}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[0.7rem] font-medium tracking-wide transition-all border max-w-full ${colorClass}`}
              >
                <span className="material-symbols-outlined text-[14px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {icon}
                </span>
                <span className="truncate max-w-[130px] sm:max-w-[200px] md:max-w-[250px]">{name}</span>
                {type && name !== type && (
                  <span className="ml-1 text-[0.65rem] font-bold text-violet-500/80 dark:text-violet-400/80 uppercase shrink-0">
                    {type}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};


const StageCard = ({ stage, stageIndex, onSkillToggle }) => {
  const completedCount = stage.skills.filter((s) => s.done).length;
  const totalCount = stage.skills.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const mockTime = stage.duration || ["10 hrs", "15 hrs", "20 hrs", "12 hrs", "15 hrs", "25 hrs", "20 hrs", "12 hrs", "18 hrs", "5 hrs"][stageIndex] || "10 hrs";

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1f23]/60 p-6 flex flex-col gap-5 hover:border-slate-300 dark:border-white/20 transition-colors shadow-sm">
      {/* Stage Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">
              Stage {stageIndex + 1}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-violet-500">
              {stage.level || "Intermediate"}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {stage.title}
          </h3>
        </div>

        <div className="flex justify-between sm:justify-start items-center gap-2 sm:gap-4 text-sm bg-slate-100 dark:bg-white/5 rounded-xl px-3 sm:px-4 py-2.5 border border-slate-200 dark:border-white/5 w-full md:w-auto">
          <div className="flex flex-col">
            <span className="text-slate-500 dark:text-white/40 text-[0.55rem] sm:text-[0.65rem] uppercase tracking-wider font-bold">
              Duration
            </span>
            <span className="text-slate-900 dark:text-white/90 font-medium text-[0.75rem] sm:text-sm">
              {mockTime}
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col">
            <span className="text-slate-500 dark:text-white/40 text-[0.55rem] sm:text-[0.65rem] uppercase tracking-wider font-bold">
              Difficulty
            </span>
            <span className="text-slate-900 dark:text-white/90 font-medium text-[0.75rem] sm:text-sm">
              {stage.level || "Intermediate"}
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col">
            <span className="text-slate-500 dark:text-white/40 text-[0.55rem] sm:text-[0.65rem] uppercase tracking-wider font-bold">
              Completion
            </span>
            <span className="text-violet-600 font-bold text-[0.75rem] sm:text-sm">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-violet-600 dark:bg-violet-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skills List */}
      <div className="mt-2 flex flex-col">
        <h4 className="text-[0.75rem] uppercase tracking-wider font-bold text-slate-400 dark:text-white/30 mb-3">
          Skills & Resources
        </h4>
        <div className="flex flex-col">
          {stage.skills.map((skill) => (
            <SkillRow key={skill.id} skill={skill} onToggle={onSkillToggle} />
          ))}
        </div>
      </div>
    </div>
  );
};


const RoadmapDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { getAuthHeaders } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("timeline");

  useEffect(() => {
    const loadRoadmap = async () => {
      setLoading(true);
      const importedRoadmap = roadmaps.find(r => r.id === id);
      
      if (!importedRoadmap) {
        router.push('/career-path');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/roadmaps/${id}/progress`, {
          headers: getAuthHeaders()
        });
        const progressData = await res.json();
        
        if (progressData.success && progressData.data) {
          const completedNodes = progressData.data.completedNodes || [];
          
          // Deep clone to avoid mutating the original imported object across navigations
          const updatedRoadmap = JSON.parse(JSON.stringify(importedRoadmap));
          updatedRoadmap.stages = updatedRoadmap.stages.map(stage => ({
            ...stage,
            skills: stage.skills.map(skill => ({
              ...skill,
              done: completedNodes.includes(skill.id)
            }))
          }));
          setRoadmap(updatedRoadmap);
        } else {
          setRoadmap(JSON.parse(JSON.stringify(importedRoadmap)));
        }
      } catch (err) {
         console.error("Error fetching roadmap progress", err);
         setRoadmap(JSON.parse(JSON.stringify(importedRoadmap)));
      }
      setLoading(false);
    };
    
    loadRoadmap();
  }, [id, router, getAuthHeaders]);

  if (loading || !roadmap) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 dark:text-white/40">Loading roadmap...</p>
      </div>
    );
  }

  const handleSkillToggle = async (skillId) => {
    // 1. Calculate updated roadmap synchronously
    const updatedRoadmap = { ...roadmap };
    updatedRoadmap.stages = updatedRoadmap.stages.map((stage) => {
      const found = stage.skills.find((s) => s.id === skillId);
      if (found) {
        return {
          ...stage,
          skills: stage.skills.map((s) =>
            s.id === skillId ? { ...s, done: !s.done } : s,
          ),
        };
      }
      return stage;
    });

    // 2. Set the state
    setRoadmap(updatedRoadmap);

    // 3. Compute progress
    const completedNodes = [];
    let totalSkills = 0;
    updatedRoadmap.stages.forEach(stage => {
      stage.skills.forEach(s => {
        totalSkills++;
        if (s.done) completedNodes.push(s.id);
      });
    });
    const progressPercentage = totalSkills > 0 ? Math.round((completedNodes.length / totalSkills) * 100) : 0;

    // 4. Save to backend
    try {
      await fetch(`${API_URL}/roadmaps/${id}/progress`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completedNodes, progressPercentage })
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const totalSkills = roadmap.stages.reduce(
    (acc, stage) => acc + (stage.skills ? stage.skills.length : 0),
    0
  );
  const completedSkills = roadmap.stages.reduce(
    (acc, stage) => acc + (stage.skills ? stage.skills.filter((s) => s.done).length : 0),
    0
  );
  const overallProgress =
    totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;

  // Find next milestone
  let nextMilestone = "All Completed!";
  for (const stage of roadmap.stages) {
    if (stage.skills && stage.skills.some((s) => !s.done)) {
      nextMilestone = stage.title;
      break;
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 pb-20 pt-8 px-4 md:px-8">
      {/* Back button */}
      <button
        onClick={() => router.push("/career-path")}
        className="flex items-center gap-2 text-slate-500 dark:text-white/40 hover:text-slate-700 dark:text-white/80 text-sm font-medium transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">
          arrow_back
        </span>
        Back to Roadmaps
      </button>

      {/* Centered Hero Section */}
      <div className="flex flex-col items-center text-center space-y-6 pt-4 pb-8 border-b border-slate-200 dark:border-white/5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 text-[0.7rem] font-bold uppercase tracking-widest">
          <span className="material-symbols-outlined text-[14px]">route</span>
          Career Path
        </div>

        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 max-w-4xl text-center md:text-left">
          {roadmap.icon && <span className="material-symbols-outlined text-[40px] md:text-[48px] text-violet-600 shrink-0">{roadmap.icon}</span>}
          <span className="leading-[1.15]">{roadmap.title}</span>
        </h1>

        <div className="flex items-center justify-center gap-4 text-slate-500 dark:text-white/50 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">code</span>{" "}
            {totalSkills} Skills
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              view_agenda
            </span>{" "}
            {roadmap.stages_count || roadmap.stages.length} Stages
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              schedule
            </span>{" "}
            {roadmap.estimated_time || roadmap.time}
          </span>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center bg-slate-100 dark:bg-[#1a1b1e] p-1 rounded-xl border border-slate-200 dark:border-white/10">
          <button
            onClick={() => setViewMode("timeline")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[0.85rem] font-semibold transition-all ${
              viewMode === "timeline"
                ? "bg-white dark:bg-[#24252a] text-slate-900 dark:text-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-200/50 dark:border-white/10"
                : "text-slate-500 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/70"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            Interactive Timeline
          </button>
          <button
            onClick={() => setViewMode("visual")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[0.85rem] font-semibold transition-all ${
              viewMode === "visual"
                ? "bg-white dark:bg-[#24252a] text-slate-900 dark:text-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-200/50 dark:border-white/10"
                : "text-slate-500 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/70"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">account_tree</span>
            Visual Diagram
          </button>
        </div>
      </div>

      {viewMode === "timeline" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Learning Stages Timeline */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Roadmap Timeline
              </h2>
            </div>
            {roadmap.stages.map((stage, i) => (
              <StageCard
                key={stage.id}
                stage={stage}
                stageIndex={i}
                onSkillToggle={handleSkillToggle}
              />
            ))}

            {/* Paid Resources Disclaimer */}
            <div className="mt-10 p-5 rounded-xl border border-violet-500/20 bg-violet-500/5 flex gap-4 items-start">
              <span className="material-symbols-outlined text-violet-600 mt-0.5">info</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Looking for Paid Certificates?</h4>
                <p className="text-[0.8rem] text-slate-600 dark:text-white/60 leading-relaxed">
                  The resources curated in this roadmap are highly vetted, free materials to ensure education is accessible to everyone. If you need formal, university-backed certificates for your resume, we highly recommend searching for these exact topic names on platforms like <strong className="text-slate-800 dark:text-white/90">Coursera</strong> or <strong className="text-slate-800 dark:text-white/90">Udemy</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Analytics / Readiness Widget */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 lg:mt-9">
            {/* Career Readiness Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#1e1f23] dark:to-[#17181c] shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 space-y-6">
              <h3 className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">
                Career Readiness
              </h3>

              <div className="flex flex-col items-center justify-center py-4">
                {/* Circular Progress */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-100 dark:text-white/5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${251.2}`}
                      strokeDashoffset={`${251.2 - (251.2 * overallProgress) / 100}`}
                      className="text-violet-600 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {overallProgress}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.8rem] text-slate-500 dark:text-white/50 font-medium">
                    Skills Completed
                  </span>
                  <span className="text-[0.85rem] text-slate-900 dark:text-white font-bold">
                    {completedSkills} / {totalSkills}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.8rem] text-slate-500 dark:text-white/50 font-medium">
                    Next Milestone
                  </span>
                  <span className="text-[0.85rem] text-slate-900 dark:text-white font-bold text-right">
                    {nextMilestone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Insights / Achievements */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1e1f23]/40 border border-slate-200 dark:border-white/5 space-y-4">
              <h3 className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">
                Insights
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">
                      trending_up
                    </span>
                  </div>
                  <div className="space-y-0.5 pt-1">
                    <p className="text-[0.8rem] text-slate-900 dark:text-white font-bold leading-tight">
                      Top 15% Pace
                    </p>
                    <p className="text-[0.7rem] text-slate-500 dark:text-white/40 leading-relaxed">
                      You are completing skills faster than average.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-cyan-600">
                      workspace_premium
                    </span>
                  </div>
                  <div className="space-y-0.5 pt-1">
                    <p className="text-[0.8rem] text-slate-900 dark:text-white font-bold leading-tight">
                      Solid Foundation
                    </p>
                    <p className="text-[0.7rem] text-slate-500 dark:text-white/40 leading-relaxed">
                      Core fundamentals mastered completely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mt-4 fade-in">
          <RoadmapDiagram roadmapData={roadmap} onSkillToggle={handleSkillToggle} />
        </div>
      )}
    </div>
  );
};

export default RoadmapDetail;
