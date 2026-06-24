import React, { useState } from "react";

const UsersTable = ({ onRowClick }) => {
  const [users] = useState([
    {
      id: "u1",
      initials: "EV",
      name: "Elena Vance",
      email: "elena.v@example.com",
      role: "USER",
      status: "Active",
      apps: 14,
      roadmap: "Senior Architect",
      joined: "Oct 12, 2023",
      lastActive: "2h ago",
      avatarColor: "bg-violet-600/20 text-violet-400",
      hasBorder: true,
    },
    {
      id: "u2",
      initials: "",
      imgUrl: "https://i.pravatar.cc/150?img=11",
      name: "Julian Thorne",
      email: "j.thorne@agency.io",
      role: "PRO",
      status: "Active",
      apps: 32,
      roadmap: "Lead Developer",
      joined: "Sep 04, 2023",
      lastActive: "Just now",
      avatarColor: "",
    },
    {
      id: "u3",
      initials: "MC",
      name: "Marcus Chen",
      email: "m.chen@invikt.com",
      role: "USER",
      status: "Suspended",
      apps: 0,
      roadmap: "—",
      joined: "Jan 18, 2024",
      lastActive: "4d ago",
      avatarColor: "bg-slate-500/20 text-slate-400",
    },
    {
      id: "u4",
      initials: "SK",
      name: "Sarah Kincaid",
      email: "sarah.k@design.com",
      role: "ADMIN",
      status: "Active",
      apps: 8,
      roadmap: "Creative Director",
      joined: "Nov 22, 2023",
      lastActive: "15m ago",
      avatarColor: "bg-violet-600/20 text-violet-400",
    },
    {
      id: "u5",
      initials: "RL",
      name: "Riley Loft",
      email: "r.loft@cloud.net",
      role: "USER",
      status: "Active",
      apps: 3,
      roadmap: "Frontend Eng.",
      joined: "Jan 02, 2024",
      lastActive: "6h ago",
      avatarColor: "bg-emerald-500/20 text-emerald-400",
    },
    {
      id: "u6",
      initials: "DN",
      name: "David Nguyen",
      email: "dnguyen@labs.org",
      role: "PRO",
      status: "Active",
      apps: 51,
      roadmap: "Data Scientist",
      joined: "May 14, 2023",
      lastActive: "1d ago",
      avatarColor: "bg-violet-600/20 text-violet-400",
    },
    {
      id: "u7",
      initials: "AM",
      name: "Anna Müller",
      email: "am@berlin.io",
      role: "USER",
      status: "Active",
      apps: 2,
      roadmap: "UI Designer",
      joined: "Dec 30, 2023",
      lastActive: "8h ago",
      avatarColor: "bg-purple-500/20 text-purple-400",
    },
  ]);

  return (
    <div className="flex flex-col w-full h-full text-slate-800 dark:text-white">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 border-b border-slate-200 dark:border-white/5">
        <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-[#1a1c23] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2 w-full">
          <span className="material-symbols-outlined text-[18px] text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto shrink-0 pb-2 md:pb-0">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0">
            Role: All
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0">
            Status: All
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Join Date
          </div>
          <button className="text-xs font-bold text-[#00daf3] hover:text-cyan-300 transition-colors shrink-0 ml-2">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-transparent">
              <th className="px-5 py-4 w-10 text-center">
                <input type="checkbox" className="rounded bg-slate-200 dark:bg-white/10 border-none w-3.5 h-3.5" />
              </th>
              <th className="px-4 py-4">USER</th>
              <th className="px-4 py-4">ROLE</th>
              <th className="px-4 py-4">STATUS</th>
              <th className="px-4 py-4">APPS</th>
              <th className="px-4 py-4">ROADMAP</th>
              <th className="px-4 py-4">JOINED</th>
              <th className="px-4 py-4">LAST ACTIVE</th>
              <th className="px-4 py-4 text-center w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => onRowClick(user)}
                className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {user.imgUrl ? (
                      <img
                        src={user.imgUrl}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          user.avatarColor
                        } ${user.hasBorder ? 'ring-2 ring-violet-500/30' : ''}`}
                      >
                        {user.initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 dark:text-white truncate">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded tracking-wide uppercase border ${
                      user.role === "PRO"
                        ? "bg-[#00daf3]/10 text-[#00daf3] border-[#00daf3]/20"
                        : user.role === "ADMIN"
                        ? "bg-violet-600/10 text-violet-400 border-violet-500/20"
                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400 dark:border-white/10"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-white">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        user.status === "Active" ? "bg-[#00daf3]" : "bg-red-500"
                      }`}
                    ></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-700 dark:text-white font-medium">
                  {user.apps}
                </td>
                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                  {user.roadmap}
                </td>
                <td className="px-4 py-4 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  {user.joined}
                </td>
                <td className="px-4 py-4 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                  {user.lastActive}
                </td>
                <td className="px-4 py-4 text-center">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-white/5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
        <div>Showing 1-12 of 1,284 users</div>
        <div className="flex items-center gap-1.5">
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-50" disabled>
            <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00daf3] text-slate-900">
            1
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white">
            2
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white">
            3
          </button>
          <span className="mx-1">...</span>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white">
            107
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
