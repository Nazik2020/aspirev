import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const AdminHeader = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const location = useLocation();
  const isUsersPage = location.pathname.includes("/admin/users");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="h-[72px] bg-white dark:bg-[#15171b] border-b border-slate-200 dark:border-white/5 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
      {/* Mobile menu toggle & brand/tabs */}
      <div className="flex items-center gap-6 h-full">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white md:hidden transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <div className="hidden md:flex items-center gap-2 text-[#00daf3]">
          <div className="w-8 h-8 rounded-lg bg-[#00daf3]/10 flex items-center justify-center border border-[#00daf3]/20">
            <span className="material-symbols-outlined text-[18px]">widgets</span>
          </div>
          <span className="font-headline font-bold text-sm tracking-wide text-[#00daf3]">
            Invikt Admin
          </span>
        </div>

        {/* Dynamic Route Tabs */}
        {isUsersPage ? (
          <nav className="hidden md:flex items-center gap-8 h-full ml-4">
            <Link to="/admin/users" className="h-full flex items-center text-[11px] font-black uppercase tracking-widest text-[#00daf3] border-b-2 border-[#00daf3]">
              Users
            </Link>
            <Link to="/admin/users" className="h-full flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
              Permissions
            </Link>
            <Link to="/admin/users" className="h-full flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
              Logs
            </Link>
          </nav>
        ) : (
          <div className="hidden sm:flex items-center gap-3 bg-slate-50 dark:bg-[#1a1c23] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2 w-80 md:w-96 focus-within:border-[#00daf3]/50 transition-all duration-300 ml-4">
            <span className="material-symbols-outlined text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search users, emails, settings..."
              className="bg-transparent border-none outline-none text-slate-800 dark:text-white text-xs placeholder:text-slate-400 w-full"
            />
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <button className="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors relative">
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#00daf3]"></span>
        </button>
        
        <button className="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>

        {/* User Card info (Header representation) */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/5">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest hidden sm:block">
            ADRIAN K.
          </div>
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
