import React, { useState } from 'react';
import { Sparkles, Send, FileText, CheckCircle2, AlertTriangle, Lightbulb, Bot, ArrowRight, TrendingUp, Target, Calendar, Clock } from 'lucide-react';
import { api } from '../services/api';
import { useApplications } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';

export const CareerInsightsPage = () => {
  const { applications, interviews, followUps } = useApplications();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'copilot',
      reply: 'Hello Aathi! I am your CareerOrbit AI Copilot. I have audited your active job application records. How can I assist your search today?',
      actions: [
        'How should I prepare for a React interview?',
        'I have an interview tomorrow. What should I do?',
        'How do I follow up with a recruiter?'
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Calculate actual data insights
  const totalApps = applications.length;
  const activeInterviews = interviews.filter(i => i.status === 'Scheduled').length;
  const pendingApps = applications.filter(a => a.stage === 'Applied').length;
  const pendingFollowups = followUps.filter(f => f.status === 'Pending').length;

  // Find most applied role
  const roleCounts = {};
  applications.forEach(a => {
    roleCounts[a.jobTitle] = (roleCounts[a.jobTitle] || 0) + 1;
  });
  const mostAppliedRole = Object.keys(roleCounts).reduce((a, b) => roleCounts[a] > roleCounts[b] ? a : b, 'Software Developer');

  const realInsights = [
    {
      icon: Target,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Most Applied Role Focus',
      description: `Your most applied role is ${mostAppliedRole} (${roleCounts[mostAppliedRole] || 1} applications).`,
      action: 'Search Similar Jobs',
      onClick: () => navigate('/job-search')
    },
    {
      icon: Calendar,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Upcoming Interviews Scheduled',
      description: `You have ${activeInterviews} interview${activeInterviews === 1 ? '' : 's'} scheduled in your pipeline.`,
      action: 'View Prep Checklist',
      onClick: () => navigate('/interviews')
    },
    {
      icon: Clock,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      title: 'Awaiting Recruiter Response',
      description: `You have ${pendingApps} application${pendingApps === 1 ? '' : 's'} waiting for a recruiter response.`,
      action: 'Review Applications',
      onClick: () => navigate('/applications')
    },
    {
      icon: Send,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Follow-ups Action Required',
      description: `You have ${pendingFollowups} follow-up${pendingFollowups === 1 ? '' : 's'} due this week.`,
      action: 'Send Follow-up Email',
      onClick: () => navigate('/followups')
    }
  ];

  const handleAskCopilot = async (userQuery) => {
    const textToSubmit = userQuery || prompt;
    if (!textToSubmit) return;

    setChatHistory(prev => [...prev, { role: 'user', reply: textToSubmit }]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await api.post('/ai/copilot', { prompt: textToSubmit });
      setChatHistory(prev => [...prev, { role: 'copilot', reply: res.reply, actions: res.suggestedActions }]);
    } catch (err) {
      // Intelligent fallback based on user query keyword
      const qLower = textToSubmit.toLowerCase();
      let replyText = "";
      let actions = [];

      if (qLower.includes('react') || qLower.includes('frontend')) {
        replyText = "For a React interview, focus on:\n1. React Fundamentals: Virtual DOM, JSX, components & props.\n2. Hooks: useState, useEffect, useMemo, useCallback, useRef, custom hooks.\n3. Component Lifecycle & state management.\n4. REST API integration, loading/error states & performance optimization.\n5. Practical coding: build a dynamic data grid or search filter component.";
        actions = ['How do I prepare for System Design?', 'How to follow up with recruiter?'];
      } else if (qLower.includes('tomorrow') || qLower.includes('interview')) {
        replyText = "Interview Eve Checklist:\n1. Research Company: Review products, recent news & tech stack.\n2. Review Job Description: Re-align your top 3 project stories with key requirements.\n3. Technical Revision: Review DSA complexities & React/Java fundamentals.\n4. Project Explanation: Be ready to explain your best project using STAR method.\n5. HR Prep: Prepare answers for 'Tell me about yourself' and prepare 2 questions to ask the interviewer.";
        actions = ['Open Interview Prep Checklist', 'Run ATS Resume Matcher'];
      } else if (qLower.includes('follow up') || qLower.includes('recruiter')) {
        replyText = "Recruiter Follow-up Strategy:\n1. Timing: Send outreach 3 to 5 business days after initial application or interview.\n2. Keep it concise (< 150 words).\n3. Template: Briefly state your enthusiasm, reference 1 key project achievement, and express interest in next steps.\n4. Use CareerOrbit's Automated Follow-up engine to generate one-click templates.";
        actions = ['Open Follow-Up Engine', 'View Target Companies'];
      } else {
        replyText = `Based on your live dataset of ${totalApps} applications, your highest conversion occurs with roles matching "${mostAppliedRole}". You currently have ${activeInterviews} interview(s) scheduled. How else can I assist your career search?`;
        actions = ['How should I prepare for a React interview?', 'How do I follow up with a recruiter?'];
      }

      setChatHistory(prev => [...prev, { role: 'copilot', reply: replyText, actions }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Job Search Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Career Insights</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Actionable data-driven insights calculated from your actual job applications and scheduled interviews.
          </p>
        </div>
      </div>

      {/* Real Data Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {realInsights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className={`p-4 rounded-2xl border ${insight.bg} bg-card space-y-3 shadow-xs flex flex-col justify-between`}>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${insight.color}`} />
                  <h3 className="font-bold text-xs text-foreground">{insight.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {insight.description}
                </p>
              </div>

              <button
                onClick={insight.onClick}
                className={`flex items-center gap-1 text-xs font-semibold ${insight.color} hover:underline pt-1`}
              >
                <span>{insight.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Copilot Workspace */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col h-[520px]">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-sm">CareerOrbit AI Copilot</h3>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Interactive Career Assistant
          </span>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 scrollbar-thin">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground font-semibold rounded-tr-xs'
                  : 'bg-surface-50 dark:bg-surface-900/60 border border-border text-foreground rounded-tl-xs shadow-xs'
              }`}>
                {msg.reply}
              </div>

              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleAskCopilot(act)}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-left"
                    >
                      ⚡ {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="text-xs text-purple-400 font-medium animate-pulse">
              Synthesizing tailored career advice...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleAskCopilot(); }} className="mt-4 pt-3 border-t border-border flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Copilot about React interviews, recruiter follow-ups, or interview tips..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-glow-accent transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
