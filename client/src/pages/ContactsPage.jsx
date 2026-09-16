import React from 'react';
import { User, Mail, Phone, Linkedin, Building2, Plus, Calendar } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const ContactsPage = () => {
  const { contacts, setIsQuickAddOpen, setQuickAddType } = useApplications();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Recruiter & Network CRM</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Store technical recruiters, hiring managers, and employee referral contacts.
          </p>
        </div>

        <button
          onClick={() => {
            setQuickAddType('Contact');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(cont => (
          <div key={cont.id} className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                {cont.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{cont.name}</h3>
                <p className="text-xs text-muted-foreground">{cont.role}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 mt-1 inline-block">
                  {cont.relationship || 'Recruiter'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-border/40 font-medium">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground">{cont.company}</span>
              </div>
              {cont.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <a href={`mailto:${cont.email}`} className="text-primary hover:underline truncate">{cont.email}</a>
                </div>
              )}
              {cont.linkedIn && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-foreground truncate">{cont.linkedIn}</span>
                </div>
              )}
            </div>

            {cont.notes && (
              <p className="text-[11px] text-muted-foreground italic bg-surface-50 dark:bg-surface-900/40 p-2.5 rounded-xl border border-border/40">
                "{cont.notes}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
