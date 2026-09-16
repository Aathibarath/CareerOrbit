import React, { useState } from 'react';
import { User, Sun, Moon, Download, ShieldCheck, Save, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApplications } from '../context/ApplicationContext';

export const SettingsPage = () => {
  const { user, completeOnboarding } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { applications, showToast } = useApplications();

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || 'Entry Level / Fresher');
  const [preferredLocation, setPreferredLocation] = useState(user?.preferredLocation || 'Remote');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    completeOnboarding({ name, targetRole, experienceLevel, preferredLocation });
    showToast('Settings saved successfully!');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applications, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CareerOrbit_Applications_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported applications to JSON format!');
  };

  const handleExportCSV = () => {
    const headers = ['Company', 'Job Title', 'Stage', 'Priority', 'Location', 'Work Mode', 'Salary Min', 'Salary Max', 'Application Date', 'Source'];
    const rows = applications.map(a => [
      `"${a.company}"`,
      `"${a.jobTitle}"`,
      `"${a.stage}"`,
      `"${a.priority}"`,
      `"${a.location}"`,
      `"${a.workMode}"`,
      a.salaryMin || 0,
      a.salaryMax || 0,
      `"${new Date(a.applicationDate).toLocaleDateString()}"`,
      `"${a.source}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `CareerOrbit_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported applications to CSV format!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Workspace Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your profile details, target job preferences, appearance, and data exports.
        </p>
      </div>

      {/* Profile & Target Role */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          <span>Profile & Target Job Preferences</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Target Job Title</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Entry Level / Fresher">Entry Level / Fresher</option>
                <option value="Internship">Internship Candidate</option>
                <option value="Mid Level (2-4 yrs)">Mid Level (2-4 yrs)</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Preferred Location / Mode</label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </form>
      </div>

      {/* Theme & Appearance */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          <span>Appearance & Theme</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-surface-50 dark:bg-surface-900/40">
          <div>
            <p className="text-xs font-semibold">Workspace Theme</p>
            <p className="text-[11px] text-muted-foreground">Toggle between high-contrast dark command center and clean light mode.</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl border border-border font-semibold text-xs hover:bg-accent transition-colors flex items-center gap-2"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>

      {/* Data Export & Backup */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Data Export & Portable Workspace</span>
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Export your complete job application history, salaries, recruiter contacts, and stage timelines at any time.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-accent transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV File</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 rounded-xl border border-border hover:bg-accent font-bold text-xs transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export to JSON Backup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
