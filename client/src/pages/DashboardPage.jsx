import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  Video, 
  Award, 
  Percent, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Send, 
  Calendar as CalendarIcon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { CommandCenterWidget } from '../components/CommandCenter/CommandCenterWidget';
import { FunnelChart } from '../components/Dashboard/FunnelChart';
import { GamificationWidget } from '../components/Dashboard/GamificationWidget';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { 
    applications, 
    interviews, 
    tasks, 
    followUps, 
    toggleTaskStatus, 
    setIsQuickAddOpen, 
    setQuickAddType 
  } = useApplications();
  const navigate = useNavigate();

  const activeApps = applications.filter(a => !['Rejected', 'Withdrawn', 'Wishlist'].includes(a.stage));
  const interviewApps = applications.filter(a => ['Interview', 'Final Interview', 'Offer', 'Accepted'].includes(a.stage));
  const offers = applications.filter(a => ['Offer', 'Accepted'].includes(a.stage));
  const responseRate = applications.length > 0 ? Math.round(((applications.length - applications.filter(a => a.stage === 'Applied').length) / applications.length) * 100) : 0;
  const interviewRate = applications.length > 0 ? Math.round((interviewApps.length / applications.length) * 100) : 0;

  const kpis = [
    { title: 'Total Applications', value: applications.length, trend: '↑ 18% this month', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Active Pipelines', value: activeApps.length, trend: '6 active stages', icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { title: 'Interviews Scheduled', value: interviews.filter(i => i.status === 'Scheduled').length, trend: 'Next: NovaTech Final', icon: Video, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { title: 'Offers Received', value: offers.length, trend: 'PixelForge ($115k)', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Response Rate', value: `${responseRate}%`, trend: 'Top 10% benchmark', icon: Percent, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { title: 'Interview Rate', value: `${interviewRate}%`, trend: 'High callback velocity', icon: Clock, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  ];

  // Activity timeline items collected from applications
  const timelineEvents = applications
    .flatMap(a => (a.timeline || []).map(t => ({ ...t, company: a.company, jobTitle: a.jobTitle, appId: a.id })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <span>Welcome back, {user?.name ? user.name.split(' ')[0] : 'Aathi'} 👋</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track your applications, interviews, follow-ups and career progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQuickAddType('Application');
              setIsQuickAddOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={kpi.title}
              onClick={() => navigate('/analytics')}
              className={`p-3.5 rounded-2xl border ${kpi.bg} bg-card hover:border-primary/40 cursor-pointer transition-all duration-200 group shadow-xs`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-muted-foreground truncate">{kpi.title}</span>
                <Icon className={`w-4 h-4 ${kpi.color} group-hover:scale-110 transition-transform`} />
              </div>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">{kpi.value}</p>
              <p className="text-[10px] font-semibold text-muted-foreground mt-1 truncate">{kpi.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Command Center Action Widget */}
      <CommandCenterWidget />

      {/* Main Grid Layout: Funnel + Priorities + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Application Funnel */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-tight">Application Conversion Funnel</h3>
            <button 
              onClick={() => navigate('/kanban')}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Pipeline</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <FunnelChart applications={applications} />
        </div>

        {/* Middle Column: Today's Priorities */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-tight">Today's Priorities</h3>
            <button 
              onClick={() => navigate('/tasks')}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>All Tasks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.slice(0, 4).map((task) => (
              <div 
                key={task.id}
                className="p-3 rounded-xl border border-border/60 bg-surface-50 dark:bg-surface-900/40 flex items-start gap-3 hover:border-primary/30 transition-all"
              >
                <input
                  type="checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => toggleTaskStatus(task.id)}
                  className="mt-0.5 rounded text-primary focus:ring-primary cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium text-muted-foreground">{task.company}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border ${
                      task.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity Timeline */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-tight">Recent Application Activity</h3>
            <span className="text-[11px] text-muted-foreground">Live Feed</span>
          </div>

          <div className="space-y-3 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
            {timelineEvents.map((e, idx) => (
              <div 
                key={e.id || idx}
                onClick={() => navigate(`/applications/${e.appId}`)}
                className="flex items-start gap-3 pl-6 relative cursor-pointer group"
              >
                <div className="w-2 h-2 rounded-full bg-primary absolute left-1.5 top-1.5 ring-4 ring-card group-hover:scale-125 transition-transform" />
                <div className="flex-1 min-w-0 bg-surface-50 dark:bg-surface-900/40 p-2.5 rounded-xl border border-border/50 group-hover:border-primary/40 transition-all">
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{e.title}</p>
                  <p className="text-[11px] text-muted-foreground">{e.company} • {e.jobTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Progress Section */}
      <GamificationWidget />
    </div>
  );
};
