import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Kanban, 
  Calendar as CalendarIcon, 
  Video, 
  CheckSquare, 
  Building2, 
  Users, 
  FileText, 
  BarChart3, 
  Sparkles, 
  Settings, 
  Sun, 
  Moon, 
  LogOut,
  Orbit,
  ArrowRight,
  Send,
  Search,
  FileCheck2,
  ChevronRight,
  ChevronLeft,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useApplications } from '../../context/ApplicationContext';

export const Sidebar = ({ mobileMenuOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { 
    applications, 
    interviews, 
    tasks, 
    followUps, 
    isSidebarOpen, 
    toggleSidebar,
    setIsQuickAddOpen,
    setQuickAddType
  } = useApplications();
  const navigate = useNavigate();

  const activeAppsCount = applications.filter(a => !['Rejected', 'Withdrawn', 'Wishlist'].includes(a.stage)).length;
  const scheduledInterviewsCount = interviews.filter(i => i.status === 'Scheduled').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const pendingFollowupsCount = followUps.filter(f => f.status === 'Pending').length;

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Applications', path: '/applications', icon: Briefcase, badge: activeAppsCount },
    { label: 'Live Job Search', path: '/job-search', icon: Search, isNew: true },
    { label: 'Pipeline', path: '/kanban', icon: Kanban },
    { label: 'Follow-ups', path: '/followups', icon: Send, badge: pendingFollowupsCount, badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { label: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { label: 'Interviews', path: '/interviews', icon: Video, badge: scheduledInterviewsCount, badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare, badge: pendingTasksCount },
    { label: 'Companies', path: '/companies', icon: Building2 },
    { label: 'Contacts', path: '/contacts', icon: Users },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Career Insights', path: '/insights', icon: Sparkles, isAi: true },
    { label: 'ATS Resume Matcher', path: '/ats-matcher', icon: FileCheck2 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between select-none bg-card/85 dark:bg-surface-900/90 backdrop-blur-2xl border-l border-border shadow-2xl">
      {/* Top Header: Brand & Profile */}
      <div className="p-4 border-b border-border/60 space-y-3">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div 
            onClick={() => { navigate('/dashboard'); if (onCloseMobile) onCloseMobile(); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform duration-300">
              <Orbit className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
                  CareerOrbit
                </span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">Right Intelligence Sidebar</p>
            </div>
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Mobile Close Button */}
          {mobileMenuOpen && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Profile Card Section */}
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-border/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'AA'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-foreground truncate">{user?.name || 'Aathi'}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.targetRole || 'Software Developer'}</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
        <div className="px-3 text-[10px] uppercase font-extrabold tracking-wider text-muted-foreground/70 mb-1.5">
          Navigation Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (onCloseMobile) onCloseMobile(); }}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/25 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  item.isAi ? 'text-purple-400 animate-pulse' : item.isNew ? 'text-cyan-400' : ''
                }`} />
                <span>{item.label}</span>
              </div>
              
              {item.isNew && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                  LIVE
                </span>
              )}

              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-primary/20 text-primary border-primary/30'}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Quick Actions & Footer Area */}
      <div className="p-3 border-t border-border/60 space-y-3">
        {/* Quick Actions Panel */}
        <div className="p-2.5 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-border/60 space-y-2">
          <div className="px-1 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                setQuickAddType('Application');
                setIsQuickAddOpen(true);
                if (onCloseMobile) onCloseMobile();
              }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold hover:bg-primary/20 transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>Add Job</span>
            </button>
            <button
              onClick={() => {
                navigate('/job-search');
                if (onCloseMobile) onCloseMobile();
              }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold hover:bg-cyan-500/20 transition-all"
            >
              <Search className="w-3 h-3" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* User Controls & Theme Switcher */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/80 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
              title="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-rose-500/20 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Positioned on RIGHT side of screen) */}
      <aside 
        className={`hidden md:block sticky top-0 h-screen z-30 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? 'w-64 lg:w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none overflow-hidden'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Right Drawer Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
          />
          <aside className="relative w-80 max-w-[85%] h-full z-50 animate-slide-left shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
