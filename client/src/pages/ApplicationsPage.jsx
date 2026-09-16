import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Archive, 
  MoreVertical, 
  ArrowUpDown, 
  ExternalLink, 
  CheckSquare, 
  Trash2, 
  Copy, 
  Tag, 
  Building2,
  Calendar
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import { ApplicationModal } from '../components/Modals/ApplicationModal';
import { formatSalaryDisplay } from '../utils/currency';

export const ApplicationsPage = () => {
  const { 
    applications, 
    updateApplicationStage, 
    deleteApplication, 
    toggleFavorite, 
    addApplication,
    setIsQuickAddOpen,
    setQuickAddType
  } = useApplications();
  const navigate = useNavigate();

  // Filters State
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('active'); // active, favorites, archived
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, priority, company
  const [selectedTag, setSelectedTag] = useState(null);

  // Selected for Bulk Actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals
  const [editingApp, setEditingApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filtered = applications.filter(app => {
    if (activeTab === 'favorites' && !app.isFavorite) return false;
    if (activeTab === 'archived' && !app.isArchived) return false;
    if (activeTab === 'active' && app.isArchived) return false;

    if (stageFilter !== 'All' && app.stage !== stageFilter) return false;
    if (priorityFilter !== 'All' && app.priority !== priorityFilter) return false;
    if (workModeFilter !== 'All' && app.workMode !== workModeFilter) return false;
    if (sourceFilter !== 'All' && app.source !== sourceFilter) return false;
    if (selectedTag && (!app.tags || !app.tags.includes(selectedTag))) return false;

    if (search) {
      const q = search.toLowerCase();
      const matchCompany = app.company.toLowerCase().includes(q);
      const matchTitle = app.jobTitle.toLowerCase().includes(q);
      const matchLocation = app.location.toLowerCase().includes(q);
      if (!matchCompany && !matchTitle && !matchLocation) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.applicationDate) - new Date(a.applicationDate);
    if (sortBy === 'oldest') return new Date(a.applicationDate) - new Date(b.applicationDate);
    if (sortBy === 'company') return a.company.localeCompare(b.company);
    return 0;
  });

  const allTags = Array.from(new Set(applications.flatMap(a => a.tags || [])));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map(a => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleDuplicate = (app) => {
    addApplication({
      ...app,
      jobTitle: `${app.jobTitle} (Copy)`,
      company: app.company
    });
  };

  const clearFilters = () => {
    setSearch('');
    setStageFilter('All');
    setPriorityFilter('All');
    setWorkModeFilter('All');
    setSourceFilter('All');
    setSelectedTag(null);
  };

  const getStageBadge = (stage) => {
    const map = {
      Wishlist: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
      Applied: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      Screening: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      Assessment: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      Interview: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      'Final Interview': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      Offer: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      Accepted: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40',
      Rejected: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    };
    return map[stage] || 'bg-surface-800 text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const map = {
      Low: 'text-slate-400',
      Medium: 'text-blue-400',
      High: 'text-amber-400 font-semibold',
      Urgent: 'text-rose-400 font-bold',
    };
    return map[priority] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Job Applications</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage, filter, and track all your active opportunities ({applications.length} total tracked)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingApp(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2">
        <div className="flex items-center gap-2">
          {[
            { id: 'active', label: `Active (${applications.filter(a => !a.isArchived).length})` },
            { id: 'favorites', label: `Starred (${applications.filter(a => a.isFavorite).length})` },
            { id: 'archived', label: `Archived (${applications.filter(a => a.isArchived).length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/15 text-primary border border-primary/20 shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Filter Presets */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground font-medium">Views:</span>
          <button 
            onClick={() => { clearFilters(); setStageFilter('Applied'); }}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-surface-100 dark:bg-surface-800 text-muted-foreground hover:text-foreground"
          >
            Needs Follow-up
          </button>
          <button 
            onClick={() => { clearFilters(); setPriorityFilter('Urgent'); }}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-surface-100 dark:bg-surface-800 text-muted-foreground hover:text-foreground"
          >
            High Priority
          </button>
        </div>
      </div>

      {/* Multi-Criteria Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search role or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Stages</option>
            <option value="Wishlist">Wishlist</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Assessment">Assessment</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>

          {/* Work Mode Filter */}
          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="company">Sort: Company A-Z</option>
          </select>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-surface-100 dark:bg-surface-800 text-muted-foreground border-border hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
            {(search || stageFilter !== 'All' || priorityFilter !== 'All' || workModeFilter !== 'All' || selectedTag) && (
              <button
                onClick={clearFilters}
                className="text-[10px] font-medium text-rose-400 hover:underline ml-2"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Applications Table / Card Grid */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto text-muted-foreground">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-base">No applications found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Start tracking your job search applications or try clearing your active search filters.
            </p>
            <button
              onClick={() => {
                setEditingApp(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
            >
              Add First Application
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-50 dark:bg-surface-900/60 border-b border-border/80 text-muted-foreground font-semibold uppercase text-[10px] tracking-wider select-none">
                <tr>
                  <th className="p-3.5 w-8">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      className="rounded text-primary focus:ring-primary cursor-pointer"
                    />
                  </th>
                  <th className="p-3.5">Company & Role</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Location / Mode</th>
                  <th className="p-3.5">Salary Range</th>
                  <th className="p-3.5">Applied Date</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 font-medium">
                {filtered.map(app => (
                  <tr 
                    key={app.id}
                    className="hover:bg-surface-50 dark:hover:bg-surface-900/40 transition-colors group"
                  >
                    <td className="p-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(app.id)}
                        onChange={() => handleToggleSelect(app.id)}
                        className="rounded text-primary focus:ring-primary cursor-pointer"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleFavorite(app.id)}
                          className={`p-1 rounded hover:bg-accent ${app.isFavorite ? 'text-amber-400' : 'text-muted-foreground/40'}`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <div>
                          <p 
                            onClick={() => navigate(`/applications/${app.id}`)}
                            className="font-bold text-foreground hover:text-primary cursor-pointer transition-colors text-sm"
                          >
                            {app.jobTitle}
                          </p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Building2 className="w-3 h-3 text-muted-foreground" />
                            <span>{app.company}</span>
                            <span>•</span>
                            <span className="text-[10px] text-primary font-medium">{app.source}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={app.stage}
                        onChange={(e) => updateApplicationStage(app.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${getStageBadge(app.stage)}`}
                      >
                        <option value="Wishlist">Wishlist</option>
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Assessment">Assessment</option>
                        <option value="Interview">Interview</option>
                        <option value="Final Interview">Final Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <span className={`text-xs ${getPriorityBadge(app.priority)}`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="p-3.5 text-muted-foreground text-xs">
                      {app.location} ({app.workMode})
                    </td>
                    <td className="p-3.5 text-foreground font-mono text-xs">
                      {(() => {
                        const salary = formatSalaryDisplay(app.salaryMin, app.salaryMax);
                        return (
                          <div>
                            <p className="font-bold text-foreground">{salary.primary}</p>
                            <p className="text-[10px] text-muted-foreground font-sans">{salary.secondary}</p>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="p-3.5 text-muted-foreground text-xs">
                      {new Date(app.applicationDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => handleDuplicate(app)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                          title="Duplicate Application"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingApp(app);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                          title="Edit"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Multi-Section Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApp(null);
        }}
        initialData={editingApp}
      />
    </div>
  );
};
