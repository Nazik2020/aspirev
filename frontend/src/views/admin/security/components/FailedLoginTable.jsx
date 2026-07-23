import React from "react";

const LOGIN_ATTEMPTS = [
  { ip: "192.168.1.45",  email: "user_x@example.com",    attempts: 8,  time: "14:23:05", status: "MONITOR",  statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20"  },
  { ip: "45.22.190.12",  email: "attacker_99@host.io",   attempts: 14, time: "14:15:22", status: "BLOCKED",  statusColor: "text-red-400 bg-red-400/10 border-red-400/20"         },
  { ip: "88.102.3.4",    email: "dev_team@corp.com",     attempts: 2,  time: "13:45:10", status: "NORMAL",   statusColor: "text-white/30 bg-white/5 border-white/10"             },
  { ip: "77.55.204.10",  email: "unknown@protonmail.com",attempts: 6,  time: "13:20:44", status: "MONITOR",  statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20"  },
];

const FailedLoginTable = () => (
  <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden">
    {/* Card Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
      <h3 className="text-sm font-bold text-white">Recent Failed Login Attempts</h3>
      <button className="text-white/30 hover:text-white transition-colors">
        <span className="material-symbols-outlined text-[18px]">filter_list</span>
      </button>
    </div>

    {/* Table — horizontally scrollable on mobile */}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/25">
            <th className="px-5 py-3">IP Address</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Attempts</th>
            <th className="px-5 py-3">Time</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04] text-[12px]">
          {LOGIN_ATTEMPTS.map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-5 py-3.5 font-mono text-amber-400 font-semibold">
                {row.ip}
              </td>
              <td className="px-5 py-3.5 text-white/60">{row.email}</td>
              <td className="px-5 py-3.5 text-white font-bold">{row.attempts}</td>
              <td className="px-5 py-3.5 font-mono text-white/40">{row.time}</td>
              <td className="px-5 py-3.5">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded border tracking-widest uppercase ${row.statusColor}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FailedLoginTable;
