import React from 'react';
import { Search, Plus, Bell, Calendar as CalendarIcon, Flame, Menu, Orbit } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const TopBar = ({ onOpenMobileMenu, isSidebarOpen, onToggleSidebar }) => {
  const { 
    setIsSearchOpen, 
    setIsQuickAddOpen, 
    setQuickAddType, 
    setIsNotificationOpen, 
    notifications 
  } = useApplications();
  const { user } = useAuth();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Menu & Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div 
          onClick={() => navigate('/dashboard')}
          className="md:hidden flex items-center gap-2 cursor-pointer"
        >
          <Orbit className="w-5 h-5 text-primary" />
          <span className="font-bold text-sm">CareerOrbit</span>
        </div>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-border/80 bg-surface-100/50 dark:bg-surface-800/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-xs w-64 md:w-80 group shadow-inner"
        >
          <Search className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
          <span className="flex-1 text-left">Search applications, companies...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-card border border-border text-[10px] font-mono shadow-xs text-muted-foreground">
            /
          </kbd>
        </button>
      </div>

      {/* Right: Streak, Quick Actions & Notifications */}
      <div className="flex items-center gap-2.5">
        {/* Streak Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-amber-500 animate-bounce" />
          <span>{user?.streakDays || 7} Day Streak</span>
        </div>

        {/* Calendar Shortcut */}
        <button
          onClick={() => navigate('/calendar')}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
          title="Career Calendar"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-card animate-ping" />
          )}
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-card" />
          )}
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => {
            setQuickAddType('Application');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-glow-primary transition-all duration-200 group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>Quick Add</span>
          <kbd className="hidden md:inline px-1 py-0.2 text-[9px] bg-white/20 rounded font-mono">
            N
          </kbd>
        </button>

        {/* Sidebar Toggle in Topbar */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors ml-1"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
