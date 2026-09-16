import React, { useState } from 'react';
import { Building2, Globe, Star, MapPin, Plus, ExternalLink, Users, Search, User, Mail } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const CompaniesPage = () => {
  const { companies, applications, setIsQuickAddOpen, setQuickAddType } = useApplications();
  const [search, setSearch] = useState('');

  const filteredCompanies = companies.filter(comp => {
    if (!search) return true;
    const q = search.toLowerCase();
    return comp.name.toLowerCase().includes(q) || comp.industry.toLowerCase().includes(q) || comp.location.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Company Directory & Intelligence</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Explore {companies.length} tech companies, ratings, locations, and recruiter contacts.
          </p>
        </div>

        <button
          onClick={() => {
            setQuickAddType('Company');
            setIsQuickAddOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Filter by company name, location, or industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-xs focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map(comp => {
          const linkedApps = applications.filter(a => a.company.toLowerCase() === comp.name.toLowerCase());
          return (
            <div key={comp.id} className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-xs hover:border-primary/40 transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                      {comp.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{comp.name}</h3>
                      <p className="text-[11px] text-muted-foreground">{comp.industry}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{comp.rating || 4.5}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t border-border/40 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</span>
                    <span className="text-foreground font-semibold">{comp.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Size</span>
                    <span className="text-foreground">{comp.companySize}</span>
                  </div>
                  {comp.recruiterName && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-purple-400" /> Recruiter</span>
                      <span className="text-purple-400 font-semibold">{comp.recruiterName}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-primary" /> User Applications</span>
                    <span className="font-bold text-primary">{linkedApps.length} Tracked</span>
                  </div>
                </div>
              </div>

              {comp.website && (
                <a
                  href={comp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-2 border-t border-border/40"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
