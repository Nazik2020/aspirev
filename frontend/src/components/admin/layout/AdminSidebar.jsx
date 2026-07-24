"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../assets/aspirev.png";
import logoIcon from "../../../assets/aspirev.png";

const AdminSidebar = ({ isCollapsed, toggle }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { path: "/admin/dashboard",    name: "Overview",         icon: "dashboard"       },
    { path: "/admin/users",        name: "Users",            icon: "group"           },
    { path: "/admin/roadmaps",     name: "Roadmaps",         icon: "route"           },
    { path: "/admin/applications", name: "Application Data", icon: "monitoring"      },
    { path: "/admin/security",     name: "Security Logs",    icon: "shield_person"   },
    { path: "/admin/settings",     name: "Settings",         icon: "settings"        },
  ];

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col bg-[#101216] dark:bg-[#0e0f12] border-r border-white/5 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      } text-slate-400`}
    >
      {/* ── Header: Logo + Collapse toggle ── */}
      <div className="h-20 flex items-center px-4 justify-between border-b border-white/5 overflow-hidden shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
          {isCollapsed ? (
            /* Collapsed → icon-only logo */
            <img
              src={logoIcon.src}
              alt="Aspirev"
              className="h-6 w-auto object-contain shrink-0 invert dark:invert-0"
            />
          ) : (
            /* Expanded → full logo */
            <img
              src={logo.src}
              alt="Aspirev"
              className="h-7 w-auto object-contain shrink-0 max-w-[280px] invert dark:invert-0"
            />
          )}
          {!isCollapsed && (
            <span className="text-[9px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-wider bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20 whitespace-nowrap shrink-0">
              ADMIN
            </span>
          )}
        </Link>

        {/* Collapse / Expand toggle — always visible on desktop */}
        <button
          onClick={toggle}
          className="hidden md:flex p-2 rounded-xl hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-white transition-all shrink-0 ml-2"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isCollapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>

      {/* ── Navigation Links ── */}
      <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/admin/dashboard" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-[13px] transition-all duration-200 relative group ${
                isActive
                  ? "bg-gradient-to-r from-violet-500/15 to-transparent text-violet-400 dark:text-[#cdbdff] border-l-2 border-violet-500"
                  : "text-slate-500 dark:text-slate-400 hover:bg-white/5 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.name : ""}
            >
              <span
                className={`material-symbols-outlined text-[20px] shrink-0 transition-transform group-hover:scale-105 duration-200 ${
                  isActive ? "text-violet-400 dark:text-[#cdbdff]" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span className="truncate">{item.name}</span>}

              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 border border-white/10 text-white text-[11px] font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-xl z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── User Profile + Logout Footer ── */}
      <div className="p-3 border-t border-white/5 shrink-0">
        <div className={`flex items-center gap-3 p-2 rounded-xl ${isCollapsed ? "justify-center" : ""}`}>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 text-white font-bold flex items-center justify-center text-sm shadow-[0_4px_10px_rgba(124,58,237,0.3)] shrink-0">
            NZ
          </div>

          {/* Name + role — hidden when collapsed */}
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">
                Nazik Al-Fayed
              </div>
              <div className="text-[9px] text-white/30 truncate font-semibold uppercase tracking-wider mt-0.5">
                Lead Administrator
              </div>
            </div>
          )}

          {/* Logout button — always visible */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
