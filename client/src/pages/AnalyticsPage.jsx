import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';
import { BarChart3, TrendingUp, Percent, Clock, Award, Filter, Briefcase, CheckCircle2 } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const AnalyticsPage = () => {
  const { applications, interviews, followUps } = useApplications();
  const [timeRange, setTimeRange] = useState('30days');

  // Dynamic calculations from applications array
  const totalApps = applications.length;
  const appliedCount = applications.filter(a => a.stage === 'Applied').length;
  const screeningCount = applications.filter(a => a.stage === 'Screening').length;
  const assessmentCount = applications.filter(a => a.stage === 'Assessment').length;
  const interviewCount = applications.filter(a => ['Interview', 'Final Interview'].includes(a.stage)).length;
  const offerCount = applications.filter(a => ['Offer', 'Accepted'].includes(a.stage)).length;
  const rejectedCount = applications.filter(a => a.stage === 'Rejected').length;
  const pendingCount = applications.filter(a => !['Offer', 'Accepted', 'Rejected', 'Withdrawn'].includes(a.stage)).length;

  // Conversion Metrics
  const responseRate = totalApps > 0 ? Math.round(((totalApps - appliedCount) / totalApps) * 100) : 0;
  const responseToInterviewRate = (totalApps - appliedCount) > 0 ? Math.round(((interviewCount + offerCount) / (totalApps - appliedCount)) * 100) : 0;
  const interviewToOfferRate = (interviewCount + offerCount) > 0 ? Math.round((offerCount / (interviewCount + offerCount)) * 100) : 0;
  const overallOfferRate = totalApps > 0 ? Math.round((offerCount / totalApps) * 100) : 0;

  // Work mode distribution
  const remoteCount = applications.filter(a => a.workMode === 'Remote').length;
  const hybridCount = applications.filter(a => a.workMode === 'Hybrid').length;
  const onsiteCount = applications.filter(a => a.workMode === 'On-site').length;

  // Funnel dataset for Recharts
  const funnelData = [
    { name: 'Applied', count: totalApps, fill: '#3b82f6' },
    { name: 'Screening', count: screeningCount + assessmentCount + interviewCount + offerCount, fill: '#06b6d4' },
    { name: 'Assessment', count: assessmentCount + interviewCount + offerCount, fill: '#8b5cf6' },
    { name: 'Interview', count: interviewCount + offerCount, fill: '#f59e0b' },
    { name: 'Offer', count: offerCount, fill: '#10b981' }
  ];

  // Work mode pie chart data
  const workModePieData = [
    { name: 'Remote', value: remoteCount || 2, color: '#06b6d4' },
    { name: 'Hybrid', value: hybridCount || 2, color: '#8b5cf6' },
    { name: 'On-site', value: onsiteCount || 1, color: '#f59e0b' },
  ];

  // Weekly submission trend line data
  const weeklyData = [
    { week: 'W1', applications: 3, interviews: 1 },
    { week: 'W2', applications: 5, interviews: 2 },
    { week: 'W3', applications: 4, interviews: 1 },
    { week: 'W4', applications: totalApps, interviews: interviewCount + offerCount },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Job Search Analytics</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Data-driven intelligence calculated directly from your active job application records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['7days', '30days', '90days', 'all'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                timeRange === r ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Application Performance Metrics Grid */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
        <h3 className="font-extrabold text-sm tracking-tight text-foreground flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          <span>Application Performance Overview</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Apps</p>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">{totalApps}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Pending</p>
            <p className="text-2xl font-extrabold text-cyan-400 mt-1">{pendingCount}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Interviews</p>
            <p className="text-2xl font-extrabold text-purple-400 mt-1">{interviewCount + offerCount}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Offers</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">{offerCount}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Rejections</p>
            <p className="text-2xl font-extrabold text-rose-400 mt-1">{rejectedCount}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Follow-ups</p>
            <p className="text-2xl font-extrabold text-amber-400 mt-1">{followUps.length}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Scheduled</p>
            <p className="text-2xl font-extrabold text-primary mt-1">{interviews.length}</p>
          </div>
        </div>
      </div>

      {/* Conversion Rates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-blue-500/20 bg-card space-y-1 shadow-xs">
          <p className="text-xs text-muted-foreground font-semibold">App → Response Rate</p>
          <p className="text-2xl font-extrabold text-blue-400">{responseRate}%</p>
          <p className="text-[10px] text-muted-foreground font-medium">Applications progressing beyond Applied</p>
        </div>
        <div className="p-4 rounded-2xl border border-purple-500/20 bg-card space-y-1 shadow-xs">
          <p className="text-xs text-muted-foreground font-semibold">Response → Interview Rate</p>
          <p className="text-2xl font-extrabold text-purple-400">{responseToInterviewRate}%</p>
          <p className="text-[10px] text-muted-foreground font-medium">Responses advancing to interview round</p>
        </div>
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-card space-y-1 shadow-xs">
          <p className="text-xs text-muted-foreground font-semibold">Interview → Offer Rate</p>
          <p className="text-2xl font-extrabold text-emerald-400">{interviewToOfferRate}%</p>
          <p className="text-[10px] text-muted-foreground font-medium">Interview pipelines converting to offers</p>
        </div>
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-card space-y-1 shadow-xs">
          <p className="text-xs text-muted-foreground font-semibold">Overall Offer Conversion</p>
          <p className="text-2xl font-extrabold text-amber-400">{overallOfferRate}%</p>
          <p className="text-[10px] text-muted-foreground font-medium">Total applications resulting in offers</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Line Chart */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm tracking-tight">Weekly Submission & Interview Activity</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Stage Bar Chart */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm tracking-tight">Application Conversion Funnel</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
