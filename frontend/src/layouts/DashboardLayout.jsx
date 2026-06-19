import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import SideNavBar from '../components/common/SideNavBar';
import Footer from '../components/common/Footer';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

import logo from '../assets/bg_removed_logo.png';

// Inner layout that consumes the sidebar context
const DashboardContent = () => {
    const { isCollapsed, toggle } = useSidebar();

    return (
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col md:flex-row bg-background">
            {/* Ambient background glows */}
            <div className="glow-orb fixed top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(93,33,223,0.15)_0%,transparent_70%)] opacity-30 z-0 pointer-events-none" />
            <div className="glow-orb fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,218,243,0.08)_0%,transparent_70%)] opacity-30 z-0 pointer-events-none" />

            <SideNavBar />

            {/* Mobile Sidebar Backdrop Overlay */}
            {!isCollapsed && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[45]"
                    onClick={toggle}
                    aria-label="Close sidebar"
                />
            )}

            {/* Mobile Header (Hidden on md+) */}
            <div className="md:hidden flex items-center justify-between px-5 py-3 bg-[#1c1c1f] border-b border-white/5 relative z-40">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Invikt" className="h-8 w-auto object-contain" />
                </Link>
                <button 
                    onClick={toggle}
                    className="text-white/70 hover:text-white p-1"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            {/* Main content area — margin transitions with sidebar */}
            <div
                className={`flex-1 min-w-0 flex flex-col min-h-screen overflow-y-auto overflow-x-hidden relative z-10 transition-all duration-300 ease-in-out md:ml-0 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'}`}
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
