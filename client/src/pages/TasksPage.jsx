import React, { useState } from 'react';
import { CheckSquare, Plus, AlertCircle, Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const TasksPage = () => {
  const { tasks, addTask, toggleTaskStatus, setIsQuickAddOpen, setQuickAddType } = useApplications();
  const [filter, setFilter] = useState('All'); // All, Pending, In Progress, Completed, Urgent

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Pending') return t.status === 'Todo';
    if (filter === 'In Progress') return t.status === 'In Progress';
    if (filter === 'Completed') return t.status === 'Completed';
    if (filter === 'Urgent') return t.priority === 'Urgent' || t.priority === 'High';
    return true;
  });

  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    if (status === 'In Progress') return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Job Search Task Manager</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track resume tailoring, coding assessments, STAR interview prep, and outreach todos ({tasks.length} total tasks).
          </p>
        </div>

        <button
          onClick={() => {
            setQuickAddType('Task');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto no-scrollbar">
        {['All', 'Pending', 'In Progress', 'Completed', 'Urgent'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === f ? 'bg-primary/15 text-primary border border-primary/20 shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm">
        {filteredTasks.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No tasks found matching current filter ({filter}).
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                task.status === 'Completed'
                  ? 'bg-surface-50 dark:bg-surface-900/30 border-border/50 opacity-75'
                  : 'bg-card border-border/80 hover:border-primary/40'
              }`}
            >
              <input
                type="checkbox"
                checked={task.status === 'Completed'}
                onChange={() => toggleTaskStatus(task.id)}
                className="mt-1 rounded text-primary focus:ring-primary cursor-pointer w-4 h-4"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold ${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                      task.priority === 'Urgent' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {task.description && (
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{task.description}</p>
                )}

                <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-medium">
                  <span>Company: <strong className="text-foreground">{task.company || 'General'}</strong></span>
                  <span>•</span>
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
