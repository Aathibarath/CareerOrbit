import React, { useState, useEffect } from 'react';
import { X, Briefcase, Building2, User, FileText, Tag, Sparkles } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

export const ApplicationModal = ({ isOpen, onClose, initialData }) => {
  const { addApplication, updateApplication } = useApplications();
  const [activeTab, setActiveTab] = useState('job');

  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [location, setLocation] = useState('Remote');
  const [workMode, setWorkMode] = useState('Remote');
  const [employmentType, setEmploymentType] = useState('Full-Time');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [stage, setStage] = useState('Applied');
  const [priority, setPriority] = useState('Medium');
  const [source, setSource] = useState('LinkedIn');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [resumeUsed, setResumeUsed] = useState('Software Engineer Resume v2.pdf');
  const [coverLetterUsed, setCoverLetterUsed] = useState('Standard Cover Letter.pdf');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company || '');
      setJobTitle(initialData.jobTitle || '');
      setJobUrl(initialData.jobUrl || '');
      setLocation(initialData.location || 'Remote');
      setWorkMode(initialData.workMode || 'Remote');
      setEmploymentType(initialData.employmentType || 'Full-Time');
      setSalaryMin(initialData.salaryMin || '');
      setSalaryMax(initialData.salaryMax || '');
      setStage(initialData.stage || 'Applied');
      setPriority(initialData.priority || 'Medium');
      setSource(initialData.source || 'LinkedIn');
      setRecruiterName(initialData.recruiterName || '');
      setRecruiterEmail(initialData.recruiterEmail || '');
      setJobDescription(initialData.jobDescription || '');
      setNotes(initialData.notes || '');
      setResumeUsed(initialData.resumeUsed || 'Software Engineer Resume v2.pdf');
      setCoverLetterUsed(initialData.coverLetterUsed || 'Standard Cover Letter.pdf');
      setTags(initialData.tags ? initialData.tags.join(', ') : '');
    } else {
      setCompany('');
      setJobTitle('');
      setJobUrl('');
      setLocation('Remote');
      setWorkMode('Remote');
      setSalaryMin('');
      setSalaryMax('');
      setStage('Applied');
      setPriority('Medium');
      setSource('LinkedIn');
      setRecruiterName('');
      setRecruiterEmail('');
      setJobDescription('');
      setNotes('');
      setTags('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !jobTitle) return;

    const payload = {
      company,
      jobTitle,
      jobUrl,
      location,
      workMode,
      employmentType,
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      stage,
      priority,
      source,
      recruiterName,
      recruiterEmail,
      jobDescription,
      notes,
      resumeUsed,
      coverLetterUsed,
      tags: tags ? tags.split(',').map(t => t.trim()) : ['General']
    };

    if (initialData?.id) {
      updateApplication(initialData.id, payload);
    } else {
      addApplication(payload);
    }
    onClose();
  };

  const tabs = [
    { id: 'job', label: 'Job & Company', icon: Briefcase },
    { id: 'details', label: 'Application Details', icon: Building2 },
    { id: 'recruiter', label: 'Recruiter Info', icon: User },
    { id: 'docs', label: 'Docs & Notes', icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base">
              {initialData ? `Edit ${initialData.company} Application` : 'Add Application to Orbit'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-accent">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 flex border-b border-border/60 gap-4 overflow-x-auto no-scrollbar">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`pb-3 flex items-center gap-2 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === t.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'job' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NovaTech"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Developer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Job URL / Listing Link</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/jobs/view/..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Salary Min (₹ INR / year)</label>
                  <input
                    type="number"
                    placeholder="800000"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Salary Max (₹ INR / year)</label>
                  <input
                    type="number"
                    placeholder="1200000"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Current Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Wishlist">Wishlist</option>
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Final Interview">Final Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Application Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Company Website">Company Website</option>
                  <option value="Indeed">Indeed</option>
                  <option value="Referral">Referral</option>
                  <option value="College Placement">College Placement</option>
                  <option value="Recruiter">Recruiter Outreach</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Remote, High Pay, Top Choice"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {activeTab === 'recruiter' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1">Recruiter Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Recruiter Email</label>
                <input
                  type="email"
                  placeholder="sarah.j@company.com"
                  value={recruiterEmail}
                  onChange={(e) => setRecruiterEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Resume Used</label>
                  <input
                    type="text"
                    value={resumeUsed}
                    onChange={(e) => setResumeUsed(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Cover Letter Used</label>
                  <input
                    type="text"
                    value={coverLetterUsed}
                    onChange={(e) => setCoverLetterUsed(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Job Description</label>
                <textarea
                  rows={3}
                  placeholder="Paste job description requirements..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Personal notes, referrals, contacts..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all"
            >
              {initialData ? 'Save Changes' : 'Add to Orbit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
