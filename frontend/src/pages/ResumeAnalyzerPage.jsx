import React from 'react';
import DocumentUploader from '../components/resume/DocumentUploader';
import ResumeScoreMeter from '../components/resume/ResumeScoreMeter';
import IdentifiedProfile from '../components/resume/IdentifiedProfile';
import AIFeedbackReport from '../components/resume/AIFeedbackReport';
import SkillRadarChart from '../components/resume/SkillRadarChart';

const ResumeAnalyzerPage = () => {
    return (
        <div className="w-full">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface mb-2">
                        Resume <span className="bg-gradient-to-r from-primary to-secondary-fixed-dim bg-clip-text text-transparent">Analyzer</span>
                    </h1>
                    <p className="text-on-surface-variant font-body max-w-md">Evaluate and optimize your resume for your target roles.</p>
                </div>
                <div className="hidden md:flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Current Session</span>
                        <span className="font-headline font-bold text-secondary-fixed-dim">Mohamed Nazik.pdf</span>
                    </div>
                </div>
            </header>
            
            <div className="grid grid-cols-12 gap-6">
                <DocumentUploader />
                <ResumeScoreMeter />
                <IdentifiedProfile />
                <AIFeedbackReport />
                <SkillRadarChart />
            </div>
        </div>
    );
};

export default ResumeAnalyzerPage;
