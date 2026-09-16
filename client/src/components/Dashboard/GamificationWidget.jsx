import React from 'react';
import { Flame, Trophy, Target, Award, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';

export const GamificationWidget = () => {
  const { user } = useAuth();
  const { applications, interviews, followUps } = useApplications();

  const totalApps = applications.length;
  const completedFollowups = followUps.filter(f => f.status === 'Sent').length;
  const scheduledInterviews = interviews.length;

  const milestones = [
    { title: '7-Day Application Streak', current: user?.streakDays || 7, target: 7, achieved: true, icon: Flame },
    { title: '10 Applications Tracked', current: Math.min(totalApps, 10), target: 10, achieved: totalApps >= 10, icon: Target },
    { title: 'First Interview Scheduled', current: scheduledInterviews > 0 ? 1 : 0, target: 1, achieved: scheduledInterviews > 0, icon: Trophy },
    { title: 'Follow-up Champ', current: Math.min(completedFollowups, 5), target: 5, achieved: completedFollowups >= 5, icon: Award }
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-sm">Career Search Milestones</h3>
        </div>
        <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          Level 3 Job Seeker
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {milestones.map((m) => {
          const Icon = m.icon;
          const percentage = Math.round((m.current / m.target) * 100);
          return (
            <div 
              key={m.title}
              className={`p-3 rounded-xl border transition-all ${
                m.achieved 
                  ? 'bg-amber-500/5 border-amber-500/20' 
                  : 'bg-surface-50 dark:bg-surface-900/40 border-border/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${m.achieved ? 'text-amber-400' : 'text-muted-foreground'}`} />
                  <span className="text-xs font-semibold text-foreground">{m.title}</span>
                </div>
                {m.achieved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              
              <div className="w-full bg-surface-200 dark:bg-surface-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  style={{ width: `${percentage}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    m.achieved ? 'bg-amber-400' : 'bg-primary'
                  }`}
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-right mt-1 font-medium">
                {m.current} / {m.target}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
