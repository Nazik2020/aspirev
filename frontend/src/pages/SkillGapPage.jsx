import React from 'react';
import SkillGapHeader from '../components/skillgap/SkillGapHeader';
import SkillDistributionMatrix from '../components/skillgap/SkillDistributionMatrix';
import CriticalVoids from '../components/skillgap/CriticalVoids';
import TechStackProficiency from '../components/skillgap/TechStackProficiency';

const SkillGapPage = () => {
    return (
        <div className="w-full">
            <SkillGapHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
                <SkillDistributionMatrix />
                <CriticalVoids />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <TechStackProficiency />
                
                {/* Architectural Recommendation Banner */}
                <div className="lg:col-span-12 relative h-64 rounded-xl overflow-hidden group">
                    <img 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt="futuristic neural network visualization" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFKgIm9FUrUU7HL8t242u61Nl78YYcofJmH7rVEYQKU_mPKlKrjww0RyjXibFiQVEtiapl6YRGQ4dNFOjVMbbodEhauKELAVA0dNPKhi5kQgxNEe9jXe1APCpW6X4vhPfNaTB-84GxntI2G6ehliDErXaUWOkYuejGF90QGtzCAojURFJ11vXXKGN8Uie34CbIkBoWUG9qs8B7naoD_dkOCuHk_p2vKcj6GPV6m10xhsKEZmecNlV2D-jyRPjMnmsWG8s6Yb8WA82s"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent flex items-center p-12">
                        <div className="max-w-xl">
                            <h3 className="text-3xl font-headline font-black text-white mb-4">Architectural Recommendation</h3>
                            <p className="text-slate-300 leading-relaxed mb-6 font-body">
                                Your current skill profile shows strong algorithmic foundations but lacks the "Productionization" layer. Focusing on TensorFlow 2.x and distributed training will increase your market valuation by an estimated <span className="text-primary font-bold">22%</span>.
                            </p>
                            <a className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all font-label" href="#">
                                View Full Technical Audit
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Background Orbs */}
            <div className="fixed top-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
            <div className="fixed bottom-0 -left-20 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
        </div>
    );
};

export default SkillGapPage;
