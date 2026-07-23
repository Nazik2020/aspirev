import React, { useState, useEffect } from "react";
import SettingsSidebar from "../../../components/admin/settings/SettingsSidebar";
import GeneralSettings from "../../../components/admin/settings/GeneralSettings";
import FeatureFlags from "../../../components/admin/settings/FeatureFlags";
import LimitsQuotas from "../../../components/admin/settings/LimitsQuotas";
import AdminAccounts from "../../../components/admin/settings/AdminAccounts";
import DangerZone from "../../../components/admin/settings/DangerZone";

const AdminSettingsPage = () => {
  const [activeSection, setActiveSection] = useState("general");

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Optional: IntersectionObserver could be added here to auto-update activeSection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["general", "features", "email", "limits", "admins", "danger"];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is roughly at the top of the viewport
          if (rect.top >= 0 && rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    // Using a scroll listener on the main content area (which is the parent in the layout)
    const mainArea = document.querySelector("main");
    if (mainArea) {
      mainArea.parentElement.addEventListener("scroll", handleScroll);
      return () => mainArea.parentElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="min-h-full bg-[#0f1117] dark:bg-[#0f1117] -m-6 md:-m-8 p-6 md:p-8 relative">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-[#00daf3] tracking-tight">
            Platform Settings
          </h1>
        </div>
      </div>

      {/* Layout Grid: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Sticky Sidebar */}
        <SettingsSidebar 
          activeSection={activeSection} 
          onSectionClick={scrollToSection} 
        />

        {/* Right Scrollable Content */}
        <div className="flex-1 space-y-16 max-w-4xl pb-32">
          <GeneralSettings />
          <FeatureFlags />
          
          {/* Email placeholder if needed to match sidebar */}
          <section id="email" className="scroll-mt-24 space-y-6">
             <div>
                <h2 className="text-2xl font-headline font-bold text-white tracking-tight">
                  Email Configuration
                </h2>
                <p className="text-[12px] text-white/40 mt-1">Configure SMTP settings (Coming Soon)</p>
             </div>
          </section>

          <LimitsQuotas />
          <AdminAccounts />
          <DangerZone />
        </div>

      </div>
    </div>
  );
};

export default AdminSettingsPage;
