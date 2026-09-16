import React, { useState } from 'react';
import { Search, X, Briefcase, Building2, UserPlus, Video, ArrowRight } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';

export const SearchModal = ({ isOpen, onClose }) => {
  const { applications, companies, contacts, interviews } = useApplications();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingApps = q
    ? applications.filter(a => a.company.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q) || (a.tags && a.tags.some(t => t.toLowerCase().includes(q))))
    : [];

  const matchingCompanies = q
    ? companies.filter(c => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q))
    : [];

  const matchingContacts = q
    ? contacts.filter(c => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q))
    : [];

  const matchingInterviews = q
    ? interviews.filter(i => i.company.toLowerCase().includes(q) || i.jobTitle.toLowerCase().includes(q))
    : [];

  const hasResults = matchingApps.length > 0 || matchingCompanies.length > 0 || matchingContacts.length > 0 || matchingInterviews.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-card border border-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search applications, companies, contacts, interviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-accent">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-muted-foreground text-xs">
              Type keywords such as "NovaTech", "React", "Frontend", or "Interview" to search across your workspace.
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-8 text-muted-foreground text-xs">
              No matching records found for "{query}".
            </div>
          )}

          {/* Applications */}
          {matchingApps.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                <span>Applications ({matchingApps.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingApps.map(app => (
                  <div
                    key={app.id}
                    onClick={() => {
                      navigate(`/applications/${app.id}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-border/50 hover:border-primary/40 bg-surface-50 dark:bg-surface-900/50 hover:bg-accent/40 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{app.jobTitle}</p>
                      <p className="text-[11px] text-muted-foreground">{app.company} • {app.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {app.stage}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Companies */}
          {matchingCompanies.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Companies ({matchingCompanies.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingCompanies.map(comp => (
                  <div
                    key={comp.id}
                    onClick={() => {
                      navigate('/companies');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-border/50 hover:border-indigo-500/40 bg-surface-50 dark:bg-surface-900/50 hover:bg-accent/40 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground">{comp.name}</p>
                      <p className="text-[11px] text-muted-foreground">{comp.industry} • {comp.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts */}
          {matchingContacts.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contacts ({matchingContacts.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingContacts.map(cont => (
                  <div
                    key={cont.id}
                    onClick={() => {
                      navigate('/contacts');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-border/50 hover:border-emerald-500/40 bg-surface-50 dark:bg-surface-900/50 hover:bg-accent/40 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground">{cont.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cont.role} @ {cont.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
