import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { API_URL } from "../../../../config/api";

const UserProfileSidebar = ({ isOpen, onClose, user, onUserUpdate }) => {
  const { getAuthHeaders } = useAuth();
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const [actionLoading, setActionLoading] = useState(false);
  const [profileData, setProfileData] = useState({ applications: [], roadmaps: [], activity: [] });
  const [loadingProfile, setLoadingProfile] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    if (isOpen && user?.id) {
      fetchUserProfile();
    }
  }, [isOpen, user?.id]);

  const fetchUserProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await fetch(`${API_URL}/admin/users/${user.id}/profile`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setProfileData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user profile data", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  if (!user) return null;

  const isSuspended = user.status === "Suspended";

  const handleSuspend = async () => {
    try {
      setActionLoading(true);
      const res = await fetch(`${API_URL}/admin/users/${user.id}/suspend`, {
        method: "PUT",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        const newStatus = data.isDeactivated ? "Suspended" : "Active";
        if (onUserUpdate) onUserUpdate({ status: newStatus });
        showToast(`User successfully ${data.isDeactivated ? 'suspended' : 'reactivated'}`);
      } else {
        showToast(data.error || "Failed to update user status", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete ${user.name}? This cannot be undone.`)) {
      return;
    }
    try {
      setActionLoading(true);
      const res = await fetch(`${API_URL}/admin/users/${user.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        if (onUserUpdate) onUserUpdate();
        onClose();
        // Toast handled by parent if needed, as sidebar closes
      } else {
        showToast(data.error || "Failed to delete user", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const tabs = ["OVERVIEW", "APPLICATIONS", "ROADMAP", "ACTIVITY"];

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full lg:w-[400px] bg-slate-50 dark:bg-[#15171b] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-slate-200 dark:border-white/5 z-50 transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Toast Notification */}
      <div 
        className={`absolute bottom-28 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 w-[85%] flex items-center gap-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border backdrop-blur-xl text-sm font-bold transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
          toast.show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        } ${
          toast.type === 'success' 
            ? 'bg-emerald-900/80 text-emerald-100 border-emerald-500/40' 
            : 'bg-red-900/80 text-red-100 border-red-500/40'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${toast.type === 'success' ? 'bg-emerald-500 text-white shadow-emerald-500/50' : 'bg-red-500 text-white shadow-red-500/50'}`}>
           <span className="material-symbols-outlined text-[18px]">
             {toast.type === 'success' ? 'check_circle' : 'error'}
           </span>
        </div>
        <span className="tracking-wide">{toast.message}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5 shrink-0">
        <h2 className="text-xl font-bold font-headline text-slate-800 dark:text-white">
          User Profile
        </h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Profile Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
        {/* Glow behind Avatar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="relative">
            {user.imgUrl ? (
              <img
                src={user.imgUrl}
                alt=""
                className="w-20 h-20 rounded-full border-[3px] border-[#15171b] object-cover shadow-[0_0_0_2px_rgba(139,92,246,0.5)]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 text-white flex items-center justify-center font-headline font-bold text-3xl border-[3px] border-[#15171b] shadow-[0_0_0_2px_rgba(139,92,246,0.5)]">
                {user.initials || "U"}
              </div>
            )}
            <div className={`absolute bottom-0 right-0 w-4 h-4 ${isSuspended ? 'bg-red-500' : 'bg-[#00daf3]'} rounded-full border-2 border-[#15171b] transition-colors duration-300`}></div>
          </div>
          <h3 className="text-xl font-bold font-headline text-slate-800 dark:text-white mt-4 tracking-tight">
            {user.name || "Select User"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {user.email || "-"}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <span className="bg-[#00daf3]/10 text-[#00daf3] border border-[#00daf3]/20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
              {user.role === "ADMIN" ? "ADMIN ACCOUNT" : "USER ACCOUNT"}
            </span>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border transition-colors duration-300 ${isSuspended ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'}`}>
              {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/5 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-[10px] font-black tracking-widest uppercase transition-colors relative ${
                activeTab === tab
                  ? "text-[#00daf3] border-b-2 border-[#00daf3]"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {loadingProfile ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-2 border-[#00daf3] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xs text-slate-500">Loading user data...</p>
          </div>
        ) : (
          <>
            {activeTab === "OVERVIEW" && (
              <div>
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4">
                    <div className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                      ACCOUNT ID
                    </div>
                    <div className="font-mono text-sm font-bold text-slate-800 dark:text-white">
                      {user.id ? `INV-${user.id.slice(-6).toUpperCase()}` : "-"}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4">
                    <div className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                      JOINED DATE
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">
                      {user.joined || "-"}
                    </div>
                  </div>
                </div>

                {/* Active Roadmap Box */}
                <div className="mb-8">
                  <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                    ACTIVE ROADMAP
                  </div>
                  <div className="bg-gradient-to-br from-[#1a2332] to-[#121926] border border-[#00daf3]/20 rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-[#00daf3] font-bold text-sm">
                        {profileData.roadmaps?.[0]?.roadmapId || user.roadmap || "None"}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">
                        {profileData.roadmaps?.[0] ? `Progress: ${profileData.roadmaps[0].progressPercentage || 0}%` : "No active roadmap."}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[#00daf3] text-[24px]">
                      account_tree
                    </span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-6">
                  <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    RECENT ACTIVITY
                  </div>
                  <div className="space-y-4">
                    {profileData.activity?.slice(0, 3).map((act, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                          <span className={`material-symbols-outlined text-[16px] ${act.color}`}>
                            {act.icon}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-slate-800 dark:text-white font-medium leading-relaxed">
                            {act.title}
                          </p>
                          <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 block">
                            {new Date(act.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {(!profileData.activity || profileData.activity.length === 0) && (
                       <p className="text-xs text-slate-500">No activity logged.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "APPLICATIONS" && (
              <div className="space-y-4">
                <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                  JOB APPLICATIONS ({profileData.applications?.length || 0})
                </div>
                
                {profileData.applications?.length > 0 ? (
                  profileData.applications.map((app) => (
                    <div key={app._id} className="bg-white dark:bg-[#1a1c23] border border-slate-200 dark:border-white/5 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 flex items-center justify-center font-bold text-xl uppercase">
                          {app.company?.charAt(0) || "C"}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">{app.company}</h4>
                          <p className="text-xs text-slate-500">{app.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        app.status === 'Applied' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        app.status === 'Interviewing' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                        app.status === 'Offer' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        'bg-slate-500/10 text-slate-500 border-slate-500/20'
                      }`}>
                        {app.status || "Unknown"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-[32px] text-slate-300 dark:text-slate-600 mb-2">work_off</span>
                    <p className="text-xs text-slate-500">No applications tracked yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "ROADMAP" && (
              <div className="space-y-6">
                <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  ROADMAP PROGRESS
                </div>
                
                {profileData.roadmaps?.length > 0 ? (
                  profileData.roadmaps.map((rm) => (
                    <div key={rm._id} className="mb-6">
                      <div className="bg-gradient-to-br from-[#1a2332] to-[#121926] border border-[#00daf3]/20 rounded-xl p-5 flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-[#00daf3] font-bold text-sm">
                            {rm.roadmapId}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 font-medium">
                            Overall Progress: {rm.progressPercentage || 0}%
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#00daf3] text-[24px]">
                          flag
                        </span>
                      </div>

                      <div className="relative pl-4 border-l-2 border-slate-200 dark:border-white/10 space-y-6">
                        {(rm.completedNodes || []).map((node, idx) => (
                          <div key={idx} className="relative">
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00daf3] ring-4 ring-[#15171b]"></div>
                            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Completed: {node}</h5>
                          </div>
                        ))}
                        {(!rm.completedNodes || rm.completedNodes.length === 0) && (
                          <p className="text-[10px] text-slate-500 mt-1">No completed nodes in this roadmap yet.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-4">User has not started any roadmaps yet.</p>
                )}
              </div>
            )}

            {activeTab === "ACTIVITY" && (
              <div className="space-y-6">
                <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  DETAILED ACTIVITY LOG
                </div>
                
                {profileData.activity?.length > 0 ? (
                  <div className="relative pl-4 border-l-2 border-slate-200 dark:border-white/10 space-y-6">
                    {profileData.activity.map((act) => (
                      <div key={act.id} className="relative">
                        <div className="absolute -left-[25px] top-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-[#1a1c23] border border-slate-200 dark:border-white/10 flex items-center justify-center">
                           <span className={`material-symbols-outlined text-[12px] ${act.color}`}>{act.icon}</span>
                        </div>
                        <p className="text-xs text-slate-800 dark:text-white font-medium">{act.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{new Date(act.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 text-center py-4">No activity history available.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#15171b] shrink-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={actionLoading}
            onClick={handleSuspend}
            className={`border ${isSuspended ? 'border-green-500 text-green-500 hover:bg-green-500/10' : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5'} py-3 rounded-xl text-xs font-bold transition-all duration-300 disabled:opacity-50`}
          >
            {isSuspended ? "Reactivate User" : "Suspend User"}
          </button>
          <button className="bg-[#00daf3] hover:bg-cyan-300 text-slate-900 py-3 rounded-xl text-xs font-black shadow-[0_0_15px_rgba(0,218,243,0.3)] transition-all">
            Send Notification
          </button>
        </div>
        <button 
          onClick={handleDelete}
          disabled={actionLoading}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Delete Account Permanently
        </button>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
