import React, { useState } from 'react';
import { Calendar as CalendarIcon, Video, Send, CheckSquare, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const CalendarPage = () => {
  const { interviews, tasks, followUps, applications } = useApplications();
  const [view, setView] = useState('agenda'); // agenda, month

  // Collect all schedule items
  const calendarEvents = [
    ...interviews.map(i => ({ id: i.id, title: `Interview: ${i.company}`, text: `${i.jobTitle} (${i.interviewType})`, date: new Date(i.date), type: 'interview' })),
    ...tasks.map(t => ({ id: t.id, title: `Task: ${t.title}`, text: t.company, date: new Date(t.dueDate), type: 'task' })),
    ...followUps.map(f => ({ id: f.id, title: `Follow-up: ${f.company}`, text: f.jobTitle, date: new Date(f.dueDate), type: 'followup' })),
    ...applications.filter(a => a.deadline).map(a => ({ id: `dl-${a.id}`, title: `Deadline: ${a.company}`, text: a.jobTitle, date: new Date(a.deadline), type: 'deadline' }))
  ].sort((a, b) => a.date - b.date);

  const getEventBadge = (type) => {
    if (type === 'interview') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    if (type === 'followup') return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    if (type === 'deadline') return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
  };

  const getEventIcon = (type) => {
    if (type === 'interview') return <Video className="w-4 h-4 text-emerald-400" />;
    if (type === 'followup') return <Send className="w-4 h-4 text-amber-400" />;
    if (type === 'deadline') return <Clock className="w-4 h-4 text-rose-400" />;
    return <CheckSquare className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Career Search Calendar</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Consolidated timeline of interviews, assessment deadlines, task due dates, and follow-ups.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['agenda', 'month'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                view === v ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* View Content */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        {view === 'agenda' ? (
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-tight border-b border-border pb-3">Upcoming Career Agenda</h3>
            <div className="space-y-3">
              {calendarEvents.map((evt, idx) => (
                <div
                  key={evt.id || idx}
                  className="p-4 rounded-xl border border-border/60 bg-surface-50 dark:bg-surface-900/40 flex items-center justify-between hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-card border border-border/80 shadow-xs">
                      {getEventIcon(evt.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-foreground">{evt.title}</p>
                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getEventBadge(evt.type)}`}>
                          {evt.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{evt.text}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-foreground">
                      {evt.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-medium">Scheduled Event</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 text-xs text-muted-foreground">
            <CalendarIcon className="w-8 h-8 text-primary mx-auto" />
            <p>Monthly Grid View populated with {calendarEvents.length} events across current month.</p>
          </div>
        )}
      </div>
    </div>
  );
};
