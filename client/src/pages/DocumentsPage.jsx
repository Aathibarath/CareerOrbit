import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, Upload, Briefcase, Trash2, Download, Eye, Sparkles, Star } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const DocumentsPage = () => {
  const { documents, addDocument, deleteDocument, applications, showToast } = useApplications();
  const [isUploading, setIsUploading] = useState(false);
  const [docName, setDocName] = useState('');
  const [docTarget, setDocTarget] = useState('React / Frontend Developer');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      addDocument({
        name: file.name,
        type: file.name.toLowerCase().includes('cover') ? 'Cover Letter' : 'Resume',
        target: docTarget
      });
      setIsUploading(false);
      setDocName('');
    }
  };

  const handleCreateMockDoc = () => {
    const defaultName = docName.trim() || `Resume_v${documents.length + 1}_2026.pdf`;
    addDocument({
      name: defaultName,
      type: defaultName.toLowerCase().includes('cover') ? 'Cover Letter' : 'Resume',
      target: docTarget
    });
    setIsUploading(false);
    setDocName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Resume & Document Hub</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage resume iterations, cover letters, and track linked application versions.
          </p>
        </div>

        <button 
          onClick={() => setIsUploading(!isUploading)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Resume</span>
        </button>
      </div>

      {/* Upload Dialog Drawer / Modal */}
      {isUploading && (
        <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              <span>Upload New Resume Version</span>
            </h3>
            <span className="text-[10px] text-muted-foreground font-medium">Supports PDF & DOCX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Target Role Focus</label>
              <input
                type="text"
                placeholder="e.g. React Developer, Full Stack"
                value={docTarget}
                onChange={(e) => setDocTarget(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Document File Name</label>
              <input
                type="text"
                placeholder="e.g. Aathi_Software_Engineer_Resume_v4.pdf"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="cursor-pointer px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow-primary hover:bg-primary/90 transition-all">
              <span>Select File & Upload</span>
              <input type="file" accept=".pdf,.docx,.doc" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handleCreateMockDoc}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-accent transition-colors"
            >
              Upload Demo Resume
            </button>

            <button
              onClick={() => setIsUploading(false)}
              className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map(doc => {
          const linkedCount = applications.filter(a => a.resumeUsed === doc.name || a.coverLetterUsed === doc.name).length;
          return (
            <div key={doc.id || doc.name} className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-xs hover:border-primary/40 transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-foreground truncate max-w-[170px]" title={doc.name}>
                        {doc.name}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-medium">
                        {doc.type} • {doc.version} ({doc.fileType || 'PDF'})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {doc.isCurrent && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                        Latest
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {doc.status || 'Active'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 text-xs space-y-1.5 text-muted-foreground font-medium">
                  <div className="flex justify-between">
                    <span>Target Focus:</span>
                    <span className="text-foreground font-semibold truncate max-w-[150px]">{doc.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uploaded Date:</span>
                    <span className="text-foreground">
                      {new Date(doc.uploadDate || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Linked Applications:</span>
                    <span className="font-bold text-primary">{linkedCount} Applications</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                <button
                  onClick={() => showToast(`Previewing ${doc.name}...`)}
                  className="flex items-center gap-1.5 text-primary hover:underline font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View / Download</span>
                </button>

                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
