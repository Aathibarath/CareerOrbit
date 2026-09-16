import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  CheckSquare, 
  Plus, 
  ExternalLink, 
  User, 
  Sparkles, 
  HelpCircle, 
  MessageSquare,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const InterviewsPage = () => {
  const { interviews, toggleInterviewChecklist, addInterview, setIsQuickAddOpen, setQuickAddType } = useApplications();
  const [activeTab, setActiveTab] = useState('scheduled'); // scheduled, completed
  const [selectedInterview, setSelectedInterview] = useState(interviews[0] || null);

  const scheduled = interviews.filter(i => i.status === 'Scheduled');
  const completed = interviews.filter(i => i.status === 'Completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Interview Preparation Hub</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track interview rounds, execute STAR method checklists, and log reflections.
          </p>
        </div>

        <button
          onClick={() => {
            setQuickAddType('Interview');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Main Grid: Interview List + Detailed Prep Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interview Cards */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'scheduled' ? 'bg-primary/15 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Scheduled ({scheduled.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'completed' ? 'bg-primary/15 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Completed ({completed.length})
            </button>
          </div>

          <div className="space-y-3">
            {(activeTab === 'scheduled' ? scheduled : completed).map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedInterview(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedInterview?.id === item.id
                    ? 'bg-primary/10 border-primary shadow-glow-primary'
                    : 'bg-card border-border/80 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                    {item.interviewType}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-semibold">{item.time}</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">{item.company}</h4>
                <p className="text-xs text-muted-foreground">{item.jobTitle}</p>
                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" />
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-primary font-semibold">Round {item.roundNumber || 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Preparation Workspace */}
        <div className="lg:col-span-2">
          {selectedInterview ? (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight">{selectedInterview.company}</h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {selectedInterview.interviewType}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedInterview.jobTitle} • Round {selectedInterview.roundNumber} with {selectedInterview.interviewerName || 'Hiring Team'}
                  </p>
                </div>

                {selectedInterview.meetingLink && (
                  <a
                    href={selectedInterview.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-accent transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Meeting</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* STAR Framework Prep Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    <span>STAR Method Preparation Checklist</span>
                  </h3>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {selectedInterview.prepChecklist?.filter(c => c.completed).length || 0} / {selectedInterview.prepChecklist?.length || 0} Done
                  </span>
                </div>

                <div className="space-y-2">
                  {(selectedInterview.prepChecklist || []).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleInterviewChecklist(selectedInterview.id, idx)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        item.completed
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-muted-foreground'
                          : 'bg-surface-50 dark:bg-surface-900/40 border-border hover:border-primary/40 text-foreground'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}}
                        className="rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className={`text-xs font-medium ${item.completed ? 'line-through' : ''}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions to Ask */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span>Questions to Ask Interviewer</span>
                </h3>
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-900/40 border border-border space-y-2 text-xs">
                  {(selectedInterview.questionsToAsk || []).map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post-Interview Reflections */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Post-Interview Reflections & Notes</span>
                </h3>
                <textarea
                  rows={3}
                  placeholder="Record how the interview felt, questions you struggled with, and key follow-up items..."
                  value={selectedInterview.reflection || ''}
                  onChange={(e) => {}}
                  className="w-full p-3 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground text-xs">
              Select an interview from the list to view its preparation checklist and meeting workspace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
