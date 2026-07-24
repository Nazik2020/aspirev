import React from "react";

const ADMINS = [
  {
    name: "Elowen Vance",
    email: "evance@aspirev.com",
    role: "SUPER ADMIN",
    roleColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    twoFA: "ENABLED",
    twoFAColor: "text-[#00daf3]",
    avatar: "EV",
  },
  {
    name: "Kaelen Thorne",
    email: "kthorne@aspirev.com",
    role: "CONTENT MANAGER",
    roleColor: "text-white/60 bg-white/5 border-white/10",
    twoFA: "DISABLED",
    twoFAColor: "text-red-400",
    avatar: "KT",
  },
  {
    name: "Sorun Aatra",
    email: "saatra@aspirev.com",
    role: "SUPPORT ADMIN",
    roleColor: "text-white/60 bg-white/5 border-white/10",
    twoFA: "ENABLED",
    twoFAColor: "text-[#00daf3]",
    avatar: "SA",
  },
];

const AdminAccounts = () => {
  return (
    <section id="admins" className="scroll-mt-24 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-headline font-bold text-white tracking-tight">
            Admin Accounts
          </h2>
          <p className="text-[12px] text-white/40 mt-1">Manage who has admin panel access.</p>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(124,58,237,0.3)]">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add New Admin
        </button>
      </div>

      <div className="bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-white/25">
                <th className="px-5 py-4">ADMIN</th>
                <th className="px-5 py-4">ROLE</th>
                <th className="px-5 py-4">2FA STATUS</th>
                <th className="px-5 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {ADMINS.map((admin, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                        {admin.avatar}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-white">
                          {admin.name}
                        </div>
                        <div className="text-[10px] text-white/40">
                          {admin.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded border tracking-widest uppercase ${admin.roleColor}`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${admin.twoFAColor}`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {admin.twoFA === "ENABLED" ? "verified_user" : "gpp_maybe"}
                      </span>
                      {admin.twoFA}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-white/30 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminAccounts;
