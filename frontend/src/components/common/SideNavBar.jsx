import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/aspirev.png";
import logoIcon from "../../assets/aspirev.png";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const v1Nav = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    description: "Your career overview",
  },
  {
    name: "Career Roadmaps",
    path: "/career-path",
    icon: "map",
    description: "Structured learning paths",
  },
  {
    name: "Job Tracker",
    path: "/job-tracker",
    icon: "work_history",
    description: "Kanban application board",
  },
  {
    name: "Resume Analyzer",
    path: "/resume",
    icon: "description",
    description: "AI resume breakdown",
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: "deployed_code",
    description: "Manage your live portfolio",
  },
];

const v2Nav = [
  { name: "Skill Gap", icon: "query_stats" },
  { name: "Learning Hub", icon: "school" },
];

const SideNavBar = () => {
  const { isCollapsed, isMobileOpen, toggle, closeMobile } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const rawUsername = user?.username || "User";
  const username = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1);
  const email = user?.email || "hello@invikt.com";
  const initial = username.charAt(0).toUpperCase();

  // Desktop: use isCollapsed for collapse/expand
  // Mobile: use isMobileOpen for drawer open/close
  const mobileTranslate = isMobileOpen ? "translate-x-0" : "-translate-x-full";
  const desktopTranslate = isCollapsed ? "md:translate-x-0" : "md:translate-x-0";
  const desktopWidth = isCollapsed ? "md:w-20" : "md:w-72";
  // Show expanded content when mobile drawer is open OR desktop is expanded
  const isExpanded = isMobileOpen || !isCollapsed;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#1c1c1f]
                w-64 ${mobileTranslate} ${desktopWidth} ${desktopTranslate}
            `}
    >
      {/* ── Header: Logo + Gemini-style panel toggle ── */}
      <div
        className={`flex items-center h-16 shrink-0 border-b border-slate-200 dark:border-white/5 ${isCollapsed ? "flex-col justify-center gap-1 px-3 py-3 h-auto pt-4 pb-3" : "px-5 justify-between"}`}
      >
        {/* Collapsed: icon-only logo centered above toggle */}
        {isCollapsed && !isMobileOpen ? (
          <>
            <Link to="/" className="hover:opacity-80 transition-opacity flex justify-center">
              <img
                src={logoIcon}
                alt="Aspirev"
                className="h-6 w-auto object-contain invert dark:invert-0 scale-[1.5]"
              />
            </Link>
            <button
              onClick={toggle}
              title="Open sidebar"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-white/40 hover:bg-white/8 hover:text-slate-700 dark:text-white/80 transition-all duration-200"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
              >
                left_panel_open
              </span>
            </button>
          </>
        ) : (
          /* Expanded: full logo left, toggle button right */
          <>
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity shrink-0"
            >
              <img
                src={logo}
                alt="Aspirev"
                className="h-8 w-auto object-contain invert dark:invert-0 scale-[1.5] origin-left"
              />
            </Link>
            <button
              onClick={isMobileOpen ? closeMobile : toggle}
              title="Close sidebar"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-white/40 hover:bg-white/8 hover:text-slate-700 dark:text-white/80 transition-all duration-200 shrink-0"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
              >
                left_panel_close
              </span>
            </button>
          </>
        )}
      </div>

      {/* ── Scrollable navigation ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-3 flex flex-col gap-5">
        {/* V1 Core */}
        <div>
          {isExpanded && (
            <p className="text-[0.6rem] uppercase tracking-[0.18em] font-bold text-slate-400 dark:text-white/25 px-5 mb-1.5">
              Core
            </p>
          )}
          <nav className="flex flex-col gap-1 px-3">
            {v1Nav.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                title={isCollapsed && !isMobileOpen ? item.name : undefined}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 py-2.5 rounded-xl transition-all duration-200
                                    ${isCollapsed && !isMobileOpen ? "justify-center px-0" : "px-3"}
                                    ${
                                      isActive
                                        ? "bg-primary/15 text-primary"
                                        : "text-slate-500 dark:text-white/50 hover:bg-slate-100 dark:bg-white/5 hover:text-slate-900 dark:text-white/90"
                                    }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active left indicator — expanded only */}
                    {isActive && isExpanded && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                    )}
                    <span
                      className="material-symbols-outlined text-[20px] shrink-0 transition-all duration-200"
                      style={{
                        fontVariationSettings: isActive
                          ? "'FILL' 1, 'wght' 500"
                          : "'FILL' 0, 'wght' 300",
                      }}
                    >
                      {item.icon}
                    </span>
                    {isExpanded && (
                      <div className="flex flex-col min-w-0">
                        <span className="text-[0.85rem] font-semibold tracking-tight leading-snug truncate">
                          {item.name}
                        </span>
                        <span
                          className={`text-[0.65rem] leading-tight truncate font-normal ${isActive ? "text-primary/60" : "text-slate-400 dark:text-white/30 group-hover:text-slate-500 dark:text-white/50"}`}
                        >
                          {item.description}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-slate-100 dark:bg-white/5" />

        {/* V2 Intelligence */}
        <div>
          {isExpanded && (
            <div className="flex items-center gap-2 px-5 mb-1.5">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] font-bold text-slate-400 dark:text-white/25">
                Intelligence
              </p>
              <span className="text-[0.55rem] uppercase tracking-widest font-bold text-secondary-fixed-dim bg-secondary-fixed-dim/10 px-1.5 py-0.5 rounded-full border border-secondary-fixed-dim/20">
                V2
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1 px-3">
            {v2Nav.map((item) => (
              <div
                key={item.name}
                title={!isExpanded ? `${item.name} — Coming in V2` : undefined}
                className={`relative flex items-center gap-3.5 py-2.5 rounded-xl opacity-30 cursor-not-allowed select-none
                                    ${!isExpanded ? "justify-center px-0" : "px-3"}
                                `}
              >
                <span
                  className="material-symbols-outlined text-[20px] text-slate-500 dark:text-white/50 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                >
                  {item.icon}
                </span>
                {isExpanded && (
                  <>
                    <span className="text-[0.85rem] font-semibold text-slate-500 dark:text-white/50 flex-1 truncate tracking-tight">
                      {item.name}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-widest font-bold text-slate-400 dark:text-white/30 shrink-0">
                      Soon
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Profile Strength card — expanded only ── */}
      {isExpanded && (
        <div className="px-3 pb-3">
          <div
            className="rounded-xl p-4 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#252528]"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[0.6rem] uppercase tracking-widest font-bold text-slate-400 dark:text-white/30">
                Profile Strength
              </p>
              <span className="text-xs font-black text-secondary-fixed-dim">
                32%
              </span>
            </div>
            <div className="h-1 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-2.5">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-secondary-fixed-dim rounded-full"
                style={{ width: "32%" }}
              />
            </div>
            <p className="text-[0.62rem] text-slate-400 dark:text-white/30 leading-snug">
              Add your first roadmap to unlock insights.
            </p>
          </div>
        </div>
      )}

      {/* ── Bottom utility + user ── */}
      <div className="border-t border-slate-200 dark:border-white/5">
        {!isExpanded ? (
          <div className="flex flex-col items-center gap-1 py-3">
            <NavLink
              to="/settings"
              title="Settings"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:bg-white/5 hover:text-slate-700 dark:text-white/80 transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
              >
                settings
              </span>
            </NavLink>
            <button
              onClick={handleLogout}
              title="Log out"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-white/40 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
              >
                logout
              </span>
            </button>
            <div
              title={`${username} — ${email}`}
              className="w-9 h-9 mt-1 rounded-full bg-gradient-to-br from-primary-container to-secondary-fixed-dim flex items-center justify-center cursor-pointer ring-2 ring-primary/20 overflow-hidden shrink-0"
            >
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {initial}
                </span>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1 px-3 pt-2">
              <NavLink
                to="/settings"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:bg-white/5 hover:text-slate-700 dark:text-white/80 transition-all text-xs font-medium"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                >
                  settings
                </span>
                Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-slate-500 dark:text-white/40 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all text-xs font-medium"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                >
                  logout
                </span>
                Log out
              </button>
            </div>
            <div className="px-3 pb-4 pt-1">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:bg-white/5 cursor-pointer transition-all group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container to-secondary-fixed-dim flex items-center justify-center shrink-0 ring-2 ring-primary/20 overflow-hidden">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {initial}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.85rem] font-semibold text-slate-700 dark:text-white/80 truncate leading-tight">
                    {username}
                  </p>
                  <p className="text-[0.65rem] text-slate-400 dark:text-white/30 truncate">
                    {email}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-white/25 group-hover:text-slate-500 dark:text-white/50 transition-colors">
                  more_vert
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default SideNavBar;
