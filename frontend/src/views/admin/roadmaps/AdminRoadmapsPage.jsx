import React, { useState } from "react";
import RoadmapCard from "./components/RoadmapCard";
import RoadmapEditModal from "./components/RoadmapEditModal";

const ROADMAPS_DATA = [
  {
    id: "rm1",
    title: "Frontend Architect",
    icon: "html",
    skills: 12,
    stages: 4,
    enrolled: 384,
    completion: 72,
    accentColor: "#00daf3",
    completionColor: "#00ffcc",
    category: "Engineering",
    duration: "6",
    description:
      "Master the art of building immersive web interfaces. This comprehensive guide covers everything from semantic HTML and modern CSS layouts to advanced JavaScript ecosystems and performance optimization. Designed for architects who build the future of the web.",
  },
  {
    id: "rm2",
    title: "Data Scientist",
    icon: "storage",
    skills: 18,
    stages: 5,
    enrolled: 512,
    completion: 65,
    accentColor: "#a78bfa",
    completionColor: "#c4b5fd",
    category: "Data Science",
    duration: "8",
    description:
      "Dive deep into data analysis, machine learning pipelines, statistical modeling, and visualization tools used by top-tier data teams worldwide.",
  },
  {
    id: "rm3",
    title: "AI Systems Engineer",
    icon: "psychology",
    skills: 24,
    stages: 6,
    enrolled: 920,
    completion: 48,
    accentColor: "#8b5cf6",
    completionColor: "#a78bfa",
    category: "Engineering",
    duration: "10",
    description:
      "Build scalable AI systems from scratch. From transformer architectures to MLOps pipelines, this roadmap targets engineers who deploy production-grade AI.",
  },
  {
    id: "rm4",
    title: "Product Designer",
    icon: "brush",
    skills: 10,
    stages: 3,
    enrolled: 256,
    completion: 84,
    accentColor: "#f59e0b",
    completionColor: "#fbbf24",
    category: "Design",
    duration: "5",
    description:
      "Learn the end-to-end product design process — from user research and wireframing to high-fidelity prototyping and design systems.",
  },
  {
    id: "rm5",
    title: "Cloud Architect",
    icon: "cloud",
    skills: 15,
    stages: 4,
    enrolled: 412,
    completion: 78,
    accentColor: "#00daf3",
    completionColor: "#67e8f9",
    category: "DevOps",
    duration: "7",
    description:
      "Master AWS, GCP, and Azure architectures. Design resilient, scalable cloud solutions with a focus on cost efficiency and security.",
  },
  {
    id: "rm6",
    title: "Cybersecurity Specialist",
    icon: "security",
    skills: 20,
    stages: 5,
    enrolled: 295,
    completion: 55,
    accentColor: "#ef4444",
    completionColor: "#f87171",
    category: "Cybersecurity",
    duration: "9",
    description:
      "Develop expertise in ethical hacking, network defense, penetration testing, and threat intelligence for enterprise-grade security operations.",
  },
  {
    id: "rm7",
    title: "Blockchain Developer",
    icon: "hub",
    skills: 14,
    stages: 4,
    enrolled: 182,
    completion: 61,
    accentColor: "#00daf3",
    completionColor: "#22d3ee",
    category: "Blockchain",
    duration: "7",
    description:
      "Build smart contracts, dApps, and DeFi protocols on Ethereum and beyond. Covers Solidity, Web3.js, and blockchain architecture patterns.",
  },
  {
    id: "rm8",
    title: "ML Operations",
    icon: "model_training",
    skills: 22,
    stages: 6,
    enrolled: 445,
    completion: 42,
    accentColor: "#a78bfa",
    completionColor: "#818cf8",
    category: "Data Science",
    duration: "9",
    description:
      "Bridge the gap between data science and engineering. Learn CI/CD for ML, experiment tracking, model monitoring, and serving infrastructure.",
  },
  {
    id: "rm9",
    title: "Backend Systems",
    icon: "terminal",
    skills: 16,
    stages: 4,
    enrolled: 628,
    completion: 79,
    accentColor: "#10b981",
    completionColor: "#34d399",
    category: "Engineering",
    duration: "6",
    description:
      "Build high-performance APIs, distributed systems, and microservice architectures using Node.js, Go, and PostgreSQL.",
  },
];

const AdminRoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState(ROADMAPS_DATA);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const totalEnrollments = roadmaps.reduce((sum, r) => sum + r.enrolled, 0);
  const avgCompletion = Math.round(
    roadmaps.reduce((sum, r) => sum + r.completion, 0) / roadmaps.length
  );
  const fullCompletions = 312;

  const filteredRoadmaps = roadmaps.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (updated) => {
    setRoadmaps((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  return (
    <div className="space-y-6 min-h-full bg-[#0f1117] dark:bg-[#0f1117] -m-6 md:-m-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-headline text-white">
            Roadmap Management
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 flex-1 sm:flex-none sm:w-52">
            <span className="material-symbols-outlined text-white/30 text-[16px]">search</span>
            <input
              type="text"
              placeholder="Search roadmaps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-white/80 text-xs placeholder:text-white/20 w-full"
            />
          </div>
          {/* Bell */}
          <button className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/8 rounded-xl text-white/40 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">notifications</span>
          </button>
          {/* Help */}
          <button className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/8 rounded-xl text-white/40 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">help_outline</span>
          </button>
          {/* Add Roadmap CTA */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#814df3] to-[#5d21df] hover:opacity-90 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-[0_4px_15px_rgba(93,33,223,0.35)] transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span className="hidden sm:block">Add New Roadmap</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Roadmaps */}
        <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">
            TOTAL ROADMAPS
          </p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-headline font-black text-white">
              {roadmaps.length}
            </span>
            <span className="text-[11px] font-bold text-[#00daf3] mb-0.5">
              +2 this month
            </span>
          </div>
        </div>

        {/* Total Enrollments */}
        <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">
            TOTAL ENROLLMENTS
          </p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-headline font-black text-[#00daf3]">
              {totalEnrollments.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-[#00daf3] mb-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span>
              12%
            </span>
          </div>
        </div>

        {/* Avg Completion */}
        <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">
            AVG COMPLETION RATE
          </p>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-headline font-black text-white">
              {avgCompletion}%
            </span>
            <div className="flex-1 mb-1.5">
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00daf3] to-[#814df3] rounded-full"
                  style={{ width: `${avgCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Completions */}
        <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-3">
            FULL COMPLETIONS
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-headline font-black text-white">
              {fullCompletions}
            </span>
            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
              <span className="material-symbols-outlined text-violet-400 text-[20px]">
                workspace_premium
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredRoadmaps.length > 0 ? (
          filteredRoadmaps.map((roadmap) => (
            <RoadmapCard
              key={roadmap.id}
              roadmap={roadmap}
              onEdit={(rm) => setEditingRoadmap(rm)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-[48px] text-white/10 mb-3">route</span>
            <p className="text-white/30 text-sm">No roadmaps matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingRoadmap && (
        <RoadmapEditModal
          roadmap={editingRoadmap}
          onClose={() => setEditingRoadmap(null)}
          onSave={handleSave}
        />
      )}

      {/* Add Roadmap Modal (reuse edit with blank data) */}
      {showAddModal && (
        <RoadmapEditModal
          roadmap={{
            id: `rm${Date.now()}`,
            title: "New Roadmap",
            icon: "route",
            skills: 0,
            stages: 0,
            enrolled: 0,
            completion: 0,
            accentColor: "#814df3",
            completionColor: "#a78bfa",
            category: "Engineering",
            duration: "6",
            description: "",
          }}
          onClose={() => setShowAddModal(false)}
          onSave={(newRM) => {
            setRoadmaps((prev) => [newRM, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminRoadmapsPage;
