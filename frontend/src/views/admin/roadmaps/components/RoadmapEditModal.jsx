import React, { useState, useEffect } from "react";

const TABS = ["Details", "Stages & Skills", "Resources", "Analytics"];

const TAB_ICONS = {
  Details: "info",
  "Stages & Skills": "account_tree",
  Resources: "menu_book",
  Analytics: "bar_chart",
};

const RoadmapEditModal = ({ roadmap, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("Details");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [duration, setDuration] = useState("6");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (roadmap) {
      setTitle(roadmap.title || "");
      setDescription(roadmap.description || "");
      setCategory(roadmap.category || "Engineering");
      setDuration(roadmap.duration || "6");
      setIsPublished(true);
      setActiveTab("Details");
    }
  }, [roadmap]);

  if (!roadmap) return null;

  const handleSave = () => {
    onSave({ ...roadmap, title, description, category, duration, isPublished });
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal Box */}
      <div className="bg-[#16181f] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="font-headline text-xl font-bold text-white">
              Edit Roadmap — {roadmap.title}
            </h2>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">
              Version 2.4.1 • Last Synced 2H Ago
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/70 hover:text-white text-xs font-bold transition-all"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#814df3] to-[#5d21df] text-white text-xs font-black shadow-[0_4px_15px_rgba(93,33,223,0.3)] hover:opacity-90 transition-all"
            >
              Save & Publish
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 px-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 py-4 px-4 text-[11px] font-bold uppercase tracking-widest transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-white border-violet-500"
                  : "text-white/30 border-transparent hover:text-white/60"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {TAB_ICONS[tab]}
              </span>
              <span className="hidden sm:block">{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "Details" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Form */}
              <div className="lg:col-span-3 space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Roadmap Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe this career roadmap..."
                    className="w-full bg-white/5 border border-white/8 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
                  />
                </div>

                {/* Category + Duration Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Data Science">Data Science</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Blockchain">Blockchain</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-[18px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                      Duration
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/8 rounded-l-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                      />
                      <div className="bg-white/5 border border-l-0 border-white/8 rounded-r-xl px-4 py-3 text-sm text-white/40 font-medium">
                        Months
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Icon + Status */}
              <div className="lg:col-span-2 space-y-5">
                {/* Icon Picker */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Roadmap Icon
                  </label>
                  <div className="bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[150px]">
                    <span className="material-symbols-outlined text-[48px] text-violet-400">
                      terminal
                    </span>
                    <button className="text-[11px] font-bold text-white/40 hover:text-white/80 transition-colors">
                      Change Icon
                    </button>
                  </div>
                </div>

                {/* Publication Status */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    Publication Status
                  </label>
                  <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isPublished ? "bg-[#00daf3]" : "bg-white/20"}`}></span>
                      <span className={`text-sm font-bold ${isPublished ? "text-[#00daf3]" : "text-white/40"}`}>
                        {isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => setIsPublished(!isPublished)}
                      className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                        isPublished ? "bg-violet-600" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
                          isPublished ? "left-[calc(100%-22px)]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Stages & Skills" && (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <span className="material-symbols-outlined text-[48px] text-white/10">account_tree</span>
                <p className="text-white/30 text-sm mt-2">Stage builder coming soon.</p>
              </div>
            </div>
          )}

          {activeTab === "Resources" && (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <span className="material-symbols-outlined text-[48px] text-white/10">menu_book</span>
                <p className="text-white/30 text-sm mt-2">Resources editor coming soon.</p>
              </div>
            </div>
          )}

          {activeTab === "Analytics" && (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <span className="material-symbols-outlined text-[48px] text-white/10">bar_chart</span>
                <p className="text-white/30 text-sm mt-2">Analytics dashboard coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapEditModal;
