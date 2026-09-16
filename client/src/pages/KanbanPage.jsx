import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, Building2, MapPin, Calendar, Star } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const KanbanPage = () => {
  const { applications, updateApplicationStage, toggleFavorite, setIsQuickAddOpen, setQuickAddType } = useApplications();
  const navigate = useNavigate();

  const columns = [
    { id: 'Wishlist', title: 'Wishlist', color: 'border-slate-500/30 bg-slate-500/5 text-slate-400' },
    { id: 'Applied', title: 'Applied', color: 'border-blue-500/30 bg-blue-500/5 text-blue-400' },
    { id: 'Screening', title: 'Screening', color: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' },
    { id: 'Assessment', title: 'Assessment', color: 'border-purple-500/30 bg-purple-500/5 text-purple-400' },
    { id: 'Interview', title: 'Interview', color: 'border-amber-500/30 bg-amber-500/5 text-amber-400' },
    { id: 'Offer', title: 'Offer', color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' },
    { id: 'Rejected', title: 'Rejected', color: 'border-rose-500/30 bg-rose-500/5 text-rose-400' },
  ];

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateApplicationStage(draggableId, destination.droppableId);
  };

  const getPriorityClass = (priority) => {
    if (priority === 'Urgent') return 'bg-rose-500/15 text-rose-400 border-rose-500/30 font-bold';
    if (priority === 'High') return 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-semibold';
    if (priority === 'Medium') return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Application Pipeline</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Drag and drop applications across hiring stages to update status and record history.
          </p>
        </div>

        <button
          onClick={() => {
            setQuickAddType('Application');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Pipeline Card</span>
        </button>
      </div>

      {/* Kanban Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar min-h-[70vh]">
          {columns.map((col) => {
            const colApps = applications.filter(a => a.stage === col.id && !a.isArchived);
            return (
              <div
                key={col.id}
                className="w-72 flex-shrink-0 flex flex-col rounded-2xl bg-card border border-border/70 p-3 shadow-xs"
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between px-3 py-2 rounded-xl border mb-3 font-semibold text-xs ${col.color}`}>
                  <span>{col.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-card text-[11px] font-bold border border-current">
                    {colApps.length}
                  </span>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 min-h-[50vh] transition-colors rounded-xl p-1 ${
                        snapshot.isDraggingOver ? 'bg-primary/5 ring-2 ring-primary/20' : ''
                      }`}
                    >
                      {colApps.map((app, index) => (
                        <Draggable key={app.id} draggableId={app.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => navigate(`/applications/${app.id}`)}
                              className={`p-3.5 rounded-xl border bg-card hover:border-primary/50 transition-all duration-200 cursor-grab active:cursor-grabbing select-none group shadow-xs ${
                                snapshot.isDragging ? 'shadow-2xl ring-2 ring-primary rotate-1 scale-105' : 'border-border/60'
                              }`}
                            >
                              {/* Card Top */}
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-md border uppercase tracking-wider ${getPriorityClass(app.priority)}`}>
                                  {app.priority}
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(app.id);
                                  }}
                                  className={`p-1 rounded hover:bg-accent ${app.isFavorite ? 'text-amber-400' : 'text-muted-foreground/30'}`}
                                >
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                </button>
                              </div>

                              {/* Company & Role */}
                              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {app.jobTitle}
                              </h4>
                              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5 font-medium">
                                <Building2 className="w-3 h-3" />
                                <span>{app.company}</span>
                              </p>

                              {/* Tags */}
                              {app.tags && app.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2.5">
                                  {app.tags.slice(0, 2).map((t, idx) => (
                                    <span key={idx} className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-surface-100 dark:bg-surface-800 text-muted-foreground border border-border/50">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Card Footer */}
                              <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {app.workMode}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(app.applicationDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
