import React from 'react';
import { X, Bell, Check, Video, Send, CheckSquare, Sparkles } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApplications();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getIcon = (type) => {
    if (type === 'interview') return <Video className="w-4 h-4 text-emerald-400" />;
    if (type === 'followup') return <Send className="w-4 h-4 text-amber-400" />;
    return <CheckSquare className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-card border-l border-border h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-medium text-primary hover:underline"
            >
              Mark all read
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-accent">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.type === 'interview') navigate('/interviews');
                if (n.type === 'followup') navigate('/followups');
                if (n.type === 'task') navigate('/tasks');
                onClose();
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                n.unread 
                  ? 'bg-primary/5 border-primary/30 shadow-xs' 
                  : 'bg-surface-50 dark:bg-surface-900/40 border-border/50 opacity-80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 flex-shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-foreground truncate">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{n.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
