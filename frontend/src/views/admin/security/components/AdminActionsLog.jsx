import React from "react";

const ACTIONS = [
  {
    id: 1,
    actor: "Nazik",
    action: "suspended user",
    target: "j_smith_92",
    timeAgo: "2 minutes ago",
    context: "Security violation",
    icon: "person_off",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
  },
  {
    id: 2,
    actor: "System",
    action: "updated Global Firewall rules",
    target: "",
    timeAgo: "14 minutes ago",
    context: "Version 2.4.1",
    icon: "security_update_good",
    iconColor: "text-[#00daf3]",
    iconBg: "bg-[#00daf3]/10",
  },
  {
    id: 3,
    actor: "Elena",
    action: "rotated 2FA recovery codes",
    target: "",
    timeAgo: "1 hour ago",
    context: "Admin: Elena M.",
    icon: "key",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    id: 4,
    actor: "System",
    action: "blocked IP",
    target: "104.24.11.90",
    timeAgo: "3 hours ago",
    context: "Brute force pattern",
    icon: "block",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
  },
];

const AdminActionsLog = () => (
  <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
      <h3 className="text-sm font-bold text-white">Recent Admin Actions</h3>
    </div>

    {/* Actions List */}
    <div className="divide-y divide-white/[0.04]">
      {ACTIONS.map((action) => (
        <div
          key={action.id}
          className="flex items-start gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors"
        >
          {/* Icon */}
          <div className={`w-8 h-8 rounded-xl ${action.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
            <span className={`material-symbols-outlined text-[16px] ${action.iconColor}`}>
              {action.icon}
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-white font-medium leading-relaxed">
              <span className="font-bold">{action.actor}</span>{" "}
              {action.action}
              {action.target && (
                <span className="text-violet-400 font-mono ml-1">{action.target}</span>
              )}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-white/30">{action.timeAgo}</span>
              <span className="text-white/15">•</span>
              <span className="text-[10px] text-white/30">{action.context}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="px-5 py-4 border-t border-white/5">
      <button className="w-full text-center text-[11px] font-bold text-white/30 hover:text-white transition-colors py-1">
        View Full Log
      </button>
    </div>
  </div>
);

export default AdminActionsLog;
