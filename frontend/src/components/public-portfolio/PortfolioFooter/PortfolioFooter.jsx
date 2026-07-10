import React from "react";

const PortfolioFooter = ({ data, social, onLinkClick }) => {
  return (
    <footer id="contact" className="w-full border-t border-gray-200 dark:border-white/10 pt-16 pb-8 mt-12 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center">
        
        {/* About Me */}
        <div className="flex flex-col items-center">
          <h3 className="text-[1.2rem] font-bold text-gray-900 dark:text-white mb-6 transition-colors">About Me</h3>
          <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs text-center transition-colors">
            {data?.bio || "Passionate about creating amazing things."}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-[1.2rem] font-bold text-gray-900 dark:text-white mb-6 transition-colors">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-center w-full max-w-[280px]">
            <a href="#home" onClick={onLinkClick} className="text-[0.85rem] text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-white transition-colors">Home</a>
            <a href="#projects" onClick={onLinkClick} className="text-[0.85rem] text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-white transition-colors">Projects</a>
            <a href="#certifications" onClick={onLinkClick} className="text-[0.85rem] text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-white transition-colors">Certifications</a>
            <a href="#experience" onClick={onLinkClick} className="text-[0.85rem] text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-white transition-colors">Experiences</a>
          </div>
        </div>

        {/* Connect With Me */}
        <div className="flex flex-col items-center">
          <h3 className="text-[1.2rem] font-bold text-gray-900 dark:text-white mb-6 transition-colors">Connect With Me</h3>
          <div className="flex items-center gap-4">
            {social?.github && (
              <a href={social.github} target="_blank" rel="noreferrer" onClick={onLinkClick} className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            )}
            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" onClick={onLinkClick} className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            )}
            {social?.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer" onClick={onLinkClick} className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
            {social?.website && (
              <a href={social.website} target="_blank" rel="noreferrer" onClick={onLinkClick} className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </a>
            )}
          </div>
        </div>

      </div>

      <div className="text-center border-t border-gray-200 dark:border-white/5 pt-8 transition-colors flex flex-col items-center justify-center gap-2">
        <p className="text-[0.75rem] text-gray-500 font-medium tracking-wider">
          &copy; {new Date().getFullYear()} {data?.fullName || "User"}. All rights reserved.
        </p>
        <p className="text-[0.7rem] text-gray-400 dark:text-gray-500 font-medium tracking-wide flex items-center justify-center gap-1">
          Built with <span className="text-violet-500 font-bold tracking-wider">Invikt</span>
        </p>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
