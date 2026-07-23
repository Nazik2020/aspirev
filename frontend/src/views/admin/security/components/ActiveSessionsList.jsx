import React, { useState } from "react";

const SESSIONS = [
  {
    id: 1,
    initials: "AR",
    name: "Alex Rivera",
    location: "Colombo, Sri Lanka",
    lastSeen: "Active now",
    isActive: true,
    avatarColor: "from-violet-600 to-violet-800",
    device: "desktop_windows",
  },
  {
    id: 2,
    initials: "SC",
    name: "Sarah Chen",
    location: "San Francisco, USA",
    lastSeen: "12m ago",
    isActive: false,
    avatarColor: "from-cyan-600 to-cyan-800",
    device: "phone_iphone",
  },
  {
    id: 3,
    initials: "MT",
    name: "Marcus Thorne",
    location: "London, UK",
    lastSeen: "45m ago",
    isActive: false,
    avatarColor: "from-emerald-600 to-emerald-800",
    device: "laptop_mac",
  },
  {
    id: 4,
    initials: "JL",
    name: "Jordan Li",
    location: "Tokyo, Japan",
    lastSeen: "2h ago",
    isActive: false,
    avatarColor: "from-amber-600 to-amber-800",
    device: "desktop_windows",
  },
];

const ActiveSessionsList = () => {
  const [sessions, setSessions] = useState(SESSIONS);
  const [forcedOut, setForcedOut] = useState(false);

  const forceLogoutOne = (id) =>
    setSessions((prev) => prev.filter((s) => s.id !== id));

  const forceLogoutAll = () => {
    setSessions([]);
    setForcedOut(true);
  };

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h3 className="text-sm font-bold text-white">Active User Sessions</h3>
        <span className="text-[10px] font-black text-[#00daf3] bg-[#00daf3]/10 border border-[#00daf3]/20 px-2.5 py-0.5 rounded-full">
          {sessions.length} Total
        </span>
      </div>

      {/* Session Rows */}
      <div className="divide-y divide-white/[0.04] max-h-[300px] overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="material-symbols-outlined text-[36px] text-white/10 mb-2">
              no_accounts
            </span>
            <p className="text-white/30 text-xs">All sessions have been terminated</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${session.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                {session.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-white truncate">
                    {session.name}
                  </span>
                  <span className="material-symbols-outlined text-white/20 text-[14px]">
                    {session.device}
                  </span>
                </div>
                <div className="text-[10px] text-white/35 mt-0.5 truncate">
                  {session.location} •{" "}
                  <span className={session.isActive ? "text-emerald-400" : ""}>
                    {session.lastSeen}
                  </span>
                </div>
              </div>

              {/* Kick Session */}
              <button
                onClick={() => forceLogoutOne(session.id)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500/15 text-white/30 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-all shrink-0"
                title="Force logout this session"
              >
                <span className="material-symbols-outlined text-[15px]">logout</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Force Logout All */}
      <div className="px-5 py-4 border-t border-white/5">
        <button
          onClick={forceLogoutAll}
          disabled={sessions.length === 0}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[16px]">
            {forcedOut ? "check_circle" : "manage_accounts"}
          </span>
          {forcedOut ? "All Sessions Cleared" : "Force Logout All Sessions"}
        </button>
      </div>
    </div>
  );
};

export default ActiveSessionsList;
