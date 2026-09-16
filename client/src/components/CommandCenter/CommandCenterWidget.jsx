import React from 'react';
import { AlertCircle, Video, Send, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';

export const CommandCenterWidget = () => {
  const { applications, interviews, tasks, followUps } = useApplications();
  const navigate = useNavigate();

  const pendingFollowups = followUps.filter(f => f.status === 'Pending');
  const scheduledInterviews = interviews.filter(i => i.status === 'Scheduled');
  const urgentTasks = tasks.filter(t => t.status !== 'Completed' && (t.priority === 'Urgent' || t.priority === 'High'));
  const pendingApps = applications.filter(a => a.stage === 'Applied' && new Date(a.applicationDate) < new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card/80 to-surface-900/40 p-5 shadow-xl relative overflow-hidden">
      {/* Decorative Glow Accent */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight">CareerOrbit Command Center</h3>
            <p className="text-xs text-muted-foreground">Actionable intelligence requiring your attention</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          {pendingFollowups.length + scheduledInterviews.length + urgentTasks.length} Action Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Item 1: Follow-ups */}
        <div 
          onClick={() => navigate('/followups')}
          className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-amber-400">
              <Send className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Follow-ups</span>
            </div>
            <span className="text-xs font-semibold text-amber-400">{pendingFollowups.length} Due</span>
          </div>
          <p className="text-xs font-medium text-foreground group-hover:text-amber-300 transition-colors">
            {pendingFollowups[0]?.company ? `Follow up with ${pendingFollowups[0].company}` : 'No pending follow-ups'}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-400/80 font-medium">
            <span>Send Email Template</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Item 2: Upcoming Interviews */}
        <div 
          onClick={() => navigate('/interviews')}
          className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-emerald-400">
              <Video className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Interviews</span>
            </div>
            <span className="text-xs font-semibold text-emerald-400">{scheduledInterviews.length} Scheduled</span>
          </div>
          <p className="text-xs font-medium text-foreground group-hover:text-emerald-300 transition-colors truncate">
            {scheduledInterviews[0] ? `${scheduledInterviews[0].company} (${scheduledInterviews[0].interviewType})` : 'None scheduled'}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400/80 font-medium">
            <span>Open Prep Checklist</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Item 3: Urgent Tasks */}
        <div 
          onClick={() => navigate('/tasks')}
          className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-blue-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Priority Tasks</span>
            </div>
            <span className="text-xs font-semibold text-blue-400">{urgentTasks.length} Pending</span>
          </div>
          <p className="text-xs font-medium text-foreground group-hover:text-blue-300 transition-colors truncate">
            {urgentTasks[0]?.title || 'All high priority tasks completed!'}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-blue-400/80 font-medium">
            <span>View Tasks</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Item 4: Pending Applications */}
        <div 
          onClick={() => navigate('/applications')}
          className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-purple-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Awaiting Reply</span>
            </div>
            <span className="text-xs font-semibold text-purple-400">{pendingApps.length} Apps</span>
          </div>
          <p className="text-xs font-medium text-foreground group-hover:text-purple-300 transition-colors truncate">
            {pendingApps.length > 0 ? `${pendingApps[0].company} - ${pendingApps[0].jobTitle}` : 'No stalled applications'}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-purple-400/80 font-medium">
            <span>Review Applications</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
