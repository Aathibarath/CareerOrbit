import React from 'react';

export const FunnelChart = ({ applications = [] }) => {
  const appliedCount = applications.filter(a => a.stage === 'Applied').length + 5;
  const screeningCount = applications.filter(a => a.stage === 'Screening').length + 3;
  const assessmentCount = applications.filter(a => a.stage === 'Assessment').length + 2;
  const interviewCount = applications.filter(a => ['Interview', 'Final Interview'].includes(a.stage)).length + 1;
  const offerCount = applications.filter(a => ['Offer', 'Accepted'].includes(a.stage)).length + 1;

  const stages = [
    { label: 'Applied', count: appliedCount, width: '100%', color: 'from-blue-600 to-blue-500' },
    { label: 'Screening', count: screeningCount, width: '82%', color: 'from-cyan-600 to-cyan-500' },
    { label: 'Assessment', count: assessmentCount, width: '65%', color: 'from-purple-600 to-purple-500' },
    { label: 'Interview', count: interviewCount, width: '48%', color: 'from-amber-500 to-amber-400' },
    { label: 'Offer', count: offerCount, width: '32%', color: 'from-emerald-500 to-emerald-400' },
  ];

  return (
    <div className="space-y-3 py-2">
      {stages.map((stage, i) => (
        <div key={stage.label} className="group">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-foreground">{stage.label}</span>
            <span className="text-muted-foreground">{stage.count} Applications</span>
          </div>
          <div className="w-full bg-surface-100 dark:bg-surface-800/80 rounded-xl h-7 p-1 overflow-hidden">
            <div 
              style={{ width: stage.width }} 
              className={`h-full rounded-lg bg-gradient-to-r ${stage.color} flex items-center justify-end px-2.5 text-[11px] font-bold text-white shadow-sm transition-all duration-500 group-hover:brightness-110`}
            >
              {stage.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
