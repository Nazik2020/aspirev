import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/common/SideNavBar';
import Footer from '../components/common/Footer';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

// Inner layout that consumes the sidebar context
const DashboardContent = () => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen flex bg-background">
            {/* Ambient background glows */}
            <div className="glow-orb fixed top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(93,33,223,0.15)_0%,transparent_70%)] opacity-30 z-0 pointer-events-none" />
            <div className="glow-orb fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,218,243,0.08)_0%,transparent_70%)] opacity-30 z-0 pointer-events-none" />

            <SideNavBar />

            {/* Main content area — margin transitions with sidebar */}
            <div
                className={`flex-1 flex flex-col min-h-screen relative z-10 transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-20' : 'ml-72'}`}
            >
                <main className="flex-1 w-full max-w-6xl mx-auto px-8 pt-10 pb-20">
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
