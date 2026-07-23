import React from "react";

const RoadmapCard = ({ roadmap, onEdit }) => {
  const { title, icon, skills, stages, enrolled, completion, completionColor, accentColor } = roadmap;

  return (
    <div
      className={`relative bg-[#1a1c23] dark:bg-[#1a1c23] rounded-2xl p-5 border border-white/5 flex flex-col gap-3 overflow-hidden group hover:border-white/10 transition-all duration-300`}
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ color: accentColor }}>
            {icon}
          </span>
        </div>
        {/* Published Badge */}
        <span className="bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
          Published
        </span>
      </div>

      {/* Title & Meta */}
      <div>
        <h3 className="font-headline font-bold text-white text-[15px] leading-snug">
          {title}
        </h3>
        <p className="text-[11px] text-white/40 mt-0.5 font-medium">
          {skills} Skills • {stages} Stages
        </p>
      </div>

      {/* Enrolled */}
      <div className="flex items-center gap-2 text-[11px] text-white/50 font-medium">
        <span className="material-symbols-outlined text-[14px]">group</span>
        {enrolled.toLocaleString()} users enrolled
      </div>

      {/* Completion Bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
            COMPLETION
          </span>
          <span className="text-[11px] font-black" style={{ color: accentColor }}>
            {completion}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${completion}%`, background: `linear-gradient(90deg, ${accentColor}, ${completionColor})` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => onEdit(roadmap)}
          className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white/70 hover:text-white text-xs font-semibold py-2 rounded-xl transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[14px]">edit</span>
          Edit
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white/50 hover:text-white rounded-xl transition-all duration-200">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white/50 hover:text-white rounded-xl transition-all duration-200">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
        </button>
      </div>
    </div>
  );
};

export default RoadmapCard;
