import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Navigation/Sidebar';
import { TopBar } from '../components/Navigation/TopBar';
import { MobileBottomNav } from '../components/Navigation/MobileBottomNav';
import { QuickAddModal } from '../components/Modals/QuickAddModal';
import { SearchModal } from '../components/Modals/SearchModal';
import { NotificationDrawer } from '../components/Modals/NotificationDrawer';
import { useApplications } from '../context/ApplicationContext';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    isQuickAddOpen, 
    setIsQuickAddOpen, 
    isSearchOpen, 
    setIsSearchOpen, 
    isNotificationOpen, 
    setIsNotificationOpen,
    isSidebarOpen,
    toggleSidebar,
    toastMessage 
  } = useApplications();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative overflow-x-hidden">
      {/* Main Content Area (Left side) */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8 transition-all duration-300">
        <TopBar 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>

      {/* Desktop Navigation Sidebar on the RIGHT */}
      <Sidebar 
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Floating Right-Edge Sidebar Re-Open Button when sidebar is collapsed */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
          className="hidden md:flex fixed right-3 top-20 z-40 p-2.5 rounded-xl bg-card border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-xl transition-all duration-200 hover:scale-105 items-center gap-1 group"
          title="Open Navigation Sidebar"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-wider pr-1">Sidebar</span>
        </button>
      )}

      {/* Mobile Navigation Bottom Bar */}
      <MobileBottomNav />

      {/* Global Modals & Overlays */}
      <QuickAddModal 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)} 
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <NotificationDrawer 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-primary/30 text-foreground shadow-2xl animate-bounce-subtle">
          <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold">{toastMessage.message}</p>
        </div>
      )}
    </div>
  );
};
