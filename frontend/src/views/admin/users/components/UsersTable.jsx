import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0 select-none"
      >
        {selectedOption.label}
        <span className={`material-symbols-outlined text-[16px] transition-transform ${isOpen ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-40 bg-white dark:bg-[#1a1c23] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-xs cursor-pointer transition-colors ${
                value === opt.value
                  ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UsersTable = ({ 
  users = [], 
  pagination, 
  onPageChange, 
  search, 
  setSearch, 
  roleFilter, 
  setRoleFilter, 
  statusFilter, 
  setStatusFilter, 
  loading, 
  onRowClick 
}) => {
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or ID..."
            className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          <CustomDropdown 
            value={roleFilter} 
            onChange={setRoleFilter} 
            options={[
              { value: "All", label: "Role: All" },
              { value: "Admin", label: "Role: Admin" },
              { value: "Student", label: "Role: Student" }
            ]}
          />
          <CustomDropdown 
            value={statusFilter} 
            onChange={setStatusFilter} 
            options={[
              { value: "All", label: "Status: All" },
              { value: "Active", label: "Status: Active" },
              { value: "Suspended", label: "Status: Suspended" }
            ]}
          />
          
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-transparent border border-slate-200 dark:border-white/5 px-3 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Join Date
          </div>
          <button 
            onClick={() => { setSearch(""); setRoleFilter("All"); setStatusFilter("All"); }}
            className="text-xs font-bold text-[#00daf3] hover:text-cyan-300 transition-colors shrink-0 ml-2"
          >
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
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-slate-500">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-slate-500">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
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
                            user.avatarColor || 'bg-slate-500/20 text-slate-400'
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-200 dark:border-white/5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 gap-4">
        <div>
          Showing {pagination.total > 0 ? (pagination.page - 1) * 12 + 1 : 0}-
          {Math.min(pagination.page * 12, pagination.total)} of {pagination.total} users
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[14px]">chevron_left</span>
          </button>
          
          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00daf3] text-slate-900">
            {pagination.page}
          </button>

          {pagination.page < pagination.pages && (
            <button 
              onClick={() => onPageChange(pagination.page + 1)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
            >
              {pagination.page + 1}
            </button>
          )}

          <button 
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
