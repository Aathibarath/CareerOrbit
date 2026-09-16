import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Kanban, Video, Sparkles } from 'lucide-react';

export const MobileBottomNav = () => {
  const items = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Applications', path: '/applications', icon: Briefcase },
    { label: 'Pipeline', path: '/kanban', icon: Kanban },
    { label: 'Interviews', path: '/interviews', icon: Video },
    { label: 'Copilot', path: '/insights', icon: Sparkles },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-xl border-t border-border flex items-center justify-around z-30 px-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
