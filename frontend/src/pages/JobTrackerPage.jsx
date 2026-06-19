import React, { useState, useMemo, useRef, useEffect } from 'react';

const stages = [
    { key: 'WISHLIST', name: 'Wishlist', dot: 'bg-gray-400', badgeStyle: 'bg-white/5 text-white/50 border-white/5' },
    { key: 'APPLIED', name: 'Applied', dot: 'bg-cyan-400', badgeStyle: 'bg-cyan-500/5 text-cyan-400 border-cyan-500/15' },
    { key: 'ASSESSMENT', name: 'Assessment', dot: 'bg-violet-400', badgeStyle: 'bg-violet-500/5 text-violet-400 border-violet-500/15' },
    { key: 'INTERVIEW', name: 'Interview', dot: 'bg-emerald-400', badgeStyle: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/15' },
    { key: 'FINAL_INTERVIEW', name: 'Final Interview', dot: 'bg-indigo-400', badgeStyle: 'bg-indigo-500/5 text-indigo-400 border-indigo-500/15' },
    { key: 'OFFER', name: 'Offer', dot: 'bg-fuchsia-400', badgeStyle: 'bg-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/15' },
    { key: 'REJECTED', name: 'Rejected', dot: 'bg-rose-400', badgeStyle: 'bg-rose-500/5 text-rose-400 border-rose-500/15' }
];

const initialApps = [
    { id: '1', company: 'Nvidia', role: 'Product Designer', stage: 'WISHLIST', time: '2d ago', badge: 'REMOTE', logoColor: 'bg-green-500/10 text-green-400', logoText: 'NV', location: 'Santa Clara, CA (Remote)', employment: 'Full-time', jobUrl: 'https://nvidia.com/careers/designer', dateApplied: '06/16/2026', notes: 'Interested in the Omniverse design team.' },
    { id: '2', company: 'Figma', role: 'Systems Designer', stage: 'WISHLIST', time: '5d ago', badge: 'REMOTE', logoColor: 'bg-orange-500/10 text-orange-400', logoText: 'FI', location: 'San Francisco, CA (Hybrid)', employment: 'Full-time', jobUrl: 'https://figma.com/careers/systems', dateApplied: '06/13/2026', notes: 'Focusing on Design Systems and variables.' },
    { id: '3', company: 'Stripe', role: 'Senior AI Engineer', stage: 'APPLIED', time: '4h ago', badge: 'IN REVIEW', logoColor: 'bg-blue-500/10 text-blue-400', logoText: 'ST', location: 'San Francisco, CA (Hybrid)', employment: 'Full-time', jobUrl: 'https://stripe.com/careers/ai', dateApplied: '06/18/2026', notes: 'First round technical test completed.' },
    { id: '4', company: 'Apple', role: 'Creative Lead', stage: 'APPLIED', time: '1d ago', badge: 'APPLIED', logoColor: 'bg-white/10 text-white/80', logoText: 'AP', location: 'Cupertino, CA (Onsite)', employment: 'Full-time', jobUrl: 'https://apple.com/careers/creative', dateApplied: '06/17/2026', notes: 'Referral from Sarah in marketing.' },
    { id: '5', company: 'Google', role: 'UX Researcher', stage: 'ASSESSMENT', time: '3d ago', badge: 'TAKE HOME', info: 'Due: 24h', logoColor: 'bg-red-500/10 text-red-400', logoText: 'GO', location: 'Mountain View, CA (Hybrid)', employment: 'Contract', jobUrl: 'https://google.com/careers/researcher', dateApplied: '06/15/2026', notes: 'Take home assignment received.' },
    { id: '6', company: 'Amazon', role: 'Cloud Architect', stage: 'INTERVIEW', time: '1w ago', badge: 'TECHNICAL', logoColor: 'bg-yellow-500/10 text-yellow-400', logoText: 'AM', location: 'Seattle, WA (Onsite)', employment: 'Full-time', jobUrl: 'https://amazon.com/careers/cloud', dateApplied: '06/11/2026', notes: 'Phone screen went well, scheduling panel loop.' },
    { id: '7', company: 'Netflix', role: 'Staff UI Engineer', stage: 'FINAL_INTERVIEW', time: '1w ago', badge: 'SYSTEM DESIGN', logoColor: 'bg-red-600/10 text-red-500', logoText: 'NF', location: 'Los Gatos, CA (Remote)', employment: 'Full-time', jobUrl: 'https://netflix.com/careers/ui', dateApplied: '06/11/2026', notes: 'System Design round scheduled.' },
    { id: '8', company: 'Microsoft', role: 'Senior Web Dev', stage: 'OFFER', time: '2w ago', badge: 'RECRUITER CALL', logoColor: 'bg-teal-500/10 text-teal-400', logoText: 'MS', location: 'Redmond, WA (Hybrid)', employment: 'Full-time', jobUrl: 'https://microsoft.com/careers/dev', dateApplied: '06/04/2026', notes: 'Offer in hand! Negotiating base salary.' },
];

const JobTrackerPage = () => {
    const [apps, setApps] = useState(initialApps);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    // Form inputs state (Add Modal)
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobUrl, setJobUrl] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [appStage, setAppStage] = useState('APPLIED');
    const [notes, setNotes] = useState('');
    const [triedSubmit, setTriedSubmit] = useState(false);

    // Edit Drawer state
    const [isEditing, setIsEditing] = useState(false);
    const [editCompany, setEditCompany] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editStage, setEditStage] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editEmployment, setEditEmployment] = useState('');
    const [editJobUrl, setEditJobUrl] = useState('');
    const [editDateApplied, setEditDateApplied] = useState('');
    const [editNotes, setEditNotes] = useState('');

    // Dropdowns visibility
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [modalDropdownOpen, setModalDropdownOpen] = useState(false);
    const [drawerDropdownOpen, setDrawerDropdownOpen] = useState(false);

    const filterDropdownRef = useRef(null);
    const modalDropdownRef = useRef(null);
    const drawerDropdownRef = useRef(null);

    // Sync drawer states when app selected
    useEffect(() => {
        if (selectedApp) {
            setEditCompany(selectedApp.company);
            setEditRole(selectedApp.role);
            setEditStage(selectedApp.stage);
            setEditLocation(selectedApp.location || '');
            setEditEmployment(selectedApp.employment || 'Full-time');
            setEditJobUrl(selectedApp.jobUrl || '');
            setEditDateApplied(selectedApp.dateApplied || '');
            setEditNotes(selectedApp.notes || '');
            setIsEditing(false);
        }
    }, [selectedApp]);

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setFilterDropdownOpen(false);
            }
            if (modalDropdownRef.current && !modalDropdownRef.current.contains(event.target)) {
                setModalDropdownOpen(false);
            }
            if (drawerDropdownRef.current && !drawerDropdownRef.current.contains(event.target)) {
                setDrawerDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle form submit (Add Modal)
    const handleSave = (e) => {
        e.preventDefault();
        setTriedSubmit(true);
        if (!companyName.trim() || !jobTitle.trim()) return;

        const stageObj = stages.find(s => s.key === appStage) || stages[1];

        const newApp = {
            id: Date.now().toString(),
            company: companyName.trim(),
            role: jobTitle.trim(),
            stage: appStage,
            time: 'Just now',
            badge: stageObj.name.toUpperCase(),
            logoText: companyName.trim().slice(0, 2).toUpperCase(),
            logoColor: 'bg-violet-500/10 text-violet-400',
            location: 'Remote',
            employment: 'Full-time',
            jobUrl: jobUrl.trim(),
            dateApplied: dateApplied.trim() || new Date().toLocaleDateString(),
            notes: notes.trim()
        };

        setApps(prev => [newApp, ...prev]);
        setShowAddModal(false);
        setTriedSubmit(false);

        // Reset
        setCompanyName('');
        setJobTitle('');
        setJobUrl('');
        setDateApplied('');
        setAppStage('APPLIED');
        setNotes('');
    };

    // Handle save edit drawer changes
    const handleSaveDrawer = () => {
        if (!editCompany.trim() || !editRole.trim()) return;

        setApps(prev => prev.map(a => {
            if (a.id === selectedApp.id) {
                const stageObj = stages.find(s => s.key === editStage) || stages[1];
                return {
                    ...a,
                    company: editCompany.trim(),
                    role: editRole.trim(),
                    stage: editStage,
                    badge: stageObj.name.toUpperCase(),
                    location: editLocation.trim(),
                    employment: editEmployment,
                    jobUrl: editJobUrl.trim(),
                    dateApplied: editDateApplied.trim(),
                    notes: editNotes.trim(),
                    logoText: editCompany.trim().slice(0, 2).toUpperCase()
                };
            }
            return a;
        }));

        // Update active selection to reflect updates
        setSelectedApp(prev => ({
            ...prev,
            company: editCompany.trim(),
            role: editRole.trim(),
            stage: editStage,
            location: editLocation.trim(),
            employment: editEmployment,
            jobUrl: editJobUrl.trim(),
            dateApplied: editDateApplied.trim(),
            notes: editNotes.trim()
        }));

        setIsEditing(false);
    };

    // Handle delete/archive
    const handleArchive = () => {
        if (!selectedApp) return;
        setApps(prev => prev.filter(a => a.id !== selectedApp.id));
        setSelectedApp(null);
    };

    // Derived statistics
    const stats = useMemo(() => {
        const total = apps.length;
        const inProgress = apps.filter(a => ['APPLIED', 'ASSESSMENT', 'INTERVIEW', 'FINAL_INTERVIEW'].includes(a.stage)).length;
        const interviews = apps.filter(a => ['INTERVIEW', 'FINAL_INTERVIEW'].includes(a.stage)).length;
        const offers = apps.filter(a => a.stage === 'OFFER').length;
        return {
            total,
            inProgress,
            interviews,
            offers,
            successRate: total > 0 ? Math.round((offers / total) * 100) : 0
        };
    }, [apps]);

    // Filtered lists for Kanban
    const filteredApps = useMemo(() => {
        return apps.filter(a => {
            const matchSearch = a.company.toLowerCase().includes(search.toLowerCase()) ||
                                a.role.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === 'All' || a.stage === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [apps, search, statusFilter]);

    // Timeline steps for the bottom timeline
    const timelineSteps = useMemo(() => {
        if (!selectedApp) return [];
        const appDate = selectedApp.dateApplied || '06/18/2026';
        
        // Parse applied date base
        let appliedDateText = appDate;
        let assessmentDateText = 'Pending';
        let interviewDateText = 'Pending';

        try {
            const dateObj = new Date(appDate);
            if (!isNaN(dateObj.getTime())) {
                const addDays = (d, days) => {
                    const newD = new Date(d);
                    newD.setDate(newD.getDate() + days);
                    return newD.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                };
                appliedDateText = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                assessmentDateText = addDays(dateObj, 4);
                interviewDateText = addDays(dateObj, 7);
            }
        } catch(e) {}

        const activeStage = selectedApp.stage;
        
        return [
            { name: 'Applied', date: appliedDateText, done: true },
            { name: 'Assessment', date: assessmentDateText, done: ['ASSESSMENT', 'INTERVIEW', 'FINAL_INTERVIEW', 'OFFER'].includes(activeStage) },
            { name: 'Interview', date: interviewDateText, done: ['INTERVIEW', 'FINAL_INTERVIEW', 'OFFER'].includes(activeStage) }
        ];
    }, [selectedApp]);

    return (
        <div className="w-full space-y-8 relative">
            
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                    <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        Job Application Tracker
                    </h1>
                    <p className="text-white/40 text-sm font-medium">
                        Track every opportunity. Miss nothing.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-full
                               bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400
                               text-white text-sm font-bold shadow-[0_10px_25px_rgba(93,33,223,0.25)] hover:scale-102 transition-all"
                >
                    <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                    Add Application
                </button>
            </div>

            {/* ── Stats Summary Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-[#1e1f23]/60 border border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mb-1">Total Apps</span>
                    <span className="text-2xl font-black text-white">{stats.total}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1e1f23]/60 border border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mb-1">In Progress</span>
                    <span className="text-2xl font-black text-white">{stats.inProgress}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1e1f23]/60 border border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mb-1">Interviews</span>
                    <span className="text-2xl font-black text-white">{stats.interviews}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1e1f23]/60 border border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mb-1">Offers</span>
                    <span className="text-2xl font-black text-white">{stats.offers}</span>
                </div>
                <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-[#1e1f23]/60 border border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-[0.6rem] text-white/30 uppercase tracking-widest font-black mb-1">Success Rate</span>
                    <div className="relative w-12 h-12 flex items-center justify-center mt-1">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" fill="transparent" />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="#8b5cf6"
                                strokeWidth="3.5"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 20}
                                strokeDashoffset={2 * Math.PI * 20 * (1 - stats.successRate / 100)}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-[0.75rem] font-black text-white">{stats.successRate}%</span>
                    </div>
                </div>
            </div>

            {/* ── Search & Filter Controls ── */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:flex-1">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search companies, roles, or skills..."
                        className="w-full bg-[#1e1f23] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-[0.9rem]
                                   text-white/80 placeholder:text-white/25 focus:outline-none focus:border-primary/45
                                   focus:bg-[#24252a] transition-all"
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto relative">
                    {/* Custom Dropdown Filter */}
                    <div className="relative flex-1 md:flex-none" ref={filterDropdownRef}>
                        <button
                            type="button"
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                            className="w-full md:w-48 bg-[#1e1f23] border border-white/8 rounded-xl px-4 py-3 text-[0.85rem] text-white/70 focus:outline-none focus:border-primary/45 text-left flex items-center justify-between gap-2"
                        >
                            <span className="flex items-center gap-2">
                                {statusFilter === 'All' ? (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                        All Statuses
                                    </>
                                ) : (
                                    <>
                                        <span className={`w-1.5 h-1.5 rounded-full ${stages.find(s => s.key === statusFilter)?.dot}`} />
                                        {stages.find(s => s.key === statusFilter)?.name}
                                    </>
                                )}
                            </span>
                            <span className="material-symbols-outlined text-white/30 text-[18px]">
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
                                <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-56 rounded-xl bg-[#141519] border border-white/10 p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30">
                                    <button
                                    onClick={() => {
                                        setStatusFilter('All');
                                        setFilterDropdownOpen(false);
                                    }}
                                    className="w-full px-3 py-2.5 rounded-lg text-left text-[0.85rem] text-white/70 hover:bg-white/5 hover:text-white flex items-center gap-2.5 transition-all"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                    All Statuses
                                </button>
                                <div className="h-[1px] bg-white/5 my-1" />
                                {stages.map(stage => (
                                    <button
                                        key={stage.key}
                                        onClick={() => {
                                            setStatusFilter(stage.key);
                                            setFilterDropdownOpen(false);
                                        }}
                                        className="w-full px-3 py-2.5 rounded-lg text-left text-[0.85rem] text-white/70 hover:bg-white/5 hover:text-white flex items-center gap-2.5 transition-all"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                                        {stage.name}
                                    </button>
                                ))}
                            </div>
                            </>
                        )}
                    </div>

                    {/* Sort button/indicator */}
                    <div className="flex items-center gap-2 bg-[#1e1f23] border border-white/8 rounded-xl px-4 py-3 text-[0.85rem] text-white/60">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>Recent First</span>
                    </div>
                </div>
            </div>

            {/* ── Kanban columns with Horizontal Scrollbar ── */}
            <div className="flex gap-6 overflow-x-auto pb-4 pt-2 -mx-4 px-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {stages.map(stage => {
                    const columnApps = filteredApps.filter(a => a.stage === stage.key);
                    return (
                        <div key={stage.key} className="w-80 shrink-0 space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                                    <span className="text-[0.7rem] uppercase tracking-[0.15em] font-black text-white/45">
                                        {stage.name}
                                    </span>
                                </div>
                                <span className={`text-[0.7rem] font-bold px-2 py-0.5 rounded-full ${stage.badgeStyle}`}>
                                    {columnApps.length.toString().padStart(2, '0')}
                                </span>
                            </div>

                            <div className="space-y-3 min-h-[420px]">
                                {columnApps.map(app => (
                                    <div
                                        key={app.id}
                                        onClick={() => setSelectedApp(app)}
                                        className="p-5 rounded-2xl bg-[#1e1f23]/60 border border-white/5 space-y-4 hover:border-white/10 hover:bg-[#1e1f23]/80 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl ${app.logoColor} flex items-center justify-center shrink-0 font-extrabold text-sm`}>
                                                    {app.logoText}
                                                </div>
                                                <div>
                                                    <h4 className="text-[0.95rem] font-bold text-white group-hover:text-violet-400 transition-colors leading-tight">{app.role}</h4>
                                                    <p className="text-[0.75rem] text-white/40 mt-0.5">{app.company} • {app.time}</p>
                                                </div>
                                            </div>
                                            <button className="text-white/20 hover:text-white/60">
                                                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between pt-1">
                                            <span className={`text-[0.6rem] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md border ${stage.badgeStyle}`}>
                                                {app.badge}
                                            </span>
                                            {app.info ? (
                                                <span className="text-[0.7rem] text-rose-400 font-bold">{app.info}</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-white/25 text-[16px]">schedule</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {columnApps.length === 0 && (
                                    <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl text-white/20 text-xs">
                                        No applications in this stage
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Health Insight Banner ── */}
            <div className="rounded-2xl border border-white/8 bg-[#1e1f23] p-6 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-violet-400 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            psychology
                        </span>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-[0.95rem] font-bold text-white/95">Application Health Insight</h3>
                        <p className="text-white/40 text-[0.8rem] leading-relaxed max-w-2xl">
                            Based on your recent activity, your interview conversion rate has increased by <strong className="text-white">18%</strong>. We recommend prioritizing the <strong className="text-white">Next.js Visual Architect</strong> offer negotiations as it aligns 94% with your target compensation and role level.
                        </p>
                    </div>
                </div>
                <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[0.8rem] font-bold text-white transition-all whitespace-nowrap">
                    View Analysis
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                        auto_awesome
                    </span>
                </button>
            </div>

            {/* ── Modal Overlay Form (Add Application) ── */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={() => {
                            setShowAddModal(false);
                            setTriedSubmit(false);
                        }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-all duration-300"
                    />

                    {/* Form Container */}
                    <div className="relative z-10 w-full max-w-[calc(100vw-2.5rem)] sm:max-w-xl rounded-3xl bg-[#131417] border border-white/10 p-5 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto no-scrollbar">
                        
                        {/* Top-Right Close Button */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowAddModal(false);
                                setTriedSubmit(false);
                            }}
                            className="absolute top-6 right-6 text-white/30 hover:text-white/80 p-2 rounded-full hover:bg-white/5 transition-all"
                            aria-label="Close modal"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>

                        <div className="text-center space-y-1 mb-8">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Add New Application</h2>
                            <p className="text-white/40 text-xs font-semibold">Enter the details of your latest career venture.</p>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Company Name *</label>
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={e => setCompanyName(e.target.value)}
                                        placeholder="e.g. Linear"
                                        className={`w-full bg-[#1c1d22]/50 border rounded-xl px-4 py-3 text-[0.85rem] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-primary/45 transition-all
                                            ${triedSubmit && !companyName.trim() 
                                                ? 'border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.15)] focus:border-rose-500' 
                                                : 'border-white/5'
                                            }`}
                                    />
                                    {triedSubmit && !companyName.trim() && (
                                        <p className="text-[0.7rem] text-rose-400/90 font-bold tracking-wide">Company name is required</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Job Title *</label>
                                    <input
                                        type="text"
                                        value={jobTitle}
                                        onChange={e => setJobTitle(e.target.value)}
                                        placeholder="e.g. Senior Designer"
                                        className={`w-full bg-[#1c1d22]/50 border rounded-xl px-4 py-3 text-[0.85rem] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-primary/45 transition-all
                                            ${triedSubmit && !jobTitle.trim() 
                                                ? 'border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.15)] focus:border-rose-500' 
                                                : 'border-white/5'
                                            }`}
                                    />
                                    {triedSubmit && !jobTitle.trim() && (
                                        <p className="text-[0.7rem] text-rose-400/90 font-bold tracking-wide">Job title is required</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Job URL</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-[18px]">
                                            link
                                        </span>
                                        <input
                                            type="url"
                                            value={jobUrl}
                                            onChange={e => setJobUrl(e.target.value)}
                                            placeholder="https://careers.company.co"
                                            className="w-full bg-[#1c1d22]/50 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-[0.85rem] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-primary/45 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Date Applied</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-[18px] pointer-events-none">
                                            calendar_today
                                        </span>
                                        <input
                                            type="date"
                                            value={dateApplied}
                                            onChange={e => setDateApplied(e.target.value)}
                                            className="w-full bg-[#1c1d22]/50 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-[0.85rem] text-white/80 focus:outline-none focus:border-primary/45 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 relative" ref={modalDropdownRef}>
                                <label className="text-[0.65rem] uppercase tracking-widest font-black text-white/40 block mb-1">Application Stage</label>
                                <button
                                    type="button"
                                    onClick={() => setModalDropdownOpen(!modalDropdownOpen)}
                                    className="w-full bg-[#1c1d22]/50 border border-white/5 rounded-xl px-4 py-3 text-[0.85rem] text-white/80 focus:outline-none focus:border-primary/45 text-left flex items-center justify-between gap-2"
                                >
                                    <span className="flex items-center gap-2.5">
                                        <span className={`w-2 h-2 rounded-full ${stages.find(s => s.key === appStage)?.dot}`} />
                                        {stages.find(s => s.key === appStage)?.name}
                                    </span>
                                    <span className="material-symbols-outlined text-white/30 text-[18px]">
                                        keyboard_arrow_down
                                    </span>
                                </button>

                                {modalDropdownOpen && (
                                    <div className="absolute left-0 right-0 mt-2 rounded-xl bg-[#141519] border border-white/10 p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {stages.map(stage => (
                                            <button
                                                key={stage.key}
                                                type="button"
                                                onClick={() => {
                                                    setAppStage(stage.key);
                                                    setModalDropdownOpen(false);
                                                }}
                                                className="w-full px-3 py-2.5 rounded-lg text-left text-[0.85rem] text-white/70 hover:bg-white/5 hover:text-white flex items-center gap-2.5 transition-all"
                                            >
                                                <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                                                {stage.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Notes</label>
                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Salary expectations, referral details, or specific interests..."
                                    rows="4"
                                    className="w-full bg-[#1c1d22]/50 border border-white/5 rounded-lg px-4 py-3 text-[0.85rem] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-primary/45 transition-all resize-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end items-center gap-5 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setTriedSubmit(false);
                                    }}
                                    className="text-xs font-bold text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400
                                               text-white text-xs font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(93,33,223,0.25)] hover:scale-102 transition-all"
                                >
                                    Save Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Details Side Drawer ── */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        onClick={() => setSelectedApp(null)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
                    />

                    {/* Side Drawer Body */}
                    <div className="relative z-10 w-full max-w-[100vw] sm:max-w-md bg-[#17181c] border-l border-white/10 h-full shadow-[-10px_0_40px_rgba(0,0,0,0.6)] p-5 md:p-8 flex flex-col justify-between overflow-y-auto">
                        
                        <div className="space-y-7">
                            {/* Drawer Top Navigation bar */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setSelectedApp(null)}
                                    className="w-10 h-10 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white flex items-center justify-center transition-all"
                                    aria-label="Close details"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                                
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Details'}
                                </button>
                            </div>

                            {/* Job Card Info (Logo + Company + Title) */}
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-2xl ${selectedApp.logoColor} flex items-center justify-center shrink-0 font-black text-xl`}>
                                    {selectedApp.logoText}
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[0.65rem] uppercase tracking-[0.18em] font-black text-white/30 block">
                                        {isEditing ? 'Company Name' : selectedApp.company}
                                    </span>
                                    {isEditing ? (
                                        <div className="space-y-3 pt-1">
                                            <input
                                                type="text"
                                                value={editCompany}
                                                onChange={e => setEditCompany(e.target.value)}
                                                className="w-full bg-[#121316] border border-white/5 rounded-xl px-3 py-2 text-[0.85rem] text-white/80 focus:outline-none focus:border-primary/45"
                                                placeholder="Company Name"
                                            />
                                            <input
                                                type="text"
                                                value={editRole}
                                                onChange={e => setEditRole(e.target.value)}
                                                className="w-full bg-[#121316] border border-white/5 rounded-xl px-3 py-2 text-[0.85rem] text-white/80 focus:outline-none focus:border-primary/45"
                                                placeholder="Job Title"
                                            />
                                        </div>
                                    ) : (
                                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                                            {selectedApp.role}
                                        </h2>
                                    )}
                                </div>
                            </div>

                            {/* Stage & Date Applied selectors */}
                            <div className="space-y-4">
                                <h3 className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Current Status</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    {/* Stage custom dropdown select */}
                                    <div className="relative" ref={drawerDropdownRef}>
                                        <button
                                            type="button"
                                            disabled={!isEditing}
                                            onClick={() => setDrawerDropdownOpen(!drawerDropdownOpen)}
                                            className={`w-full bg-[#1c1d22] border rounded-xl px-3.5 py-3 text-[0.85rem] text-white/85 text-left flex items-center justify-between gap-2
                                                ${isEditing ? 'border-white/10 hover:border-white/20' : 'border-transparent cursor-default'}`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${stages.find(s => s.key === (isEditing ? editStage : selectedApp.stage))?.dot}`} />
                                                {stages.find(s => s.key === (isEditing ? editStage : selectedApp.stage))?.name}
                                            </span>
                                            {isEditing && (
                                                <span className="material-symbols-outlined text-white/30 text-[18px]">
                                                    keyboard_arrow_down
                                                </span>
                                            )}
                                        </button>

                                        {isEditing && drawerDropdownOpen && (
                                            <div className="absolute left-0 right-0 mt-2 rounded-xl bg-[#141519] border border-white/10 p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                                {stages.map(stage => (
                                                    <button
                                                        key={stage.key}
                                                        type="button"
                                                        onClick={() => {
                                                            setEditStage(stage.key);
                                                            setDrawerDropdownOpen(false);
                                                        }}
                                                        className="w-full px-3 py-2 rounded-lg text-left text-[0.85rem] text-white/70 hover:bg-white/5 hover:text-white flex items-center gap-2.5 transition-all"
                                                    >
                                                        <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                                                        {stage.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Date display/input */}
                                    <div className="flex items-center gap-2 bg-[#1c1d22] border border-transparent rounded-xl px-3.5 py-3 text-[0.85rem] text-white/80">
                                        <span className="material-symbols-outlined text-white/30 text-[18px]">calendar_today</span>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={editDateApplied}
                                                onChange={e => setEditDateApplied(e.target.value)}
                                                className="w-full bg-transparent focus:outline-none text-white/85 text-[0.85rem] [color-scheme:dark]"
                                            />
                                        ) : (
                                            <span>{selectedApp.dateApplied || '06/18/2026'}</span>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Info fields layout (Stacked vertically for cleaner layout) */}
                            <div className="space-y-4 pt-1">
                                <h3 className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Information</h3>
                                <div className="space-y-3">
                                    
                                    {/* Location Card */}
                                    <div className="bg-[#1c1d22]/40 border border-white/5 rounded-2xl p-4 space-y-1">
                                        <span className="text-[0.6rem] uppercase tracking-wider font-extrabold text-white/30">Location</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editLocation}
                                                onChange={e => setEditLocation(e.target.value)}
                                                placeholder="San Francisco, CA (Hybrid)"
                                                className="w-full bg-[#121316] border border-white/5 rounded-xl px-3 py-2 mt-1 text-[0.8rem] text-white/80 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-[0.85rem] font-bold text-white">{selectedApp.location || 'Not Specified'}</p>
                                        )}
                                    </div>

                                    {/* Employment Card */}
                                    <div className="bg-[#1c1d22]/40 border border-white/5 rounded-2xl p-4 space-y-1">
                                        <span className="text-[0.6rem] uppercase tracking-wider font-extrabold text-white/30">Employment</span>
                                        {isEditing ? (
                                            <select
                                                value={editEmployment}
                                                onChange={e => setEditEmployment(e.target.value)}
                                                className="w-full bg-[#121316] border border-white/5 rounded-xl px-3 py-2 mt-1 text-[0.8rem] text-white/80 focus:outline-none"
                                            >
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        ) : (
                                            <p className="text-[0.85rem] font-bold text-white">{selectedApp.employment || 'Full-time'}</p>
                                        )}
                                    </div>

                                    {/* Job URL Link Option */}
                                    <div className="bg-[#1c1d22]/40 border border-white/5 rounded-2xl p-4 space-y-1">
                                        <span className="text-[0.6rem] uppercase tracking-wider font-extrabold text-white/30">Original Posting</span>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                value={editJobUrl}
                                                onChange={e => setEditJobUrl(e.target.value)}
                                                placeholder="https://careers.company.co"
                                                className="w-full bg-[#121316] border border-white/5 rounded-xl px-3 py-2 mt-1 text-[0.8rem] text-white/80 focus:outline-none"
                                            />
                                        ) : selectedApp.jobUrl ? (
                                            <a
                                                href={selectedApp.jobUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[0.85rem] font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-0.5"
                                            >
                                                View Original Job Posting
                                                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                            </a>
                                        ) : (
                                            <p className="text-[0.85rem] font-bold text-white/40">No link specified</p>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Internal Notes area */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Internal Notes</h3>
                                    <span className="material-symbols-outlined text-white/25 text-[16px]">notes</span>
                                </div>
                                {isEditing ? (
                                    <textarea
                                        value={editNotes}
                                        onChange={e => setEditNotes(e.target.value)}
                                        rows="4"
                                        placeholder="Click to add thoughts about the culture, technical round, or compensation expectations..."
                                        className="w-full bg-[#121316] border border-white/5 rounded-xl px-4 py-3 text-[0.85rem] text-white/80 placeholder:text-white/20 focus:outline-none resize-none"
                                    />
                                ) : (
                                    <div className="bg-[#1c1d22]/20 border border-white/5 rounded-2xl p-4 min-h-[90px]">
                                        <p className="text-[0.8rem] text-white/60 leading-relaxed whitespace-pre-wrap">
                                            {selectedApp.notes || 'No internal notes added yet. Click Edit Details to add comments.'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Status Timeline */}
                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <h4 className="text-[0.65rem] uppercase tracking-widest font-black text-white/40">Status Timeline</h4>
                                <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                                    {timelineSteps.map((step, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className={`absolute -left-[23px] w-4 h-4 rounded-full border-2 bg-[#17181c] z-10 flex items-center justify-center
                                                    ${step.done ? 'border-violet-500 bg-[#17181c]' : 'border-white/10'}`}>
                                                    {step.done && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                                                </div>
                                                <span className={step.done ? 'text-white font-medium' : 'text-white/30'}>{step.name}</span>
                                            </div>
                                            <span className="text-white/30 font-medium text-[0.7rem]">{step.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Bottom Actions footer bar */}
                        <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/5 gap-4">
                            <button
                                onClick={handleArchive}
                                className="flex items-center gap-2 text-rose-400 hover:text-rose-300 text-[0.7rem] font-black uppercase tracking-wider transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Archive Application
                            </button>

                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                </button>
                                {isEditing && (
                                    <button
                                        onClick={handleSaveDrawer}
                                        className="px-5 py-2.5 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400
                                                   text-white text-xs font-bold uppercase tracking-wider shadow-[0_10px_20px_rgba(93,33,223,0.2)] hover:scale-102 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default JobTrackerPage;
