import React from "react";
import Link from "next/link";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`py-12 border-t border-slate-200 dark:border-slate-800/20 bg-slate-50 dark:bg-slate-950 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 font-inter text-xs uppercase tracking-[0.05em]">
        <div className="text-slate-500 dark:text-slate-600 mb-8 md:mb-0">
          © 2026 Aspirev. All rights reserved.
        </div>
        <div className="flex gap-12 text-slate-500 dark:text-slate-600">
          <Link href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
