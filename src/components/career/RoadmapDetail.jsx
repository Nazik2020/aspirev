import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roadmaps } from '../../data/roadmaps';
import spotlightImg from '../../assets/community_spotlight.png';

const levelLabels = {
    's1': 'Basics / BEGINNER',
    's2': 'Layouts / INTERMEDIATE',
    's3': 'Design / INTERMEDIATE',
    's4': 'Basics / BEGINNER',
    's5': 'DOM / INTERMEDIATE',
    's6': 'Async / INTERMEDIATE',
    's7': 'API / INTERMEDIATE',
    's8': 'ES6 / INTERMEDIATE',
    's9': 'Components / BEGINNER',
    's10': 'Hooks / INTERMEDIATE',
    's11': 'State / INTERMEDIATE',
    's12': 'Testing / ADVANCED',
};

const SkillRow = ({ skill, onToggle }) => {
    const subtitle = levelLabels[skill.id] || 'Skill / INTERMEDIATE';

    return (
        <div
            onClick={() => onToggle(skill.id)}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border
                ${skill.done
                    ? 'bg-[#252830]/40 border-secondary-fixed-dim/20 hover:bg-[#2c303c]/40'
                    : 'bg-[#1e1f23]/60 border-white/5 hover:bg-[#24252a]/60 hover:border-white/10'}`}
        >
            <div className="flex items-center gap-4 min-w-0">
                {/* Checkbox */}
                <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                        ${skill.done
                            ? 'bg-gradient-to-br from-primary-container to-secondary-container border-transparent'
                            : 'border-white/20'}`}
                >
                    {skill.done && (
                        <span className="material-symbols-outlined text-[14px] text-white font-bold">
                            check
                        </span>
                    )}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className={`text-[0.9rem] font-bold tracking-tight leading-tight ${skill.done ? 'text-white/50 line-through' : 'text-white/90'}`}>
                        {skill.name}
                    </span>
                    <span className="text-[0.7rem] text-white/30 font-semibold tracking-wider uppercase mt-0.5">
                        {subtitle}
                    </span>
                </div>
            </div>

            {skill.resources?.length > 0 && (
                <a
                    href={skill.resources[0]}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="px-4 py-1.5 rounded-lg bg-[#2e3037]/80 hover:bg-[#383a42] text-[0.75rem] font-bold text-white/70 hover:text-white transition-all border border-white/5 shrink-0"
                >
                    Resources
                </a>
            )}
        </div>
    );
};

const StageAccordion = ({ stage, stageIndex, roadmapColor, onSkillToggle }) => {
    const [open, setOpen] = useState(stageIndex === 0);
    const completedCount = stage.skills.filter(s => s.done).length;
    const totalCount = stage.skills.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isCompleted = progress === 100;

    return (
        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden
            ${open ? 'border-white/10 bg-[#1e1f23]' : 'border-white/5 bg-[#17181c] hover:border-white/8'}`}>
            {/* Header */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[0.65rem] text-white/30 font-bold uppercase tracking-widest leading-none mb-1">
                            STAGE {stageIndex + 1}
                        </span>
                        <h3 className="text-[1.1rem] font-extrabold text-white/95 tracking-tight">
                            {stage.title}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    {/* Progress details */}
                    <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${roadmapColor} rounded-full transition-all duration-500`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-[0.7rem] text-white/40 font-bold">{completedCount}/{totalCount}</span>
                        </div>
                        {isCompleted && (
                            <span className="text-[0.6rem] uppercase tracking-widest font-black text-secondary-fixed-dim bg-secondary-fixed-dim/10 px-2 py-0.5 rounded-full border border-secondary-fixed-dim/20 leading-none">
                                COMPLETED
                            </span>
                        )}
                    </div>

                    <span className={`material-symbols-outlined text-white/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </button>

            {/* Expandable Skills List */}
            {open && (
                <div className="px-5 pb-5 flex flex-col gap-2 border-t border-white/5 pt-4">
                    {stage.skills.map(skill => (
                        <SkillRow key={skill.id} skill={skill} onToggle={onSkillToggle} />
                    ))}
                </div>
            )}
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
                <button onClick={() => navigate('/career-path')} className="text-primary hover:underline text-sm">← Back to Roadmaps</button>
            </div>
        );
    }

    // Handlers for interactive skill toggles
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

    // Calculate total progress
    const totalSkills = roadmap.stages.reduce((acc, stage) => acc + stage.skills.length, 0);
    const completedSkills = roadmap.stages.reduce((acc, stage) => acc + stage.skills.filter(s => s.done).length, 0);
    const overallProgress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;

    return (
        <div className="w-full space-y-8">
            {/* Back button */}
            <button
                onClick={() => navigate('/career-path')}
                className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-medium transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                </span>
                Back to Roadmaps
            </button>

            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
                <div className="flex items-start gap-5 max-w-2xl">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 shrink-0">
                        <span className="text-[1.375rem] font-black text-violet-300">HTML</span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            {roadmap.title}
                        </h1>
                        <p className="text-white/50 text-[0.9rem] leading-relaxed">
                            {roadmap.description}
                        </p>
                    </div>
                </div>

                {/* Stats Widget */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#1e1f23]/60 border border-white/5 shrink-0 self-start lg:self-center">
                    <div className="px-5 py-3 flex flex-col items-center">
                        <span className="text-[1.25rem] font-extrabold text-white tracking-tight">{totalSkills}</span>
                        <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mt-0.5">Skills</span>
                    </div>
                    <div className="w-px h-8 bg-white/5" />
                    <div className="px-5 py-3 flex flex-col items-center">
                        <span className="text-[1.25rem] font-extrabold text-white tracking-tight">{roadmap.stageCount}</span>
                        <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mt-0.5">Stages</span>
                    </div>
                    <div className="w-px h-8 bg-white/5" />
                    <div className="px-5 py-3 flex flex-col items-center">
                        <span className="text-[1.25rem] font-extrabold text-white tracking-tight">{roadmap.time}</span>
                        <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mt-0.5">Time</span>
                    </div>
                </div>
            </div>

            {/* Overall Progress Section */}
            <div className="p-6 rounded-2xl bg-[#1e1f23]/60 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-white/30">Your Progress</span>
                    <span className="text-white/80">{completedSkills} of {totalSkills} skills learned</span>
                </div>
                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${overallProgress}%` }}
                    />
                </div>
            </div>

            {/* 2-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Left: Learning Stages */}
                <div className="lg:col-span-2 space-y-4">
                    {roadmap.stages.map((stage, i) => (
                        <StageAccordion
                            key={stage.id}
                            stage={stage}
                            stageIndex={i}
                            roadmapColor={roadmap.color}
                            onSkillToggle={handleSkillToggle}
                        />
                    ))}
                </div>

                {/* Right: Sidebar widgets */}
                <div className="space-y-6">
                    {/* Widget 1: Learning Guide */}
                    <div className="p-5 rounded-2xl bg-[#1e1f23]/60 border border-white/5 space-y-5">
                        <h3 className="text-[1.1rem] font-extrabold text-white/90 tracking-tight">
                            Learning Guide
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3.5 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[16px] text-white/60">my_location</span>
                                </div>
                                <p className="text-[0.8rem] text-white/60 leading-relaxed pt-0.5">
                                    Focus on <strong className="text-white">Flexbox and Grid</strong> this week to complete the 'Modern CSS' module.
                                </p>
                            </div>
                            <div className="flex gap-3.5 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[16px] text-white/60">groups</span>
                                </div>
                                <p className="text-[0.8rem] text-white/60 leading-relaxed pt-0.5">
                                    Join the <strong className="text-white">Frontend Friday</strong> workshop to practice with mentors.
                                </p>
                            </div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[0.85rem] font-bold text-white/80 hover:text-white transition-all">
                            Ask a Mentor
                        </button>
                    </div>

                    {/* Widget 2: Community Spotlight */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 group h-64 flex flex-col justify-end p-5">
                        {/* Background Image */}
                        <img
                            src={spotlightImg}
                            alt="Community Spotlight"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 space-y-2">
                            <span className="inline-block text-[0.6rem] uppercase tracking-widest font-black bg-gradient-to-r from-violet-500 to-cyan-400 text-white px-2.5 py-0.5 rounded-full">
                                Community Spotlight
                            </span>
                            <h4 className="text-[1.1rem] font-extrabold text-white tracking-tight leading-snug">
                                Sarah's Portfolio Build
                            </h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoadmapDetail;
