import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import Footer from "../components/common/Footer";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="h-screen w-full overflow-hidden flex bg-slate-50 dark:bg-[#0c0d12] relative z-0">
      {/* Background glowing particles/orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] opacity-40 dark:opacity-60" />
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,transparent_70%)] opacity-40 dark:opacity-60" />
      </div>

      {/* Desktop Sidebar (visible on md+) */}
      <div className="hidden md:block">
        <AdminSidebar isCollapsed={isCollapsed} toggle={toggleSidebar} />
      </div>

      {/* Mobile Sidebar (fixed, overlay style) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={toggleMobileSidebar}
        />
        {/* Sidebar Container */}
        <div
          className={`absolute top-0 left-0 h-full transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar isCollapsed={false} toggle={toggleMobileSidebar} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        <AdminHeader toggleSidebar={toggleMobileSidebar} />

        {/* Scrollable page body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-between">
          <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
          <Footer className="bg-transparent dark:bg-transparent" />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
