import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roadmaps } from '../../data/roadmaps';

const SkillRow = ({ skill, onToggle }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/5 last:border-0 gap-3">
            <div className="flex items-start gap-3">
                <button 
                    onClick={() => onToggle(skill.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        skill.done 
                        ? 'bg-violet-600 border-violet-600 text-white' 
                        : 'border-white/20 hover:border-white/40 bg-white/5'
                    }`}
                >
                    {skill.done && (
                        <span 
                            className="material-symbols-outlined text-white leading-[0]" 
                            style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1, 'wght' 700", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            check
                        </span>
                    )}
                </button>
                <div>
                    <p className={`text-[0.9rem] font-medium leading-tight ${skill.done ? 'text-white/40 line-through' : 'text-white/90'}`}>
                        {skill.name}
                    </p>
                </div>
            </div>
            {skill.resources?.length > 0 && (
                <div className="flex gap-2 pl-8 sm:pl-0">
                    {skill.resources.map((res, idx) => (
                        <a
                            key={idx}
                            href={res}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[0.75rem] font-medium text-white/60 hover:text-white transition-all border border-white/5"
                        >
                            <span className="material-symbols-outlined text-[12px]">link</span>
                            Resource
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

const StageCard = ({ stage, stageIndex, roadmapColor, onSkillToggle }) => {
    const completedCount = stage.skills.filter(s => s.done).length;
    const totalCount = stage.skills.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    // Mock time based on stage index
    const mockTime = ['2 Weeks', '3 Weeks', '4 Weeks', '2 Weeks'][stageIndex % 4];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#1e1f23]/60 p-6 flex flex-col gap-5 hover:border-white/20 transition-colors">
            {/* Stage Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">
                            Stage {stageIndex + 1}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-violet-400">
                            {stage.level || 'Intermediate'}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        {stage.title}
                    </h3>
                </div>
                
                <div className="flex items-center gap-4 text-sm bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                    <div className="flex flex-col">
                        <span className="text-white/40 text-[0.65rem] uppercase tracking-wider font-bold">Duration</span>
                        <span className="text-white/90 font-medium">{mockTime}</span>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-white/40 text-[0.65rem] uppercase tracking-wider font-bold">Difficulty</span>
                        <span className="text-white/90 font-medium">{stage.level || 'Intermediate'}</span>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-white/40 text-[0.65rem] uppercase tracking-wider font-bold">Completion</span>
                        <span className="text-violet-400 font-bold">{progress}%</span>
                    </div>
                </div>
            </div>

            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${roadmapColor} rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Skills List */}
            <div className="mt-2 flex flex-col">
                <h4 className="text-[0.75rem] uppercase tracking-wider font-bold text-white/30 mb-3">Skills & Resources</h4>
                <div className="flex flex-col">
                    {stage.skills.map(skill => (
                        <SkillRow key={skill.id} skill={skill} onToggle={onSkillToggle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const RoadmapDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [localRoadmaps, setLocalRoadmaps] = useState(roadmaps);

    const roadmapIndex = localRoadmaps.findIndex(r => r.id === id);
    const roadmap = localRoadmaps[roadmapIndex];

    if (!roadmap) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="material-symbols-outlined text-5xl text-white/20">map_off</span>
                <p className="text-white/40">Roadmap not found.</p>
                <button onClick={() => navigate('/career-path')} className="text-violet-400 hover:underline text-sm">← Back to Roadmaps</button>
            </div>
        );
    }

    const handleSkillToggle = (skillId) => {
        setLocalRoadmaps(prev => {
            const updated = [...prev];
            const currentR = { ...updated[roadmapIndex] };
            currentR.stages = currentR.stages.map(stage => {
                const found = stage.skills.find(s => s.id === skillId);
                if (found) {
                    return {
                        ...stage,
                        skills: stage.skills.map(s => s.id === skillId ? { ...s, done: !s.done } : s)
                    };
                }
                return stage;
            });
            updated[roadmapIndex] = currentR;
            return updated;
        });
    };

    const totalSkills = roadmap.stages.reduce((acc, stage) => acc + stage.skills.length, 0);
    const completedSkills = roadmap.stages.reduce((acc, stage) => acc + stage.skills.filter(s => s.done).length, 0);
    const overallProgress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
    
    // Find next milestone
    let nextMilestone = "All Completed!";
    for (const stage of roadmap.stages) {
        if (stage.skills.some(s => !s.done)) {
            nextMilestone = stage.title;
            break;
        }
    }

    return (
        <div className="w-full max-w-[1500px] mx-auto space-y-10 pb-20">
            {/* Back button */}
            <button
                onClick={() => navigate('/career-path')}
                className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-medium transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Roadmaps
            </button>

            {/* Centered Hero Section */}
            <div className="flex flex-col items-center text-center space-y-6 pt-4 pb-8 border-b border-white/5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[0.7rem] font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[14px]">route</span>
                    Career Path
                </div>
                
                <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    {roadmap.title}
                </h1>
                
                <div className="flex items-center justify-center gap-4 text-white/50 text-sm font-medium">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">code</span> {totalSkills} Skills</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">view_agenda</span> {roadmap.stageCount} Stages</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">schedule</span> {roadmap.time}</span>
                </div>
            </div>

            {/* 2-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Learning Stages Timeline */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-white tracking-tight">Roadmap Timeline</h2>
                    </div>
                    {roadmap.stages.map((stage, i) => (
                        <StageCard
                            key={stage.id}
                            stage={stage}
                            stageIndex={i}
                            roadmapColor={roadmap.color}
                            onSkillToggle={handleSkillToggle}
                        />
                    ))}
                </div>

                {/* Right: Analytics / Readiness Widget */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 lg:mt-9">
                    {/* Career Readiness Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1e1f23] to-[#17181c] border border-white/10 shadow-xl space-y-6">
                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Career Readiness</h3>
                        
                        <div className="flex flex-col items-center justify-center py-4">
                            {/* Circular Progress */}
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                        strokeDasharray={`${251.2}`} 
                                        strokeDashoffset={`${251.2 - (251.2 * overallProgress) / 100}`} 
                                        className="text-violet-500 transition-all duration-1000 ease-out" 
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-white tracking-tighter">{overallProgress}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <span className="text-[0.8rem] text-white/50 font-medium">Skills Completed</span>
                                <span className="text-[0.85rem] text-white font-bold">{completedSkills} / {totalSkills}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[0.8rem] text-white/50 font-medium">Next Milestone</span>
                                <span className="text-[0.85rem] text-white font-bold text-right">{nextMilestone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Insights / Achievements */}
                    <div className="p-6 rounded-2xl bg-[#1e1f23]/40 border border-white/5 space-y-4">
                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Insights</h3>
                        <div className="space-y-3">
                            <div className="flex gap-3.5 items-start">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-400">trending_up</span>
                                </div>
                                <div className="space-y-0.5 pt-1">
                                    <p className="text-[0.8rem] text-white font-bold leading-tight">Top 15% Pace</p>
                                    <p className="text-[0.7rem] text-white/40 leading-relaxed">You are completing skills faster than average.</p>
                                </div>
                            </div>
                            <div className="flex gap-3.5 items-start">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[16px] text-cyan-400">workspace_premium</span>
                                </div>
                                <div className="space-y-0.5 pt-1">
                                    <p className="text-[0.8rem] text-white font-bold leading-tight">Solid Foundation</p>
                                    <p className="text-[0.7rem] text-white/40 leading-relaxed">HTML & CSS basics mastered completely.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoadmapDetail;
