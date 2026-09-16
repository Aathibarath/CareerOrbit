import { initialApplications, initialInterviews } from '../services/DemoSeedService.js';

export const getAnalyticsOverview = async (req, res) => {
  const apps = initialApplications;
  const interviews = initialInterviews;

  const totalApplications = apps.length;
  const activeApplications = apps.filter(a => !['Rejected', 'Withdrawn', 'Wishlist'].includes(a.stage)).length;
  const interviewCount = apps.filter(a => ['Interview', 'Final Interview', 'Offer', 'Accepted'].includes(a.stage)).length;
  const offerCount = apps.filter(a => ['Offer', 'Accepted'].includes(a.stage)).length;
  const rejectionCount = apps.filter(a => a.stage === 'Rejected').length;

  const responseRate = totalApplications > 0 ? Math.round(((totalApplications - apps.filter(a => a.stage === 'Applied').length) / totalApplications) * 100) : 0;
  const interviewRate = totalApplications > 0 ? Math.round((interviewCount / totalApplications) * 100) : 0;
  const offerRate = interviewCount > 0 ? Math.round((offerCount / interviewCount) * 100) : 0;

  // Funnel Breakdown
  const funnel = [
    { name: 'Applied', count: apps.filter(a => a.stage === 'Applied').length + 5, fill: '#3b82f6' },
    { name: 'Screening', count: apps.filter(a => a.stage === 'Screening').length + 3, fill: '#06b6d4' },
    { name: 'Assessment', count: apps.filter(a => a.stage === 'Assessment').length + 2, fill: '#8b5cf6' },
    { name: 'Interview', count: interviewCount, fill: '#f59e0b' },
    { name: 'Offer', count: offerCount, fill: '#10b981' }
  ];

  // Stage breakdown for distribution pie chart
  const statusDistribution = [
    { name: 'Wishlist', value: 1, color: '#94a3b8' },
    { name: 'Applied', value: 3, color: '#3b82f6' },
    { name: 'Screening', value: 1, color: '#06b6d4' },
    { name: 'Assessment', value: 1, color: '#8b5cf6' },
    { name: 'Interview', value: 1, color: '#f59e0b' },
    { name: 'Offer', value: 1, color: '#10b981' },
    { name: 'Rejected', value: 1, color: '#ef4444' },
  ];

  // Weekly application submission trend
  const weeklyTrend = [
    { week: 'Week 1', applications: 4, interviews: 1 },
    { week: 'Week 2', applications: 7, interviews: 2 },
    { week: 'Week 3', applications: 5, interviews: 1 },
    { week: 'Week 4', applications: 8, interviews: 3 },
  ];

  // Source conversion efficiency
  const sourcePerformance = [
    { source: 'LinkedIn', count: 4, conversion: '25%' },
    { source: 'Referral', count: 2, conversion: '100%' },
    { source: 'Company Website', count: 1, conversion: '50%' },
    { source: 'College Placement', count: 1, conversion: '0%' },
  ];

  res.json({
    kpis: {
      totalApplications,
      activeApplications,
      interviewCount,
      offerCount,
      rejectionCount,
      responseRate: `${responseRate}%`,
      interviewRate: `${interviewRate}%`,
      offerRate: `${offerRate}%`,
      avgResponseDays: 6,
      avgDaysToInterview: 12
    },
    funnel,
    statusDistribution,
    weeklyTrend,
    sourcePerformance
  });
};
