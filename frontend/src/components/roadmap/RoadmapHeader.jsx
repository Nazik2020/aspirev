import React from 'react';

const RoadmapHeader = () => {
    return (
        <header className="max-w-4xl mx-auto mb-16 text-center">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-container/20 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
                Interactive Roadmap
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight mb-6">
                Machine Learning <span className="bg-gradient-to-r from-primary to-secondary-fixed-dim bg-clip-text text-transparent">Engineer</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto">
                A structured path from foundational logic to deploying world-class neural networks. Crafted by Invikt for the next generation of architects.
            </p>
        </header>
    );
};

export default RoadmapHeader;
