import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ className = '' }) => {
    return (
        <footer className={`py-12 border-t border-slate-800/20 bg-slate-950 ${className}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 font-inter text-xs uppercase tracking-[0.05em]">
                <div className="text-slate-600 mb-8 md:mb-0">
                    © 2024 Invikt. The Luminescent Architect.
                </div>
                <div className="flex gap-12 text-slate-600">
                    <Link to="#" className="hover:text-violet-400 transition-colors">Privacy</Link>
                    <Link to="#" className="hover:text-violet-400 transition-colors">Terms</Link>
                    <Link to="#" className="hover:text-violet-400 transition-colors">API</Link>
                    <Link to="#" className="hover:text-violet-400 transition-colors">Security</Link>
                </div>
                <div className="mt-8 md:mt-0 flex gap-4">
                    <div className="w-8 h-8 rounded-full glass-panel border border-outline-variant/10 flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer">
                        <span className="material-symbols-outlined text-sm" data-icon="language">language</span>
                    </div>
                    <div className="w-8 h-8 rounded-full glass-panel border border-outline-variant/10 flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer">
                        <span className="material-symbols-outlined text-sm" data-icon="hub">hub</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
