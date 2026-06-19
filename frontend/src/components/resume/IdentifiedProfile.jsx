import React from 'react';

const IdentifiedProfile = () => {
    return (
        <section className="col-span-12 lg:col-span-7">
            <div className="bg-surface-container rounded-xl p-8 border border-outline-variant/10 h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                        <span className="material-symbols-outlined text-secondary-fixed-dim">person_search</span>
                    </div>
                    <h2 className="font-headline text-xl font-bold">Identified Profile</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-2 tracking-widest">Candidate Name</span>
                        <p className="font-headline text-lg font-bold">Mohamed Nazik</p>
                    </div>
                    <div>
                        <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-2 tracking-widest">Education</span>
                        <p className="font-headline text-lg font-bold">BSc Computer Science</p>
                    </div>
                    <div className="col-span-full">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-4 tracking-widest">Detected Skill Matrix</span>
                        <div className="flex flex-wrap gap-2">
                            {['Python', 'SQL', 'ML', 'Java', 'Pandas'].map(skill => (
                                <span key={skill} className="px-4 py-1.5 bg-surface-container-highest rounded-full text-sm font-medium border border-outline-variant/20">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IdentifiedProfile;
