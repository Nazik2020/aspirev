import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/common/TopNavBar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
            {/* Background Orbs base layer */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="glow-orb w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary top-[-100px] md:top-[-300px] left-[-100px] md:left-[-200px] rounded-full opacity-20 md:opacity-100"></div>
                <div className="glow-orb w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary-container bottom-[-100px] md:bottom-[-200px] right-[-50px] md:right-[-100px] rounded-full opacity-20 md:opacity-100"></div>
            </div>
            
            <TopNavBar />
            
            <main className="flex-1 w-full pt-20 relative z-10">
                <Outlet />
            </main>
            
            <Footer className="relative z-10" />
        </div>
    );
};

export default PublicLayout;
