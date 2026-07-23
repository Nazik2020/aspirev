import React from "react";
import PortfolioHeader from "../../components/portfolio/PortfolioHeader/PortfolioHeader";
import PersonalInfoForm from "../../components/portfolio/PersonalInfoForm/PersonalInfoForm";
import SocialLinksForm from "../../components/portfolio/SocialLinksForm/SocialLinksForm";
import ExperienceForm from "../../components/portfolio/ExperienceForm/ExperienceForm";
import TechnologiesForm from "../../components/portfolio/TechnologiesForm/TechnologiesForm";
import ProjectsForm from "../../components/portfolio/ProjectsForm/ProjectsForm";
import CertificationsForm from "../../components/portfolio/CertificationsForm/CertificationsForm";
import VolunteeringForm from "../../components/portfolio/VolunteeringForm/VolunteeringForm";
import LivePreview from "../../components/portfolio/LivePreview/LivePreview";
import { PortfolioProvider } from "../../context/PortfolioContext";

const PortfolioPage = () => {
  return (
    <PortfolioProvider>
      <div className="w-full h-full flex flex-col gap-6 animate-fade-in-up">
        <PortfolioHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.5fr_1fr] gap-6 pb-20 items-start">
          <div className="flex flex-col gap-6">
            <PersonalInfoForm />
            <SocialLinksForm />
            <ExperienceForm />
            <TechnologiesForm />
            <ProjectsForm />
            <CertificationsForm />
            <VolunteeringForm />
          </div>
          
          <div className="sticky top-6 h-fit w-full flex justify-center lg:justify-end">
            <LivePreview />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
};

export default PortfolioPage;
