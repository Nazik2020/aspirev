import React from "react";
import { usePortfolio } from "../../../context/PortfolioContext";

const VolunteeringForm = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const items = portfolioData.volunteering;

  const addItem = () => {
    updateSection("volunteering", [...items, { id: crypto.randomUUID(), role: '', organization: '', iconName: '', orgLink: '', description: '' }]);
  };

  const removeItem = (id) => {
    updateSection("volunteering", items.filter(item => (item._id || item.id) !== id));
  };

  const handleChange = (id, field, value) => {
    updateSection("volunteering", items.map(item => (item._id || item.id) === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="bg-[#17181c] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white/60">volunteer_activism</span>
          <h3 className="text-[1.1rem] font-bold text-white">Volunteering</h3>
        </div>
        <button 
          onClick={addItem}
          className="flex items-center gap-2 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest bg-violet-500/10 px-3 py-1.5 rounded-lg"
        >
          <span className="material-symbols-outlined text-[16px]">add</span> Add
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item, index) => {
          const itemId = item._id || item.id;
          return (
            <div key={itemId || index} className="relative p-6 rounded-lg border border-white/10 bg-[#1e1f23] flex flex-col gap-4">
              {/* Always show delete button — allow clearing the last item too */}
              <button 
                onClick={() => removeItem(itemId)}
                className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Role</label>
                  <input 
                    type="text" 
                    value={item.role}
                    onChange={(e) => handleChange(itemId, 'role', e.target.value)}
                    placeholder="e.g. Microsoft Student Ambassador" 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Organization & Period</label>
                  <input 
                    type="text" 
                    value={item.organization}
                    onChange={(e) => handleChange(itemId, 'organization', e.target.value)}
                    placeholder="e.g. MICROSOFT • APR 2026 - PRESENT" 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Icon</label>
                  <div className="relative">
                    <select 
                      value={item.iconName || 'star'}
                      onChange={(e) => handleChange(itemId, 'iconName', e.target.value)}
                      className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="star">Star</option>
                      <option value="volunteer_activism">Heart / Volunteer</option>
                      <option value="group">People / Team</option>
                      <option value="code">Code / Development</option>
                      <option value="school">Education / Mentoring</option>
                      <option value="public">Global / Community</option>
                      <option value="handshake">Partnership</option>
                      <option value="campaign">Advocacy</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[18px]">expand_more</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Org Link</label>
                  <input 
                    type="url" 
                    value={item.orgLink}
                    onChange={(e) => handleChange(itemId, 'orgLink', e.target.value)}
                    placeholder="https://..." 
                    className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-2.5 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest">Description</label>
                <textarea 
                  value={item.description}
                  onChange={(e) => handleChange(itemId, 'description', e.target.value)}
                  placeholder="Describe your volunteering role..." 
                  rows={3}
                  className="w-full bg-[#17181c] border border-white/10 rounded-md px-4 py-3 text-[0.85rem] text-white focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VolunteeringForm;
