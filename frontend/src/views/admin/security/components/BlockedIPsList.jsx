import React, { useState } from "react";

const INITIAL_IPS = [
  {
    id: 1,
    ip: "104.24.11.90",
    reason: "Brute force attack pattern detected",
    blockedDate: "Blocked: Oct 24, 2023",
  },
  {
    id: 2,
    ip: "203.0.113.1",
    reason: "High velocity API requests",
    blockedDate: "Blocked: Oct 23, 2023",
  },
  {
    id: 3,
    ip: "91.205.56.4",
    reason: "Known malicious IP range",
    blockedDate: "Blocked: Oct 21, 2023",
  },
];

const BlockedIPsList = () => {
  const [blockedIPs, setBlockedIPs] = useState(INITIAL_IPS);

  const unblock = (id) => setBlockedIPs((prev) => prev.filter((ip) => ip.id !== id));

  return (
    <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h3 className="text-sm font-bold text-white">Currently Blocked IPs</h3>
        <span className="text-[10px] font-bold text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
          {blockedIPs.length} active
        </span>
      </div>

      {/* IP List */}
      <div className="divide-y divide-white/[0.04]">
        {blockedIPs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="material-symbols-outlined text-[36px] text-white/10 mb-2">
              check_circle
            </span>
            <p className="text-white/30 text-xs">No IPs currently blocked</p>
          </div>
        ) : (
          blockedIPs.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              {/* Shield Icon */}
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-400 text-[17px]">
                  shield_with_heart
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[13px] font-bold text-white">
                  {item.ip}
                </div>
                <div className="text-[10px] text-white/30 mt-0.5 truncate">
                  {item.reason}
                </div>
              </div>

              {/* Date + Unblock */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-[10px] text-white/25 hidden sm:block">
                  {item.blockedDate}
                </span>
                <button
                  onClick={() => unblock(item.id)}
                  className="px-3 py-1 rounded-lg border border-amber-500/40 text-amber-400 text-[11px] font-bold hover:bg-amber-500/10 transition-all"
                >
                  Unblock
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlockedIPsList;
