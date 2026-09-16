import React, { useState } from 'react';
import { Send, Copy, Check, Sparkles, Clock, Mail, CheckCircle2 } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const FollowUpsPage = () => {
  const { followUps, showToast } = useApplications();
  const [selectedFollowUp, setSelectedFollowUp] = useState(followUps[0] || null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Follow-up message copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Automated Follow-Up Engine</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Never lose momentum on an active application. Generate professional outreach messages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Follow Up Cards */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm tracking-tight px-1">Follow-up Reminders ({followUps.length})</h3>
          {followUps.map(f => (
            <div
              key={f.id}
              onClick={() => setSelectedFollowUp(f)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedFollowUp?.id === f.id
                  ? 'bg-amber-500/10 border-amber-500 shadow-glow-accent'
                  : 'bg-card border-border hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                  Status: {f.status || 'Due'}
                </span>
                <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Follow-up: {new Date(f.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <h4 className="font-bold text-sm text-foreground">{f.company}</h4>
              <p className="text-xs text-muted-foreground font-medium">{f.jobTitle}</p>

              <div className="mt-2.5 pt-2 border-t border-border/40 text-[11px] text-muted-foreground space-y-1">
                {f.appliedDate && (
                  <p>Applied: <strong className="text-foreground">{new Date(f.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</strong></p>
                )}
                <p className="text-primary truncate">Recruiter: {f.recruiterEmail || 'arun.k@zoho.com'}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFollowUp(f);
                  handleCopy(f.messageText);
                }}
                className="w-full mt-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/25 transition-all flex items-center justify-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Follow Up</span>
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Template Message Editor & Copy Action */}
        <div className="lg:col-span-2">
          {selectedFollowUp ? (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-base">{selectedFollowUp.company} • {selectedFollowUp.jobTitle}</h3>
                  <p className="text-xs text-muted-foreground">Recipient: <strong className="text-foreground">{selectedFollowUp.recruiterEmail || 'Recruiter'}</strong></p>
                </div>

                <button
                  onClick={() => handleCopy(selectedFollowUp.messageText)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-glow-primary hover:bg-primary/90 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Text'}</span>
                </button>
              </div>

              {/* Message Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Pre-Formatted Outreach Template
                </label>
                <div className="p-4 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs leading-relaxed font-mono whitespace-pre-line text-foreground select-all">
                  {selectedFollowUp.messageText}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Pro-tip:</strong> Recruiters receive hundreds of emails daily. Keeping your check-in under 150 words increases response probability by 34%.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-xs text-muted-foreground">
              Select a follow-up item from the left column to view and copy the outreach template.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
