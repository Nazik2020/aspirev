import React from "react";
import { Outlet, Link } from "react-router-dom";
import SideNavBar from "../components/common/SideNavBar";
import Footer from "../components/common/Footer";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";

import logo from "../assets/aspirev.png";

// Inner layout that consumes the sidebar context
const DashboardContent = () => {
  const { isCollapsed, isMobileOpen, toggleMobile, closeMobile } = useSidebar();

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row bg-background">
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-orb absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(93,33,223,0.15)_0%,transparent_70%)] opacity-30" />
        <div className="glow-orb absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,218,243,0.08)_0%,transparent_70%)] opacity-30" />
      </div>

      <SideNavBar />

      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[45]"
          onClick={closeMobile}
          aria-label="Close sidebar"
        />
      )}

      {/* Mobile Header (Hidden on md+) */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-white dark:bg-[#1c1c1f] border-b border-slate-200 dark:border-white/5 relative z-40">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Invikt" className="h-20 w-auto object-contain dark:invert-0 dark:hue-rotate-0 invert hue-rotate-180 brightness-75 contrast-125 dark:brightness-100 dark:contrast-100" />
        </Link>
        <button
          onClick={toggleMobile}
          className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:text-white p-1"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div
        className={`flex-1 min-w-0 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden relative z-10 transition-all duration-300 ease-in-out md:ml-0 ${isCollapsed ? "md:ml-20" : "md:ml-72"}`}
      >
        <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

// Wrap everything in the provider
const DashboardLayout = () => (
  <SidebarProvider>
    <DashboardContent />
  </SidebarProvider>
);

export default DashboardLayout;
