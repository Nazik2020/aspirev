import React from "react";

const stats = [
  {
    label: "Failed Login Attempts",
    value: 23,
    badge: "+12%",
    badgeColor: "text-amber-400",
    badgeIcon: "trending_up",
    icon: "warning",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    label: "Blocked IPs",
    value: 4,
    badge: "-50%",
    badgeColor: "text-emerald-400",
    badgeIcon: "trending_down",
    icon: "block",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
  },
  {
    label: "Active Sessions",
    value: 38,
    badge: "Stable",
    badgeColor: "text-[#00daf3]",
    badgeIcon: null,
    icon: "devices",
    iconColor: "text-[#00daf3]",
    iconBg: "bg-[#00daf3]/10",
  },
  {
    label: "Locked Accounts",
    value: 2,
    badge: "Action needed",
    badgeColor: "text-amber-400",
    badgeIcon: "warning",
    icon: "lock_person",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
];

const SecurityStatsCards = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat, i) => (
      <div
        key={i}
        className="bg-[#1a1c23] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[110px] hover:border-white/10 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-tight">
            {stat.label}
          </span>
          <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
            <span className={`material-symbols-outlined text-[17px] ${stat.iconColor}`}>
              {stat.icon}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-2xl font-headline font-black text-white">
            {stat.value}
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-bold mt-1.5 ${stat.badgeColor}`}>
            {stat.badgeIcon && (
              <span className="material-symbols-outlined text-[12px]">{stat.badgeIcon}</span>
            )}
            {stat.badge}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SecurityStatsCards;
