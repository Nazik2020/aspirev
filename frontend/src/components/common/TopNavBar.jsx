import React, { useState } from "react";
import Link from "next/link";
import logo from "../../assets/aspirev.png";

const TopNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-2 max-w-full bg-white/80 dark:bg-slate-950/60 backdrop-blur-xl shadow-sm dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b border-slate-200 dark:border-white/5">
      <Link
        href="/"
        className="flex items-center hover:opacity-90 transition-opacity my-auto"
      >
        <img
          src={logo.src}
          alt="Aspirev Logo"
          className="h-10 md:h-12 w-auto object-contain invert dark:invert-0"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 items-center text-[13px] font-medium tracking-wide">
        <Link
          href="/"
          className="text-violet-700 dark:text-violet-300 border-b border-violet-500 pb-0.5 hover:text-slate-900 dark:text-white transition-colors duration-300"
        >
          Platform
        </Link>
        <Link
          href="/career-path"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors duration-300"
        >
          Roadmaps
        </Link>
        <Link
          href="/job-tracker"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors duration-300"
        >
          Tracker
        </Link>
        <Link
          href="/learning-hub"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors duration-300"
        >
          Resources
        </Link>
        <a
          href="#about"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors duration-300"
        >
          About
        </a>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4 text-[13px]">
        <Link
          href="/signin"
          className="text-slate-400 font-medium px-4 py-2 hover:text-slate-900 dark:text-white transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="bg-gradient-to-br from-[#ab8ff4] to-[#814df3] text-slate-900 dark:text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg shadow-[#ab8ff4]/20"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden text-slate-700 dark:text-slate-300 p-2 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="material-symbols-outlined text-3xl">
          {isMobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 md:hidden flex flex-col items-center py-6 gap-6 shadow-2xl animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-violet-700 dark:text-violet-300 font-semibold"
          >
            Platform
          </Link>
          <Link
            href="/career-path"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white"
          >
            Roadmaps
          </Link>
          <Link
            href="/job-tracker"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white"
          >
            Tracker
          </Link>
          <Link
            href="/learning-hub"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white"
          >
            Resources
          </Link>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white"
          >
            About
          </a>
          <div className="w-full h-px bg-slate-200 dark:bg-white/10 my-2"></div>
          <Link
            href="/signin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-11/12 text-center bg-gradient-to-br from-[#ab8ff4] to-[#814df3] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[#ab8ff4]/20"
          >
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;
