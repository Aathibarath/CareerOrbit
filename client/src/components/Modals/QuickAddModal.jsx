import React, { useState } from 'react';
import { X, Briefcase, CheckSquare, Video, UserPlus, Building2, Sparkles } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export const QuickAddModal = ({ isOpen, onClose }) => {
  const { addApplication, addTask, addInterview, addContact, addCompany } = useApplications();
  const [activeType, setActiveType] = useState('Application');

  // Form States
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('Remote');
  const [stage, setStage] = useState('Applied');
  const [priority, setPriority] = useState('Medium');
  
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('Tech Recruiter');
  const [contactEmail, setContactEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeType === 'Application') {
      if (!company || !jobTitle) return;
      addApplication({ company, jobTitle, location, stage, priority });
    } else if (activeType === 'Task') {
      if (!title) return;
      addTask({ title, company: company || 'General', dueDate });
    } else if (activeType === 'Interview') {
      if (!company || !jobTitle) return;
      addInterview({ company, jobTitle, date: dueDate });
    } else if (activeType === 'Contact') {
      if (!contactName) return;
      addContact({ name: contactName, role: contactRole, company, email: contactEmail });
    } else if (activeType === 'Company') {
      if (!company) return;
      addCompany({ name: company, location });
    }
    
    // Reset & Close
    setCompany('');
    setJobTitle('');
    setTitle('');
    onClose();
  };

  const types = [
    { id: 'Application', label: 'Application', icon: Briefcase },
    { id: 'Task', label: 'Task', icon: CheckSquare },
    { id: 'Interview', label: 'Interview', icon: Video },
    { id: 'Contact', label: 'Contact', icon: UserPlus },
    { id: 'Company', label: 'Company', icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Quick Add to Orbit</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {types.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeType === t.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-surface-100 dark:bg-surface-800 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeType === 'Application' && (
            <>
              <div>
                <label className="block text-xs font-medium mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OpenAI, Stripe, Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Engineer, Full Stack Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Wishlist">Wishlist</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeType === 'Task' && (
            <>
              <div>
                <label className="block text-xs font-medium mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Follow up with recruiter, Practice LeetCode"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. NovaTech"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </>
          )}

          {activeType === 'Contact' && (
            <>
              <div>
                <label className="block text-xs font-medium mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. PixelForge"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="recruiter@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </>
          )}

          {activeType === 'Company' && (
            <>
              <div>
                <label className="block text-xs font-medium mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OrbitLabs"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary transition-all"
            >
              Add {activeType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
