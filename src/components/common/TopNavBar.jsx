import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/bg_removed_logo.png';

const TopNavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-4 max-w-full bg-slate-950/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b border-white/5">
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img src={logo} alt="Invikt Logo" className="h-12 md:h-16 w-auto object-contain" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center font-headline tracking-tight font-semibold">
                <Link to="/" className="text-violet-300 border-b-2 border-violet-500 pb-1 hover:text-white transition-colors duration-300">Platform</Link>
                <Link to="/resume" className="text-slate-400 hover:text-white transition-colors duration-300">Resume AI</Link>
                <Link to="/career-path" className="text-slate-400 hover:text-white transition-colors duration-300">Career Roadmap</Link>
                <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors duration-300">Pricing</Link>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/dashboard" className="text-slate-400 font-semibold px-4 py-2 hover:text-white transition-colors">Sign In</Link>
                <Link to="/dashboard" className="bg-gradient-to-br from-violet-300 to-violet-600 text-on-primary px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg shadow-violet-500/20">Get Started</Link>
            </div>

            {/* Mobile Hamburger Icon */}
            <button 
                className="md:hidden text-slate-300 p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span className="material-symbols-outlined text-3xl">
                    {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col items-center py-6 gap-6 shadow-2xl animate-in slide-in-from-top-2">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-violet-300 font-semibold">Platform</Link>
                    <Link to="/resume" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-semibold hover:text-white">Resume AI</Link>
                    <Link to="/career-path" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-semibold hover:text-white">Career Roadmap</Link>
                    <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-semibold hover:text-white">Pricing</Link>
                    <div className="w-full h-px bg-white/10 my-2"></div>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-semibold">Sign In</Link>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-11/12 text-center bg-gradient-to-br from-violet-300 to-violet-600 text-on-primary px-6 py-3 rounded-full font-bold">Get Started Free</Link>
                </div>
            )}
        </nav>
    );
};

export default TopNavBar;
