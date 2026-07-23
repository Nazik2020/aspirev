import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import KanbanBoard from "../components/dashboard/JobTracker/KanbanBoard";
import TableView from "../components/dashboard/JobTracker/TableView";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

const stages = [
  {
    key: "WISHLIST",
    name: "Wishlist",
    dot: "bg-gray-400",
    badgeStyle:
      "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 border-slate-200 dark:border-white/5",
  },
  {
    key: "APPLIED",
    name: "Applied",
    dot: "bg-cyan-400",
    badgeStyle: "bg-cyan-500/5 text-cyan-400 border-cyan-500/15",
  },
  {
    key: "ASSESSMENT",
    name: "Assessment",
    dot: "bg-violet-400",
    badgeStyle: "bg-violet-500/5 text-violet-400 border-violet-500/15",
  },
  {
    key: "INTERVIEW",
    name: "Interview",
    dot: "bg-emerald-400",
    badgeStyle: "bg-emerald-500/5 text-emerald-400 border-emerald-500/15",
  },
  {
    key: "FINAL_INTERVIEW",
    name: "Final Interview",
    dot: "bg-indigo-400",
    badgeStyle: "bg-indigo-500/5 text-indigo-400 border-indigo-500/15",
  },
  {
    key: "OFFER",
    name: "Offer",
    dot: "bg-fuchsia-400",
    badgeStyle: "bg-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/15",
  },
  {
    key: "REJECTED",
    name: "Rejected",
    dot: "bg-rose-400",
    badgeStyle: "bg-rose-500/5 text-rose-400 border-rose-500/15",
  },
];

const initialApps = [
  {
    id: "1",
    company: "Nvidia",
    role: "Product Designer",
    stage: "WISHLIST",
    time: "2d ago",
    badge: "REMOTE",
    logoColor: "bg-green-500/10 text-green-400",
    logoText: "NV",
    location: "Santa Clara, CA (Remote)",
    employment: "Full-time",
    jobUrl: "https://nvidia.com/careers/designer",
    dateApplied: "06/16/2026",
    notes: "Interested in the Omniverse design team.",
  },
  {
    id: "2",
    company: "Figma",
    role: "Systems Designer",
    stage: "WISHLIST",
    time: "5d ago",
    badge: "REMOTE",
    logoColor: "bg-orange-500/10 text-orange-400",
    logoText: "FI",
    location: "San Francisco, CA (Hybrid)",
    employment: "Full-time",
    jobUrl: "https://figma.com/careers/systems",
    dateApplied: "06/13/2026",
    notes: "Focusing on Design Systems and variables.",
  },
  {
    id: "3",
    company: "Stripe",
    role: "Senior AI Engineer",
    stage: "APPLIED",
    time: "4h ago",
    badge: "INTERVIEW",
    logoColor: "bg-blue-500/10 text-blue-400",
    logoText: "ST",
    location: "San Francisco, CA (Hybrid)",
    employment: "Full-time",
    jobUrl: "https://stripe.com/careers/ai",
    dateApplied: "06/18/2026",
    notes: "First round technical test completed.",
  },
  {
    id: "4",
    company: "Apple",
    role: "Creative Lead",
    stage: "APPLIED",
    time: "1d ago",
    badge: "APPLIED",
    logoColor:
      "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white/80",
    logoText: "AP",
    location: "Cupertino, CA (Onsite)",
    employment: "Full-time",
    jobUrl: "https://apple.com/careers/creative",
    dateApplied: "06/17/2026",
    notes: "Referral from Sarah in marketing.",
  },
  {
    id: "5",
    company: "Google",
    role: "UX Researcher",
    stage: "ASSESSMENT",
    time: "3d ago",
    badge: "TAKE HOME",
    info: "Due: 24h",
    logoColor: "bg-red-500/10 text-red-400",
    logoText: "GO",
    location: "Mountain View, CA (Hybrid)",
    employment: "Contract",
    jobUrl: "https://google.com/careers/researcher",
    dateApplied: "06/15/2026",
    notes: "Take home assignment received.",
  },
  {
    id: "6",
    company: "Amazon",
    role: "Cloud Architect",
    stage: "INTERVIEW",
    time: "1w ago",
    badge: "TECHNICAL",
    logoColor: "bg-yellow-500/10 text-yellow-400",
    logoText: "AM",
    location: "Seattle, WA (Onsite)",
    employment: "Full-time",
    jobUrl: "https://amazon.com/careers/cloud",
    dateApplied: "06/11/2026",
    notes: "Phone screen went well, scheduling panel loop.",
  },
  {
    id: "7",
    company: "Netflix",
    role: "Staff UI Engineer",
    stage: "FINAL_INTERVIEW",
    time: "1w ago",
    badge: "SYSTEM DESIGN",
    logoColor: "bg-red-600/10 text-red-500",
    logoText: "NF",
    location: "Los Gatos, CA (Remote)",
    employment: "Full-time",
    jobUrl: "https://netflix.com/careers/ui",
    dateApplied: "06/11/2026",
    notes: "System Design round scheduled.",
  },
  {
    id: "8",
    company: "Microsoft",
    role: "Senior Web Dev",
    stage: "OFFER",
    time: "2w ago",
    badge: "RECRUITER CALL",
    logoColor: "bg-teal-500/10 text-teal-400",
    logoText: "MS",
    location: "Redmond, WA (Hybrid)",
    employment: "Full-time",
    jobUrl: "https://microsoft.com/careers/dev",
    dateApplied: "06/04/2026",
    notes: "Offer in hand! Negotiating base salary.",
  },
];

const JobTrackerPage = () => {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("DESC"); // DESC = Recent First, ASC = Oldest First
  const [viewMode, setViewMode] = useState("BOARD");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  
  // Custom Discard Modal State
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  
  // Toast & UI States
  const [toast, setToast] = useState({ show: false, message: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const { getAuthHeaders } = useAuth();

  // Fetch jobs from MongoDB backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs`, {
          headers: getAuthHeaders(),
        });
        const json = await response.json();
        if (json.success) {
          const formatted = json.data.map(app => ({ ...app, id: app._id }));
          setApps(formatted);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Form inputs state (Add Modal)
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [addLocation, setAddLocation] = useState("");
  const [addEmployment, setAddEmployment] = useState("Full-time");
  const [dateApplied, setDateApplied] = useState("");
  const [appStage, setAppStage] = useState("APPLIED");
  const [notes, setNotes] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);

  // Edit Drawer state
  const [isEditing, setIsEditing] = useState(false);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStage, setEditStage] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editEmployment, setEditEmployment] = useState("");
  const [editJobUrl, setEditJobUrl] = useState("");
  const [editDateApplied, setEditDateApplied] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Dropdowns visibility
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
  const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);

  const filterDropdownRef = useRef(null);
  const modalDropdownRef = useRef(null);
  const drawerDropdownRef = useRef(null);
  const kanbanContainerRef = useRef(null);
  const columnRefs = useRef({});

  // Auto-scroll logic is now inside KanbanBoard

  // Sync drawer states when app selected
  useEffect(() => {
    if (selectedApp) {
      setEditCompany(selectedApp.company);
      setEditRole(selectedApp.role);
      setEditStage(selectedApp.stage);
      setEditLocation(selectedApp.location || "");
      setEditEmployment(selectedApp.employment || "Full-time");
      setEditJobUrl(selectedApp.jobUrl || "");
      setEditDateApplied(selectedApp.dateApplied || "");
      setEditNotes(selectedApp.notes || "");
      setIsEditing(false);
    }
  }, [selectedApp]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setFilterDropdownOpen(false);
      }
      if (
        modalDropdownRef.current &&
        !modalDropdownRef.current.contains(event.target)
      ) {
        setModalDropdownOpen(false);
      }
      if (
        drawerDropdownRef.current &&
        !drawerDropdownRef.current.contains(event.target)
      ) {
        setDrawerDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submit (Add Modal)
  const handleSave = async (e) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (!companyName.trim() || !jobTitle.trim()) return;

    const stageObj = stages.find((s) => s.key === appStage) || stages[1];

    const newApp = {
      company: companyName.trim(),
      role: jobTitle.trim(),
      stage: appStage,
      time: "Just now",
      badge: stageObj.name.toUpperCase(),
      logoText: companyName.trim().slice(0, 2).toUpperCase(),
      logoColor: "bg-violet-500/10 text-violet-400",
      location: addLocation.trim() || "Remote",
      employment: addEmployment,
      jobUrl: jobUrl.trim(),
      dateApplied: dateApplied.trim() || new Date().toLocaleDateString(),
      notes: notes.trim(),
    };

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newApp),
      });
      const json = await response.json();
      
      if (json.success) {
        const savedApp = { ...json.data, id: json.data._id };
        setApps((prev) => [savedApp, ...prev]);
        setShowAddModal(false);
        setTriedSubmit(false);
        setCompanyName("");
        setJobTitle("");
        setJobUrl("");
        setAddLocation("");
        setAddEmployment("Full-time");
        setDateApplied("");
        setAppStage("APPLIED");
        setNotes("");
        showToast("Job application saved successfully!");
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // Handle save edit drawer changes
  const handleSaveDrawer = async () => {
    if (!editCompany.trim() || !editRole.trim()) return;
    const stageObj = stages.find((s) => s.key === editStage) || stages[1];

    const updateData = {
      company: editCompany.trim(),
      role: editRole.trim(),
      stage: editStage,
      badge: stageObj.name.toUpperCase(),
      location: editLocation.trim(),
      employment: editEmployment,
      jobUrl: editJobUrl.trim(),
      dateApplied: editDateApplied.trim(),
      notes: editNotes.trim(),
      logoText: editCompany.trim().slice(0, 2).toUpperCase(),
    };

    try {
      const response = await fetch(`${API_URL}/jobs/${selectedApp.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      const json = await response.json();
      
      if (json.success) {
        setApps((prev) =>
          prev.map((a) => {
            if (a.id === selectedApp.id) {
              return { ...a, ...updateData };
            }
            return a;
          }),
        );

        setSelectedApp((prev) => ({
          ...prev,
          ...updateData,
        }));
        setIsEditing(false);
        showToast("Changes saved successfully!");
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Check if any fields were actually modified
  const hasUnsavedChanges = useMemo(() => {
    if (!selectedApp) return false;
    return (
      editCompany !== selectedApp.company ||
      editRole !== selectedApp.role ||
      editStage !== selectedApp.stage ||
      editLocation !== (selectedApp.location || "") ||
      editEmployment !== (selectedApp.employment || "Full-time") ||
      editJobUrl !== (selectedApp.jobUrl || "") ||
      editDateApplied !== (selectedApp.dateApplied || "") ||
      editNotes !== (selectedApp.notes || "")
    );
  }, [selectedApp, editCompany, editRole, editStage, editLocation, editEmployment, editJobUrl, editDateApplied, editNotes]);

  // Check if any fields were actually modified in Add Modal
  const hasUnsavedAddChanges = useMemo(() => {
    return (
      companyName.trim() !== "" ||
      jobTitle.trim() !== "" ||
      jobUrl.trim() !== "" ||
      notes.trim() !== "" ||
      addLocation.trim() !== "" ||
      addEmployment !== "Full-time"
    );
  }, [companyName, jobTitle, jobUrl, notes, addLocation, addEmployment]);

  // Protect against accidental browser tab closures
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if ((isEditing && hasUnsavedChanges) || (showAddModal && hasUnsavedAddChanges)) {
        e.preventDefault();
        e.returnValue = ""; // Required for modern browsers to show the prompt
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isEditing, hasUnsavedChanges, showAddModal, hasUnsavedAddChanges]);

  const handleCloseAddModal = () => {
    if (hasUnsavedAddChanges) {
      setPendingAction("close_add");
      setShowDiscardConfirm(true);
    } else {
      setShowAddModal(false);
      setTriedSubmit(false);
      // Reset form
      setCompanyName("");
      setJobTitle("");
      setJobUrl("");
      setAppStage("APPLIED");
      setAddLocation("");
      setAddEmployment("Full-time");
      setDateApplied("");
      setNotes("");
    }
  };

  const handleCloseDrawer = () => {
    if (isEditing && hasUnsavedChanges) {
      setPendingAction("close");
      setShowDiscardConfirm(true);
    } else {
      setIsEditing(false);
      setSelectedApp(null);
    }
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      if (hasUnsavedChanges) {
        setPendingAction("cancel_edit");
        setShowDiscardConfirm(true);
      } else {
        setIsEditing(false); // No changes, just cancel safely
      }
    } else {
      setIsEditing(true);
    }
  };

  const executeDiscard = () => {
    if (pendingAction === "close") {
      setIsEditing(false);
      setSelectedApp(null);
    } else if (pendingAction === "cancel_edit") {
      setIsEditing(false);
      // Reset states
      setEditCompany(selectedApp.company);
      setEditRole(selectedApp.role);
      setEditStage(selectedApp.stage);
      setEditLocation(selectedApp.location || "");
      setEditEmployment(selectedApp.employment || "Full-time");
      setEditJobUrl(selectedApp.jobUrl || "");
      setEditDateApplied(selectedApp.dateApplied || "");
      setEditNotes(selectedApp.notes || "");
    } else if (pendingAction === "close_add") {
      setShowAddModal(false);
      setTriedSubmit(false);
      // Reset form
      setCompanyName("");
      setJobTitle("");
      setJobUrl("");
      setAppStage("APPLIED");
      setAddLocation("");
      setAddEmployment("Full-time");
      setDateApplied("");
      setNotes("");
    }
    setShowDiscardConfirm(false);
    setPendingAction(null);
  };

  // Handle delete/archive
  const handleArchive = async () => {
    if (!selectedApp) return;
    
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      setTimeout(() => setDeleteConfirm(false), 3000);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/jobs/${selectedApp.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const json = await response.json();
      
      if (json.success) {
        setApps((prev) => prev.filter((a) => a.id !== selectedApp.id));
        setSelectedApp(null);
        setDeleteConfirm(false);
        showToast("Application archived successfully");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleShare = () => {
    if (!selectedApp) return;
    const shareText = `Check out this job opportunity I'm tracking!\n\nCompany: ${selectedApp.company}\nRole: ${selectedApp.role}\nStatus: ${selectedApp.stage}\nLink: ${selectedApp.jobUrl || 'N/A'}`;
    navigator.clipboard.writeText(shareText).then(() => {
      showToast("Details copied to clipboard!");
    });
  };

  // Derived statistics
  const stats = useMemo(() => {
    const total = apps.length;
    const inProgress = apps.filter((a) =>
      ["APPLIED", "ASSESSMENT", "INTERVIEW", "FINAL_INTERVIEW"].includes(
        a.stage,
      ),
    ).length;
    const interviews = apps.filter((a) =>
      ["INTERVIEW", "FINAL_INTERVIEW"].includes(a.stage),
    ).length;
    const offers = apps.filter((a) => a.stage === "OFFER").length;
    return {
      total,
      inProgress,
      interviews,
      offers,
      successRate: total > 0 ? Math.round((offers / total) * 100) : 0,
    };
  }, [apps]);

  // Filtered and Sorted lists for Kanban and Table
  const filteredApps = useMemo(() => {
    let result = apps.filter((a) => {
      const matchSearch =
        a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.role.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || a.stage === statusFilter;
      return matchSearch && matchStatus;
    });

    // Apply sorting
    result.sort((a, b) => {
      // Use dateApplied if present, otherwise fallback to id/creation logic
      const dateA = new Date(a.dateApplied || a.createdAt).getTime() || 0;
      const dateB = new Date(b.dateApplied || b.createdAt).getTime() || 0;
      return sortOrder === "DESC" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [apps, search, statusFilter, sortOrder]);

  // Timeline steps for the bottom timeline
  const timelineSteps = useMemo(() => {
    if (!selectedApp) return [];
    const appDate = selectedApp.dateApplied || new Date().toISOString().split('T')[0];
    let baseDate = new Date(appDate);
    if (isNaN(baseDate.getTime())) baseDate = new Date();

    const addDaysStr = (date, days) => {
      const newD = new Date(date);
      newD.setDate(newD.getDate() + days);
      return newD.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const activeStage = isEditing ? editStage : selectedApp.stage;
    const progression = ["APPLIED", "ASSESSMENT", "INTERVIEW", "FINAL_INTERVIEW", "OFFER"];
    const isRejected = activeStage === "REJECTED";
    
    // Determine the highest stage achieved before rejection
    let highestStageIndex = progression.indexOf(activeStage);
    if (isRejected) {
      if (selectedApp.stage !== "REJECTED") {
        highestStageIndex = progression.indexOf(selectedApp.stage);
      } else {
        // If it was already rejected and we don't know the prior stage, just assume APPLIED
        highestStageIndex = 0; 
      }
    }

    // If it's a Wishlist, we haven't even applied yet.
    if (activeStage === "WISHLIST") highestStageIndex = -1;

    const steps = [];

    // 1. Applied
    steps.push({
      name: "Applied",
      key: "APPLIED",
      date: highestStageIndex >= 0 || isRejected ? addDaysStr(baseDate, 0) : "Pending",
      done: highestStageIndex >= 0 || isRejected,
      isRejected: false
    });

    // 2. Assessment
    if (!isRejected || highestStageIndex >= 1) {
      steps.push({
        name: "Assessment",
        key: "ASSESSMENT",
        date: highestStageIndex >= 1 ? addDaysStr(baseDate, 4) : "Pending",
        done: highestStageIndex >= 1,
        isRejected: false
      });
    }

    // 3. Interview
    if (!isRejected || highestStageIndex >= 2) {
      steps.push({
        name: "Interview",
        key: "INTERVIEW",
        date: highestStageIndex >= 2 ? addDaysStr(baseDate, 7) : "Pending",
        done: highestStageIndex >= 2,
        isRejected: false
      });
    }

    // 4. Final Interview (only show if they reached at least Interview)
    if (!isRejected || highestStageIndex >= 3) {
      if (highestStageIndex >= 2 || !isRejected) {
        steps.push({
          name: "Final Interview",
          key: "FINAL_INTERVIEW",
          date: highestStageIndex >= 3 ? addDaysStr(baseDate, 12) : "Pending",
          done: highestStageIndex >= 3,
          isRejected: false
        });
      }
    }

    // 5. Offer or Rejected
    if (isRejected) {
      steps.push({
        name: "Rejected",
        key: "REJECTED",
        date: addDaysStr(baseDate, 14),
        done: true,
        isRejected: true
      });
    } else if (highestStageIndex >= 4) {
      steps.push({
        name: "Offer Extended",
        key: "OFFER",
        date: addDaysStr(baseDate, 14),
        done: true,
        isRejected: false
      });
    }

    return steps;
  }, [selectedApp, isEditing, editStage]);

  // Handle click on timeline to quick-update status
  const handleTimelineClick = async (newStageKey) => {
    if (!selectedApp || !newStageKey) return;
    
    // If in Edit mode, clicking timeline should just update the dropdown selection
    if (isEditing) {
      if (editStage === newStageKey) return;
      setEditStage(newStageKey);
      return;
    }

    // Otherwise, normal behavior: optimistic update & save
    if (selectedApp.stage === newStageKey) return;
    
    const stageObj = stages.find(s => s.key === newStageKey);
    const updateData = { stage: newStageKey, badge: stageObj?.name.toUpperCase() };

    // Optimistic Update
    setSelectedApp(prev => ({ ...prev, ...updateData }));
    setApps(prev => prev.map(a => a.id === selectedApp.id ? { ...a, ...updateData } : a));

    try {
      await fetch(`${API_URL}/jobs/${selectedApp.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      showToast(`Status updated to ${stageObj?.name}`);
    } catch (error) {
      console.error("Error updating timeline stage:", error);
    }
  };

  return (
    <div className="w-full space-y-8 relative">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Job Application Tracker
          </h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-medium">
            Track every opportunity. Miss nothing.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-full
                               bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400
                               text-slate-900 dark:text-white text-sm font-bold shadow-[0_10px_25px_rgba(93,33,223,0.25)] hover:scale-102 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] font-bold">
            add
          </span>
          Add Application
        </button>
      </div>

      {/* ── Stats Summary Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-[0.6rem] text-slate-400 dark:text-white/30 uppercase tracking-widest font-black mb-1">
            Total Apps
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.total}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-[0.6rem] text-slate-400 dark:text-white/30 uppercase tracking-widest font-black mb-1">
            In Progress
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.inProgress}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-[0.6rem] text-slate-400 dark:text-white/30 uppercase tracking-widest font-black mb-1">
            Interviews
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.interviews}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-[0.6rem] text-slate-400 dark:text-white/30 uppercase tracking-widest font-black mb-1">
            Offers
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.offers}
          </span>
        </div>
        <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white dark:bg-[#1e1f23]/60 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-[0.6rem] text-slate-400 dark:text-white/30 uppercase tracking-widest font-black mb-1">
            Success Rate
          </span>
          <div className="relative w-12 h-12 flex items-center justify-center mt-1">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor" strokeWidth="3.5" className="text-slate-100 dark:text-white/5"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#8b5cf6"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={
                  2 * Math.PI * 20 * (1 - stats.successRate / 100)
                }
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[0.75rem] font-black text-slate-900 dark:text-white">
              {stats.successRate}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies, roles, or skills..."
            className="w-full bg-white dark:bg-[#1e1f23] border border-slate-200 dark:border-white/8 rounded-xl pl-11 pr-4 py-3 text-[0.9rem]
                                   text-slate-700 dark:text-white/80 placeholder:text-slate-400 dark:text-white/25 focus:outline-none focus:border-primary/45
                                   focus:bg-slate-50 dark:bg-[#24252a] transition-all"
          />
        </div>

        <div className="flex bg-slate-100 dark:bg-white/5 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setViewMode("BOARD")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[0.8rem] font-bold transition-all ${
              viewMode === "BOARD"
                ? "bg-white dark:bg-violet-600 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              view_kanban
            </span>
            BOARD
          </button>
          <button
            onClick={() => setViewMode("TABLE")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[0.8rem] font-bold transition-all ${
              viewMode === "TABLE"
                ? "bg-white dark:bg-violet-600 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              table_rows
            </span>
            TABLE
          </button>
        </div>

        <div className="flex gap-3 w-full md:w-auto relative">
          {/* Custom Dropdown Filter */}
          <div className="relative flex-1 md:flex-none" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="w-full md:w-48 bg-white dark:bg-[#1e1f23] border border-slate-200 dark:border-white/8 rounded-xl px-4 py-3 text-[0.85rem] text-slate-600 dark:text-white/70 focus:outline-none focus:border-primary/45 text-left flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                {statusFilter === "All" ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/40" />
                    All Statuses
                  </>
                ) : (
                  <>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${stages.find((s) => s.key === statusFilter)?.dot}`}
                    />
                    {stages.find((s) => s.key === statusFilter)?.name}
                  </>
                )}
              </span>
              <span className="material-symbols-outlined text-slate-400 dark:text-white/30 text-[18px]">
                keyboard_arrow_down
              </span>
            </button>

            {filterDropdownOpen && (
              <>
                {/* Invisible overlay to close dropdown on click outside */}
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setFilterDropdownOpen(false)}
                />
                <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-[220px] rounded-2xl bg-white dark:bg-[#1f2023] border border-slate-200 dark:border-white/10 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-30">
                  <button
                    onClick={() => {
                      setStatusFilter("All");
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl text-left text-[0.85rem] font-bold flex items-center gap-3 transition-all ${
                      statusFilter === "All"
                        ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
                        : "text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40" />
                    All Statuses
                  </button>
                  <div className="h-[1px] bg-slate-100 dark:bg-white/5 my-1.5 mx-2" />
                  {stages.map((stage) => (
                    <button
                      key={stage.key}
                      onClick={() => {
                        setStatusFilter(stage.key);
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl text-left text-[0.85rem] font-bold flex items-center gap-3 transition-all ${
                        statusFilter === stage.key
                          ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${stage.dot}`}
                      />
                      {stage.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sort button/indicator */}
          <button 
            onClick={() => setSortOrder(prev => prev === "DESC" ? "ASC" : "DESC")}
            className="flex items-center justify-between gap-2 bg-white dark:bg-[#1e1f23] hover:bg-slate-50 dark:hover:bg-[#25262b] border border-slate-200 dark:border-white/8 rounded-xl px-4 py-3 text-[0.85rem] text-slate-600 dark:text-white/60 transition-colors w-full md:w-36"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">
                {sortOrder === "DESC" ? "arrow_downward" : "arrow_upward"}
              </span>
              <span>{sortOrder === "DESC" ? "Recent" : "Oldest"}</span>
            </div>
          </button>
        </div>
      </div>

      {/* ── View Area (Kanban or Table) ── */}
      {viewMode === "BOARD" ? (
        <KanbanBoard
          stages={stages}
          filteredApps={filteredApps}
          statusFilter={statusFilter}
          setSelectedApp={setSelectedApp}
        />
      ) : (
        <TableView
          stages={stages}
          filteredApps={filteredApps}
          setSelectedApp={setSelectedApp}
          apps={apps}
          setApps={setApps}
        />
      )}

      {/* ── Health Insight Banner ── */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#1e1f23] p-6 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-violet-400 text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-[0.95rem] font-bold text-white/95">
              Application Health Insight
            </h3>
            <p className="text-slate-500 dark:text-white/40 text-[0.8rem] leading-relaxed max-w-2xl">
              Based on your recent activity, your interview conversion rate has
              increased by{" "}
              <strong className="text-slate-900 dark:text-white">18%</strong>.
              We recommend prioritizing the{" "}
              <strong className="text-slate-900 dark:text-white">
                Next.js Visual Architect
              </strong>{" "}
              offer negotiations as it aligns 94% with your target compensation
              and role level.
            </p>
          </div>
        </div>
        <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/20 text-[0.8rem] font-bold text-slate-900 dark:text-white transition-all whitespace-nowrap">
          View Analysis
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
          >
            auto_awesome
          </span>
        </button>
      </div>

      {/* ── Modal Overlay Form (Add Application) ── */}
      {showAddModal &&
        createPortal(
          <div className="fixed inset-0 z-[50] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
              onClick={handleCloseAddModal}
            />
            <div className="relative z-10 w-full max-w-[calc(100vw-2rem)] sm:max-w-xl rounded-3xl bg-white dark:bg-[#131417] border border-slate-200 dark:border-white/10 p-5 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto no-scrollbar">
              {/* Top-Right Close Button */}
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setTriedSubmit(false);
                }}
                className="absolute top-5 right-5 text-slate-400 dark:text-white/30 hover:text-slate-700 dark:text-white/80 p-2 rounded-full hover:bg-slate-100 dark:bg-white/5 transition-all"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>

              <div className="space-y-1 mb-8 pr-10">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Add New Application
                </h2>
                <p className="text-slate-500 dark:text-white/40 text-xs font-semibold">
                  Enter the details of your latest career venture.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Linear"
                      className={`w-full bg-white dark:bg-[#121316] border rounded-xl px-4 py-3 text-[0.85rem] text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-white/40 focus:outline-none focus:border-primary/45 transition-all
                                            ${
                                              triedSubmit && !companyName.trim()
                                                ? "border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.15)] focus:border-rose-500"
                                                : "border-slate-200 dark:border-white/5"
                                            }`}
                    />
                    {triedSubmit && !companyName.trim() && (
                      <p className="text-[0.7rem] text-rose-400/90 font-bold tracking-wide">
                        Company name is required
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Designer"
                      className={`w-full bg-white dark:bg-[#121316] border rounded-xl px-4 py-3 text-[0.85rem] text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-white/40 focus:outline-none focus:border-primary/45 transition-all
                                            ${
                                              triedSubmit && !jobTitle.trim()
                                                ? "border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.15)] focus:border-rose-500"
                                                : "border-slate-200 dark:border-white/5"
                                            }`}
                    />
                    {triedSubmit && !jobTitle.trim() && (
                      <p className="text-[0.7rem] text-rose-400/90 font-bold tracking-wide">
                        Job title is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Job URL
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 text-[18px] pointer-events-none">
                        link
                      </span>
                      <input
                        type="text"
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        placeholder="https://careers.company.co"
                        className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl pl-11 pr-4 py-3 text-[0.85rem] text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-white/40 focus:outline-none focus:border-primary/45 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Location
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 text-[18px] pointer-events-none">
                        location_on
                      </span>
                      <input
                        type="text"
                        value={addLocation}
                        onChange={(e) => setAddLocation(e.target.value)}
                        placeholder="e.g. San Francisco, CA (Hybrid)"
                        className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl pl-11 pr-4 py-3 text-[0.85rem] text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-white/40 focus:outline-none focus:border-primary/45 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Employment Type
                    </label>
                    <select
                      value={addEmployment}
                      onChange={(e) => setAddEmployment(e.target.value)}
                      className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-[0.85rem] text-slate-900 dark:text-white focus:outline-none focus:border-primary/45 transition-all"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Date Applied
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 text-[18px] pointer-events-none">
                        calendar_today
                      </span>
                      <input
                        type="date"
                        value={dateApplied}
                        onChange={(e) => setDateApplied(e.target.value)}
                        className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl pl-11 pr-4 py-3 text-[0.85rem] text-slate-900 dark:text-white focus:outline-none focus:border-primary/45 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 relative" ref={modalDropdownRef}>
                  <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40 block mb-1">
                    Application Stage
                  </label>
                  <button
                    type="button"
                    onClick={() => setModalDropdownOpen(!modalDropdownOpen)}
                    className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-[0.85rem] text-slate-900 dark:text-white focus:outline-none focus:border-primary/45 text-left flex items-center justify-between gap-2"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${stages.find((s) => s.key === appStage)?.dot}`}
                      />
                      {stages.find((s) => s.key === appStage)?.name}
                    </span>
                    <span className="material-symbols-outlined text-slate-400 dark:text-white/30 text-[18px]">
                      keyboard_arrow_down
                    </span>
                  </button>

                  {modalDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white dark:bg-[#141519] border border-slate-200 dark:border-white/10 p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                      {stages.map((stage) => (
                        <button
                          key={stage.key}
                          type="button"
                          onClick={() => {
                            setAppStage(stage.key);
                            setModalDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2.5 rounded-lg text-left text-[0.85rem] text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:bg-white/5 hover:text-slate-900 dark:text-white flex items-center gap-2.5 transition-all"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${stage.dot}`}
                          />
                          {stage.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Salary expectations, referral details, or specific interests..."
                    rows="4"
                    className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-lg px-4 py-3 text-[0.85rem] text-slate-900 dark:text-white placeholder:text-slate-500 dark:text-white/40 focus:outline-none focus:border-primary/45 transition-all resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end items-center gap-5 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseAddModal}
                    className="text-xs font-bold text-slate-500 dark:text-white/40 hover:text-slate-700 dark:text-white/80 transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400
                                               text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(93,33,223,0.25)] hover:scale-102 transition-all"
                  >
                    Save Application
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}

      {/* ── Details Side Drawer ── */}
      {selectedApp &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex justify-end">
            {/* Backdrop */}
            <div
              onClick={handleCloseDrawer}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
            />

            {/* Side Drawer Body */}
            <div className="relative z-10 w-full max-w-[100vw] sm:max-w-md bg-white dark:bg-[#17181c] border-l border-slate-200 dark:border-white/10 h-full shadow-[-10px_0_40px_rgba(0,0,0,0.6)] p-5 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-7">
                {/* Drawer Top Navigation bar */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleCloseDrawer}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:bg-white/10 hover:text-slate-900 dark:text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Close details"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      close
                    </span>
                  </button>

                  <button
                    onClick={handleToggleEdit}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white transition-all cursor-pointer"
                  >
                    {isEditing ? "Cancel" : "Edit Details"}
                  </button>
                </div>

                {/* Job Card Info (Logo + Company + Title) */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${selectedApp.logoColor} flex items-center justify-center shrink-0 font-black text-xl`}
                  >
                    {selectedApp.logoText}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] font-black text-slate-400 dark:text-white/30 block">
                      {isEditing ? "Company Name" : selectedApp.company}
                    </span>
                    {isEditing ? (
                      <div className="space-y-3 pt-1">
                        <input
                          type="text"
                          value={editCompany}
                          onChange={(e) => setEditCompany(e.target.value)}
                          className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-3 py-2 text-[0.85rem] text-slate-700 dark:text-white/80 focus:outline-none focus:border-primary/45"
                          placeholder="Company Name"
                        />
                        <input
                          type="text"
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-3 py-2 text-[0.85rem] text-slate-700 dark:text-white/80 focus:outline-none focus:border-primary/45"
                          placeholder="Job Title"
                        />
                      </div>
                    ) : (
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {selectedApp.role}
                      </h2>
                    )}
                  </div>
                </div>

                {/* Stage & Date Applied selectors */}
                <div className="space-y-4">
                  <h3 className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                    Current Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Stage custom dropdown select */}
                    <div className="relative" ref={drawerDropdownRef}>
                      <button
                        type="button"
                        disabled={!isEditing}
                        onClick={() =>
                          setDrawerDropdownOpen(!drawerDropdownOpen)
                        }
                        className={`w-full bg-white dark:bg-[#1c1d22] border rounded-xl px-4 py-3.5 text-[0.85rem] text-slate-700 dark:text-white/85 text-left flex items-center justify-between gap-2 shadow-sm transition-all
                                                ${isEditing ? "border-slate-200 dark:border-white/10 hover:border-violet-500/50 hover:bg-slate-50 dark:hover:bg-[#1e1f23] cursor-pointer" : "border-transparent cursor-default"}`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${stages.find((s) => s.key === (isEditing ? editStage : selectedApp.stage))?.dot}`}
                          />
                          {
                            stages.find(
                              (s) =>
                                s.key ===
                                (isEditing ? editStage : selectedApp.stage),
                            )?.name
                          }
                        </span>
                        {isEditing && (
                          <span className="material-symbols-outlined text-slate-400 dark:text-white/30 text-[18px]">
                            keyboard_arrow_down
                          </span>
                        )}
                      </button>

                      {isEditing && drawerDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 rounded-xl bg-white dark:bg-[#1c1d22] border border-slate-200 dark:border-white/10 p-2 shadow-xl shadow-black/20 z-30 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                          {stages.map((stage) => (
                            <button
                              key={stage.key}
                              type="button"
                              onClick={() => {
                                setEditStage(stage.key);
                                setDrawerDropdownOpen(false);
                              }}
                              className="w-full px-3 py-2.5 rounded-lg text-left text-[0.85rem] font-medium text-slate-600 dark:text-white/70 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-3 transition-colors cursor-pointer"
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${stage.dot}`}
                              />
                              {stage.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Date display/input */}
                    <div className="flex items-center gap-2 bg-white dark:bg-[#1c1d22] border border-transparent rounded-xl px-3.5 py-3 text-[0.85rem] text-slate-700 dark:text-white/80">
                      <span className="material-symbols-outlined text-slate-400 dark:text-white/30 text-[18px]">
                        calendar_today
                      </span>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editDateApplied}
                          onChange={(e) => setEditDateApplied(e.target.value)}
                          className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white/85 text-[0.85rem] [color-scheme:dark]"
                        />
                      ) : (
                        <span>{selectedApp.dateApplied || "06/18/2026"}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info fields layout (Stacked vertically for cleaner layout) */}
                <div className="space-y-4 pt-1">
                  <h3 className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                    Information
                  </h3>
                  <div className="space-y-3">
                    {/* Location Card */}
                    <div className="bg-slate-50 dark:bg-[#1c1d22]/40 border border-slate-200 dark:border-white/5 rounded-2xl p-4 space-y-1">
                      <span className="text-[0.6rem] uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/30">
                        Location
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          placeholder="San Francisco, CA (Hybrid)"
                          className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-3 py-2 mt-1 text-[0.8rem] text-slate-700 dark:text-white/80 focus:outline-none"
                        />
                      ) : (
                        <p className="text-[0.85rem] font-bold text-slate-900 dark:text-white">
                          {selectedApp.location || "Not Specified"}
                        </p>
                      )}
                    </div>

                    {/* Employment Card */}
                    <div className="bg-slate-50 dark:bg-[#1c1d22]/40 border border-slate-200 dark:border-white/5 rounded-2xl p-4 space-y-1">
                      <span className="text-[0.6rem] uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/30">
                        Employment
                      </span>
                      {isEditing ? (
                        <select
                          value={editEmployment}
                          onChange={(e) => setEditEmployment(e.target.value)}
                          className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-3 py-2 mt-1 text-[0.8rem] text-slate-700 dark:text-white/80 focus:outline-none"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      ) : (
                        <p className="text-[0.85rem] font-bold text-slate-900 dark:text-white">
                          {selectedApp.employment || "Full-time"}
                        </p>
                      )}
                    </div>

                    {/* Job URL Link Option */}
                    <div className="bg-slate-50 dark:bg-[#1c1d22]/40 border border-slate-200 dark:border-white/5 rounded-2xl p-4 space-y-1">
                      <span className="text-[0.6rem] uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/30">
                        Original Posting
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editJobUrl}
                          onChange={(e) => setEditJobUrl(e.target.value)}
                          placeholder="https://careers.company.co"
                          className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-3 py-2 mt-1 text-[0.8rem] text-slate-700 dark:text-white/80 focus:outline-none"
                        />
                      ) : selectedApp.jobUrl ? (
                        <a
                          href={selectedApp.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.85rem] font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-0.5"
                        >
                          View Original Job Posting
                          <span className="material-symbols-outlined text-[16px]">
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        <p className="text-[0.85rem] font-bold text-slate-500 dark:text-white/40">
                          No link specified
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Internal Notes area */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                      Internal Notes
                    </h3>
                    <span className="material-symbols-outlined text-slate-400 dark:text-white/25 text-[16px]">
                      notes
                    </span>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      rows="4"
                      placeholder="Click to add thoughts about the culture, technical round, or compensation expectations..."
                      className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-[0.85rem] text-slate-700 dark:text-white/80 placeholder:text-slate-400 dark:text-white/20 focus:outline-none resize-none"
                    />
                  ) : (
                    <div className="bg-slate-50 dark:bg-[#1c1d22]/20 border border-slate-200 dark:border-white/5 rounded-2xl p-4 min-h-[90px]">
                      <p className="text-[0.8rem] text-slate-600 dark:text-white/60 leading-relaxed whitespace-pre-wrap">
                        {selectedApp.notes ||
                          "No internal notes added yet. Click Edit Details to add comments."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status Timeline */}
                <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/5">
                  <h4 className="text-[0.65rem] uppercase tracking-widest font-black text-slate-500 dark:text-white/40">
                    Status Timeline
                  </h4>
                  <div className="relative pl-8 space-y-2 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-200 dark:before:bg-white/10">
                    {timelineSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="relative flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                        onClick={() => handleTimelineClick(step.key)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`absolute -left-[27px] w-3.5 h-3.5 rounded-full border-[2px] bg-white dark:bg-[#17181c] z-10 flex items-center justify-center transition-colors
                                                    ${step.isRejected ? "border-rose-500" : step.done ? "border-violet-500" : "border-slate-300 dark:border-white/20 group-hover:border-violet-500/50"}`}
                          >
                            {step.done && (
                              <div className={`w-[6px] h-[6px] rounded-full ${step.isRejected ? "bg-rose-500" : "bg-violet-500"}`} />
                            )}
                          </div>
                          <span
                            className={
                              step.isRejected
                                ? "text-rose-500 font-bold"
                                : step.done
                                ? "text-slate-900 dark:text-white font-medium"
                                : "text-slate-400 dark:text-white/30"
                            }
                          >
                            {step.name}
                          </span>
                        </div>
                        <span className="text-slate-400 dark:text-white/30 font-medium text-[0.7rem]">
                          {step.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions footer bar */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-white/5 gap-4">
                <button
                  onClick={handleArchive}
                  className={`flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-wider transition-all px-3 py-1.5 rounded-lg cursor-pointer ${
                    deleteConfirm ? "bg-rose-500/10 text-rose-500" : "text-rose-400 hover:text-rose-300 hover:bg-rose-500/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                  {deleteConfirm ? "Confirm Delete?" : "Archive Application"}
                </button>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleShare}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Copy details to clipboard"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      share
                    </span>
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSaveDrawer}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-violet-500 hover:from-violet-500 hover:via-purple-500 hover:to-violet-400 text-white text-[0.75rem] font-black uppercase tracking-[0.15em] shadow-[0_8px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_12px_25px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer border border-white/10 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* ── Custom Discard Confirm Modal ── */}
      {showDiscardConfirm && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowDiscardConfirm(false)}
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl z-10 animate-fade-in-up">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20">
              <span className="material-symbols-outlined text-orange-400 text-2xl">
                warning
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              Unsaved Changes
            </h3>
            <p className="text-[0.85rem] text-slate-500 dark:text-white/60 mb-8 leading-relaxed">
              You have made changes to this application that haven't been saved yet. Do you want to discard these changes?
            </p>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 text-[0.85rem] font-bold text-slate-700 dark:text-white transition-colors cursor-pointer"
              >
                Keep Editing
              </button>
              <button
                onClick={executeDiscard}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[0.85rem] font-bold shadow-lg shadow-red-500/25 transition-all cursor-pointer"
              >
                Discard
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Custom Toast Notification ── */}
      {toast.show && createPortal(
        <div className="fixed bottom-6 right-6 z-[99999] bg-gradient-to-r from-[#1e1f23] to-[#25262b] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl p-4 flex items-center gap-4 animate-fade-in-up transform transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="material-symbols-outlined text-[20px] text-white font-bold">check</span>
          </div>
          <div className="pr-4">
            <h4 className="text-[0.85rem] font-extrabold text-white tracking-wide mb-0.5">Success</h4>
            <p className="text-[0.75rem] font-medium text-emerald-400">{toast.message}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default JobTrackerPage;
