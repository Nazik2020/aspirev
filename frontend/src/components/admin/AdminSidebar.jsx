import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isCollapsed, toggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Overview",
      icon: "dashboard",
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: "group",
    },
    {
      path: "/admin/roadmaps",
      name: "Roadmaps",
      icon: "route",
    },
    {
      path: "/admin/security",
      name: "Security Logs",
      icon: "shield_person",
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: "settings",
    },
  ];

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col bg-[#101216] dark:bg-[#0e0f12] border-r border-slate-200 dark:border-white/5 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      } text-slate-400`}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-6 justify-between border-b border-slate-200 dark:border-white/5 overflow-hidden">
        <Link to="/admin/dashboard" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#814df3] to-[#5d21df] flex items-center justify-center text-white shadow-[0_4px_10px_rgba(93,33,223,0.3)]">
            <span className="material-symbols-outlined text-[18px]">widgets</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-headline font-bold text-sm text-slate-800 dark:text-white leading-none">
                Invikt Admin
              </span>
              <span className="text-[9px] font-bold text-violet-500 dark:text-violet-400 mt-1 uppercase tracking-wider bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20 w-fit">
                INTERNAL
              </span>
            </div>
          )}
        </Link>
        {!isCollapsed && (
          <button
            onClick={toggle}
            className="hidden md:flex p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              menu_open
            </span>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow py-6 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[13px] transition-all duration-200 relative group ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/15 to-transparent text-violet-600 dark:text-[#cdbdff] border-l-2 border-violet-500"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-105 duration-200 ${
                  isActive ? "text-violet-600 dark:text-[#cdbdff]" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.name}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[11px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile footer card */}
      <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#090a0c]/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white font-bold flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(124,58,237,0.3)] shrink-0">
              NZ
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                  Nazik Al-Fayed
                </div>
                <div className="text-[9px] text-slate-500 dark:text-white/40 truncate font-semibold uppercase tracking-wider mt-0.5">
                  Lead Administrator
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Link
              to="/signin"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all shrink-0"
              title="Logout"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
