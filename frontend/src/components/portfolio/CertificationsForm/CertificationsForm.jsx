import React from "react";
import { usePortfolio } from "../../../context/PortfolioContext";

const CertificationsForm = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const items = portfolioData.certifications;

  const addItem = () => {
    // #19 FIX: Use crypto.randomUUID() to avoid ID collisions from rapid clicks
    updateSection("certifications", [...items, { id: crypto.randomUUID(), title: '', provider: '', date: '', skills: '', certificateUrl: '' }]);
  };

  const removeItem = (id) => {
    updateSection("certifications", items.filter(item => (item._id || item.id) !== id));
  };

  const handleChange = (id, field, value) => {
    updateSection("certifications", items.map(item => (item._id || item.id) === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="bg-[#17181c] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white/60">workspace_premium</span>
          <h3 className="text-[1.1rem] font-bold text-white">Certifications</h3>
        </div>
        <button 
          onClick={addItem}
          className="flex items-center gap-2 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest bg-violet-500/10 px-3 py-1.5 rounded-lg"
        >
          <span className="material-symbols-outlined text-[16px]">add</span> Add Cert
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item, index) => {
          const itemId = item._id || item.id;
          return (
            <div key={itemId || index} className="relative p-6 rounded-lg border border-white/10 bg-[#1e1f23] flex flex-col gap-4">
              {/* #18 FIX: Always show delete button — allow clearing the last item too */}
              <button 
                onClick={() => removeItem(itemId)}
                className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Certificate Title</label>
                  <input 
                    type="text" 
                    value={item.title}
                    onChange={(e) => handleChange(itemId, 'title', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect" 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Provider / Issuer</label>
                  <input 
                    type="text" 
                    value={item.provider}
                    onChange={(e) => handleChange(itemId, 'provider', e.target.value)}
                    placeholder="e.g. Amazon Web Services" 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Date Earned</label>
                  <input 
                    type="text" 
                    value={item.date}
                    onChange={(e) => handleChange(itemId, 'date', e.target.value)}
                    placeholder="e.g. March 2024" 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Skills Gained (Comma Separated)</label>
                  <input 
                    type="text" 
                    value={item.skills}
                    onChange={(e) => handleChange(itemId, 'skills', e.target.value)}
                    placeholder="e.g. Cloud Computing, IAM, Networking" 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Certificate URL</label>
                  <input 
                    type="url" 
                    value={item.certificateUrl}
                    onChange={(e) => handleChange(itemId, 'certificateUrl', e.target.value)}
                    placeholder="https://..." 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CertificationsForm;
