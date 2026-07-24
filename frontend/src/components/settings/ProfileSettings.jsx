import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/api";
import Select from "react-select";
import countryList from "react-select-country-list";

const ProfileSettings = () => {
  const { getAuthHeaders, user, updateUser, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    careerGoal: "",
    university: "",
    country: "United States",
    bio: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [lastSaved, setLastSaved] = useState("Never");
  const [updatedAt, setUpdatedAt] = useState(null);

  // Premium Modal State
  const [modalConfig, setModalConfig] = useState({ show: false, type: "", title: "", desc: "", actionText: "" });

  const fileInputRef = useRef(null);

  // Helper to format last saved time dynamically
  const formatLastSaved = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Never";
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // #15 FIX: Also run immediately on mount so label is correct from the start
  useEffect(() => {
    if (!updatedAt) return;
    setLastSaved(formatLastSaved(updatedAt)); // Run immediately
    const interval = setInterval(() => {
      setLastSaved(formatLastSaved(updatedAt));
    }, 15000);
    return () => clearInterval(interval);
  }, [updatedAt]);

  // Country Options & Styles
  const options = useMemo(() => countryList().getData(), []);
  // #12 FIX: Support both light and dark mode in react-select styles
  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark ? 'transparent' : '#ffffff',
      borderColor: state.isFocused ? 'rgba(171, 143, 244, 0.5)' : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.1)',
      borderRadius: '0.5rem',
      minHeight: '44px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(171, 143, 244, 0.5)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#17181c' : '#ffffff',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0,0,0,0.1)',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      zIndex: 50
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(171, 143, 244, 0.1)' : state.isFocused ? (isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.04)') : 'transparent',
      color: state.isSelected ? '#ab8ff4' : isDark ? '#fff' : '#1a1a2e',
      cursor: 'pointer',
      fontSize: '0.875rem',
      '&:active': {
        backgroundColor: 'rgba(171, 143, 244, 0.1)'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? '#fff' : '#1a1a2e',
      fontSize: '0.875rem'
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? '#fff' : '#1a1a2e',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,0.3)',
      fontSize: '0.875rem'
    })
  };

  const handleCountryChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, country: selectedOption.label }));
  };

  // Fetch initial data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/settings/profile`, {
          headers: getAuthHeaders()
        });
        const json = await res.json();
        
        if (json.success) {
          setFormData({
            fullName: json.data.fullName || "",
            username: json.data.username || "",
            email: json.data.email || "",
            phoneNumber: json.data.phoneNumber || "",
            careerGoal: json.data.careerGoal || "",
            university: json.data.university || "",
            country: json.data.country || "United States",
            bio: json.data.bio || "",
            profilePicture: json.data.profilePicture || "",
          });
          if (json.data.updatedAt) {
            setUpdatedAt(json.data.updatedAt);
            setLastSaved(formatLastSaved(json.data.updatedAt));
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > 200) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // #16 FIX: Exclude email from PUT body — email is read-only and must not be changed via this form
      const { email: _omit, ...saveData } = formData;
      const res = await fetch(`${API_URL}/settings/profile`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saveData)
      });
      const json = await res.json();
      
      if (json.success) {
        showToast("Profile updated successfully", "success");
        setFormData(prev => ({ ...prev, ...json.data }));
        if (json.data.updatedAt) {
          setUpdatedAt(json.data.updatedAt);
          setLastSaved(formatLastSaved(json.data.updatedAt));
        } else {
          const nowIso = new Date().toISOString();
          setUpdatedAt(nowIso);
          setLastSaved(formatLastSaved(nowIso));
        }

        const nameParts = (json.data.fullName || "").trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        updateUser({
          firstName,
          lastName,
          fullName: json.data.fullName,
          username: json.data.username,
          profilePicture: json.data.profilePicture
        });
      } else {
        showToast(json.message || "Failed to update profile", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error occurred", "error");
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image size must be less than 2MB", "error");
      return;
    }

    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("context", "profile");

    try {
      showToast("Uploading image...", "info");
      const headers = getAuthHeaders();
      delete headers["Content-Type"]; // Let browser set multipart boundary

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: headers,
        body: imgData,
      });
      const json = await res.json();
      
      if (json.success) {
        setFormData(prev => ({ ...prev, profilePicture: json.url }));
        showToast("Profile picture updated!", "success");
        updateUser({ profilePicture: json.url });
        
        // #13 FIX: Send the full current formData merged with new picture URL so other fields aren't lost
        const { email: _omit, ...saveData } = { ...formData, profilePicture: json.url };
        await fetch(`${API_URL}/settings/profile`, {
          method: "PUT",
          headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify(saveData)
        });
      } else {
        showToast(json.message || "Failed to upload image", "error");
      }
    } catch (err) {
      showToast("Upload failed", "error");
    }
  };

  const removePhoto = async () => {
    setFormData(prev => ({ ...prev, profilePicture: "" }));
    updateUser({ profilePicture: "" });
    try {
      await fetch(`${API_URL}/settings/profile`, {
        method: "PUT",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ profilePicture: "" })
      });
      showToast("Profile picture removed", "success");
    } catch (err) {
      // #14 FIX: Roll back local state if server call fails
      console.error(err);
      showToast("Failed to remove photo — please try again", "error");
      // Re-fetch the profile to restore the correct picture from server
      try {
        const res = await fetch(`${API_URL}/settings/profile`, { headers: getAuthHeaders() });
        const json = await res.json();
        if (json.success) setFormData(prev => ({ ...prev, profilePicture: json.data.profilePicture || "" }));
      } catch {
        // ignore retry failure
      }
    }
  };

  // Danger Zone Actions
  const handleDangerAction = async () => {
    const isDeactivate = modalConfig.type === "deactivate";
    const endpoint = isDeactivate ? "/settings/profile/deactivate" : "/settings/profile";
    const method = isDeactivate ? "PUT" : "DELETE";

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: getAuthHeaders()
      });
      const json = await res.json();
      
      if (json.success) {
        setModalConfig({ show: false, type: "", title: "", desc: "", actionText: "" });
        // Log out the user cleanly
        logout();
        window.location.href = "/signin";
      } else {
        showToast(json.message || "Action failed", "error");
      }
    } catch (err) {
      showToast("Server error occurred", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const initialLetter = (formData.fullName || user?.firstName || "N")[0].toUpperCase();

  return (
    <div className="relative">
      
      {/* Toast Notification (Premium Glassmorphic) */}
      {toast.show && (
        <div className="fixed top-8 right-8 z-[9999] animate-fade-in-up">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border ${toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : toast.type === 'info' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-violet-500/10 border-violet-500/20 text-violet-400'} backdrop-blur-xl`}>
            <span className="material-symbols-outlined text-[20px]">
              {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
            </span>
            <span className="text-sm font-bold tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Danger Zone Modal (Premium) */}
      {modalConfig.show && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0f1115]/80 backdrop-blur-md transition-opacity animate-fade-in" onClick={() => setModalConfig({ ...modalConfig, show: false })}></div>
          <div className="relative bg-[#16181d] border border-white/10 rounded-[1.5rem] p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-red-500 text-[24px]">warning</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{modalConfig.title}</h2>
            <p className="text-sm text-slate-400 mb-8">{modalConfig.desc}</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setModalConfig({ ...modalConfig, show: false })}
                className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-bold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleDangerAction}
                className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all"
              >
                {modalConfig.actionText}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Profile
        </h1>
        <p className="text-[15px] text-slate-600 dark:text-white/60">
          Manage your personal information and career identity.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ab8ff4] to-[#5d21df] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(171,143,244,0.3)] relative overflow-hidden">
          {formData.profilePicture ? (
            <img src={formData.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-black text-slate-900 dark:text-white">{initialLetter}</span>
          )}
        </div>
        <div className="flex flex-col items-center sm:items-start justify-center flex-1 h-full pt-2">
          <div className="flex items-center gap-3 mb-3">
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageChange}
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:bg-white/5 transition-all text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase cursor-pointer"
            >
              Change Photo
            </button>
            {formData.profilePicture && (
              <button onClick={removePhoto} className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest">
                Remove
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-white/40">
            JPG or PNG. Max 2MB. Recommended 400x400px.
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-12">
        <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-6">
          Personal Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
              Username
            </label>
            <div className="relative flex items-center w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg overflow-hidden focus-within:border-[#ab8ff4]/50 transition-colors">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none min-w-0"
              />
              <div className="hidden sm:flex px-4 text-[11px] text-slate-400 dark:text-white/30 border-l border-slate-200 dark:border-white/5 h-full items-center bg-white/[0.02] pointer-events-none shrink-0">
                aspirev.com/p/{formData.username || "username"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
              Email Address
            </label>
            <div className="relative w-full">
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-sm text-slate-400 dark:text-white/40 cursor-not-allowed focus:outline-none transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-50 dark:bg-[#00daf3]/10 text-slate-900 dark:text-[#00daf3] rounded-full px-2.5 py-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">
                  verified
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
              Phone Number{" "}
              <span className="text-slate-400 dark:text-white/30 font-normal">
                (Optional)
              </span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors placeholder:text-slate-400 dark:text-white/20"
            />
          </div>
        </div>
      </div>

      {/* Career Identity */}
      <div className="mb-10">
        <div className="text-[11px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-6">
          Career Identity
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
            Current Career Goal
          </label>
          <input
            type="text"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
            placeholder="e.g. Senior AI Systems Architect"
            className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
              University or Organization
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="e.g. Nexus Tech Institute"
              className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80 mb-2">
              Country/Region
            </label>
            <div className="relative w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-transparent rounded-lg">
              <Select 
                options={options}
                value={options.find(opt => opt.label === formData.country) || null}
                onChange={handleCountryChange}
                styles={customStyles}
                placeholder="Select Country"
                classNamePrefix="react-select"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-white/80">
              Professional Bio
            </label>
            <span className="text-[10px] text-slate-500 dark:text-white/40 font-medium tracking-widest">
              {formData.bio.length} / 200
            </span>
          </div>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your professional journey and aspirations..."
            className="w-full bg-white dark:bg-[#17181c] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#ab8ff4]/50 transition-colors resize-none placeholder:text-slate-400 dark:text-white/20"
          ></textarea>
        </div>
      </div>

      {/* Save Button */}
      <div className="mb-12">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-to-r from-[#ab8ff4] to-[#814df3] hover:from-[#bda5f7] hover:to-[#9165f5] text-slate-900 dark:text-white font-bold py-3.5 rounded-xl shadow-[0_10px_20px_rgba(129,77,243,0.2)] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
        >
          {saving ? (
            <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
          ) : null}
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <div className="text-[9px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] text-center mt-3 font-bold">
          Last Saved: {lastSaved}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-500/20 bg-red-500/[0.02] rounded-2xl p-6 relative">
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-red-500/50 text-[18px]">
            close
          </span>
        </div>

        <h3 className="text-red-400 font-bold text-lg mb-1">Danger Zone</h3>
        <p className="text-sm text-slate-500 dark:text-white/50 mb-6">
          Be careful, these actions are permanent and cannot be undone.
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-slate-200 dark:border-white/5">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white/90 mb-1">
              Deactivate Account
            </div>
            <div className="text-[12px] text-slate-500 dark:text-white/40">
              Temporarily hide your profile and data. You can reactivate at any
              time.
            </div>
          </div>
          <button 
            onClick={() => setModalConfig({ 
              show: true, 
              type: "deactivate", 
              title: "Deactivate Account", 
              desc: "Are you sure you want to deactivate your account? Your profile will be hidden until you sign in again.",
              actionText: "Yes, Deactivate"
            })}
            className="px-6 py-2 rounded-lg border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 text-slate-700 dark:text-white/80 hover:text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest transition-colors shrink-0"
          >
            Deactivate
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white/90 mb-1">
              Delete Account
            </div>
            <div className="text-[12px] text-slate-500 dark:text-white/40">
              Permanently remove all your career data, roadmaps, and history
              from Aspirev.
            </div>
          </div>
          <button 
            onClick={() => setModalConfig({ 
              show: true, 
              type: "delete", 
              title: "Delete Account", 
              desc: "Are you sure you want to permanently delete your account? This action cannot be undone.",
              actionText: "Delete Permanently"
            })}
            className="px-6 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest transition-colors shrink-0"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
