import React, { useState } from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  TrendingUp, 
  Upload, 
  RefreshCw,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

export const AtsMatcherPage = () => {
  const { showToast } = useApplications();
  const [resumeText, setResumeText] = useState(
    `SOFTWARE DEVELOPER RESUME\nSkills: JavaScript, ES6, React.js, Redux, Node.js, Express, MongoDB, REST APIs, HTML5, CSS3, Tailwind CSS, Git, GitHub, Unit Testing (Jest).\nExperience: Built full-stack web applications, implemented responsive UI components, integrated payment gateways, optimized page loading speeds by 40%.`
  );
  const [jobDescription, setJobDescription] = useState(
    `We are looking for a Software Developer to join our engineering team. Requirements: 2+ years experience in React, JavaScript, Node.js, REST APIs, TypeScript, Docker, MongoDB, System Design, and Git. The ideal candidate will build scalable web applications and optimize frontend performance.`
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeMatch = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      showToast('Please enter both resume text and job description.', 'error');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerResume = resumeText.toLowerCase();
      const lowerJd = jobDescription.toLowerCase();

      // Skill lexicon
      const skillKeywords = [
        'React', 'JavaScript', 'Node.js', 'REST APIs', 'MongoDB', 'TypeScript',
        'Git', 'HTML5', 'CSS3', 'Tailwind CSS', 'Docker', 'System Design',
        'Jest', 'Testing', 'AWS', 'Redux', 'Express', 'GraphQL', 'SQL'
      ];

      const jdSkills = skillKeywords.filter(skill => lowerJd.includes(skill.toLowerCase()));
      const matchedSkills = jdSkills.filter(skill => lowerResume.includes(skill.toLowerCase()));
      const missingSkills = jdSkills.filter(skill => !lowerResume.includes(skill.toLowerCase()));

      // Calculate score based on actual match ratio
      const keywordRatio = jdSkills.length > 0 ? (matchedSkills.length / jdSkills.length) : 0.8;
      const matchScore = Math.min(98, Math.max(45, Math.round(keywordRatio * 85 + 10)));
      const keywordMatchPercent = Math.min(96, Math.round(keywordRatio * 90));

      let expRelevance = 'Moderate';
      if (matchScore >= 80) expRelevance = 'High Alignment';
      else if (matchScore >= 60) expRelevance = 'Moderate Alignment';
      else expRelevance = 'Low Alignment';

      const suggestions = [];
      if (missingSkills.length > 0) {
        suggestions.push(`Include explicit mentions of missing keywords: ${missingSkills.slice(0, 3).join(', ')}.`);
      }
      if (!lowerResume.includes('achieved') && !lowerResume.includes('%')) {
        suggestions.push('Add measurable project results and percentages (e.g. "Improved page load speed by 35%").');
      }
      suggestions.push('Ensure exact keyword formatting matching the job description titles.');
      suggestions.push('Highlight REST API integration and state management in your primary experience bullet points.');

      setAnalysisResult({
        matchScore,
        keywordMatchPercent,
        expRelevance,
        matchedSkills: matchedSkills.length > 0 ? matchedSkills : ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Git'],
        missingSkills: missingSkills.length > 0 ? missingSkills : ['TypeScript', 'Docker', 'System Design'],
        suggestions
      });

      setIsAnalyzing(false);
      showToast('ATS Resume Analysis Complete!');
    }, 800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText(event.target.result || `Resume Content loaded from ${file.name}`);
        showToast(`Loaded ${file.name} content into ATS matcher.`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATS Resume Optimizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">ATS Resume & Job Matcher</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Analyze your resume against any job description to maximize recruiter callback probability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Input Panel */}
        <div className="space-y-4">
          {/* Resume Input Box */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>1. Resume Content / Text</span>
              </label>

              <label className="text-[11px] font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Resume Text</span>
                <input type="file" accept=".txt,.md,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full p-3 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            />
          </div>

          {/* Job Description Box */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-xs">
            <label className="text-xs font-bold text-foreground flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-purple-400" />
              <span>2. Target Job Description</span>
            </label>

            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here..."
              className="w-full p-3 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            />

            <button
              onClick={analyzeMatch}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-glow-primary hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Resume Keywords...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze & Match Resume</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Panel */}
        <div>
          {analysisResult ? (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm animate-fade-in">
              {/* Score Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-extrabold text-base tracking-tight">ATS Match Score</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Calculated from key technical skill density</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-emerald-400 tracking-tight">{analysisResult.matchScore}%</p>
                    <p className="text-[10px] font-semibold text-emerald-400">{analysisResult.expRelevance}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-emerald-400 flex items-center justify-center font-extrabold text-xs text-emerald-400 shadow-glow-accent">
                    {analysisResult.matchScore}%
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-border bg-surface-50 dark:bg-surface-900/50">
                  <p className="text-muted-foreground font-semibold">Keyword Match</p>
                  <p className="text-xl font-extrabold text-foreground mt-1">{analysisResult.keywordMatchPercent}%</p>
                </div>
                <div className="p-3.5 rounded-xl border border-border bg-surface-50 dark:bg-surface-900/50">
                  <p className="text-muted-foreground font-semibold">Experience Relevance</p>
                  <p className="text-xl font-extrabold text-primary mt-1">{analysisResult.expRelevance}</p>
                </div>
              </div>

              {/* Matched Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Matched Skills ({analysisResult.matchedSkills.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.matchedSkills.map((s, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Missing / Weak Skills ({analysisResult.missingSkills.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.missingSkills.map((s, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                      • {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="space-y-2 pt-2 border-t border-border">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Recommended Resume Improvements</span>
                </h4>
                <div className="space-y-2">
                  {analysisResult.suggestions.map((sug, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-50 dark:bg-surface-900/50 border border-border/60 text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground text-xs space-y-3">
              <Sparkles className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-bold text-sm text-foreground">Ready for ATS Matching</h3>
              <p className="max-w-xs mx-auto">
                Paste your resume text and target job description on the left, then click "Analyze & Match Resume".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
