import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  FileText, 
  Send, 
  Video, 
  CheckSquare, 
  Plus, 
  Star, 
  Edit3, 
  Trash2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import { ApplicationModal } from '../components/Modals/ApplicationModal';
import { formatSalaryDisplay } from '../utils/currency';

export const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplicationStage, toggleFavorite, deleteApplication, interviews, tasks, followUps } = useApplications();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const app = applications.find(a => a.id === id);

  if (!app) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold">Application Not Found</h2>
        <p className="text-xs text-muted-foreground">The application ID does not exist or was deleted.</p>
        <button onClick={() => navigate('/applications')} className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl">
          Back to Applications
        </button>
      </div>
    );
  }

  const appInterviews = interviews.filter(i => i.applicationId === app.id || i.company.toLowerCase() === app.company.toLowerCase());
  const appTasks = tasks.filter(t => t.applicationId === app.id || t.company.toLowerCase() === app.company.toLowerCase());
  const appFollowups = followUps.filter(f => f.applicationId === app.id || f.company.toLowerCase() === app.company.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <button
        onClick={() => navigate('/applications')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Applications</span>
      </button>

      {/* Header Workspace Banner */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shadow-glow-primary flex-shrink-0">
              {app.company[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{app.jobTitle}</h1>
                <button 
                  onClick={() => toggleFavorite(app.id)}
                  className={`p-1 rounded hover:bg-accent ${app.isFavorite ? 'text-amber-400' : 'text-muted-foreground/30'}`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1 font-medium">
                <span className="flex items-center gap-1 font-bold text-foreground">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  {app.company}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {app.location} ({app.workMode})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-foreground">{formatSalaryDisplay(app.salaryMin, app.salaryMax).primary}</span>
                  <span className="text-[10px] text-muted-foreground">({formatSalaryDisplay(app.salaryMin, app.salaryMax).secondary})</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {app.jobUrl && (
              <a
                href={app.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
              >
                <span>Job Posting</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-semibold hover:bg-accent transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => {
                deleteApplication(app.id);
                navigate('/applications');
              }}
              className="p-2 rounded-xl text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stage Selector & Quick Actions */}
        <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Current Stage:</span>
            <select
              value={app.stage}
              onChange={(e) => updateApplicationStage(app.id, e.target.value)}
              className="px-3 py-1 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 focus:outline-none cursor-pointer"
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

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/interviews')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Schedule Interview</span>
            </button>
            <button 
              onClick={() => navigate('/followups')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Follow-Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/80 gap-6">
        {['overview', 'timeline', 'interviews', 'tasks', 'documents'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Job Description</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {app.jobDescription || 'We are looking for a Software Developer to join our engineering team and contribute to building scalable web applications. The candidate will work closely with designers and backend engineers to develop responsive user interfaces, integrate APIs, troubleshoot issues, and improve application performance.'}
              </p>
            </div>

            {/* Clearly Separated Technical Requirements Section */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>Technical Requirements</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(app.technicalRequirements || ['JavaScript (ES6+)', 'React.js', 'Node.js', 'REST APIs', 'MongoDB', 'Git & Version Control', 'HTML5 / CSS3']).map((req, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-surface-50 dark:bg-surface-900/50 border border-border text-xs font-medium text-foreground flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Details */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>Recruiter & Contact Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground font-semibold">Recruiter Name</p>
                  <p className="font-bold text-foreground mt-0.5">{app.recruiterName || 'Arun Kumar'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-semibold">Recruiter Email</p>
                  {app.recruiterEmail ? (
                    <a 
                      href={`mailto:${app.recruiterEmail}`}
                      className="font-bold text-primary hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{app.recruiterEmail}</span>
                    </a>
                  ) : (
                    <p className="font-semibold text-muted-foreground mt-0.5">Not specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Info Box */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
              <h3 className="font-bold text-sm tracking-tight">Application Meta</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Work Mode</span>
                  <span className="font-semibold text-foreground">{app.workMode || 'Hybrid'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Experience Level</span>
                  <span className="font-semibold text-foreground">{app.experienceLevel || 'Entry Level / Fresher'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-semibold text-foreground">{app.source}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Applied Date</span>
                  <span className="font-semibold text-foreground">
                    {new Date(app.applicationDate).toLocaleDateString()}
                  </span>
                </div>
                {app.followUpDate && (
                  <div className="flex justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Follow-up Date</span>
                    <span className="font-semibold text-amber-400">
                      {new Date(app.followUpDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">Resume Used</span>
                  <span className="font-semibold text-primary truncate max-w-[150px]">{app.resumeUsed}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Cover Letter</span>
                  <span className="font-semibold text-primary truncate max-w-[150px]">{app.coverLetterUsed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs max-w-2xl space-y-4">
          <h3 className="font-bold text-sm tracking-tight">Application Status Timeline</h3>
          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
            {(app.timeline || []).map((t, idx) => (
              <div key={t.id || idx} className="pl-8 relative">
                <div className="w-3 h-3 rounded-full bg-primary absolute left-1.5 top-1.5 ring-4 ring-card" />
                <div className="p-3 rounded-xl border border-border bg-surface-50 dark:bg-surface-900/50">
                  <p className="text-xs font-bold text-foreground">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground">{t.description}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">
                    {new Date(t.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <ApplicationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={app}
      />
    </div>
  );
};
