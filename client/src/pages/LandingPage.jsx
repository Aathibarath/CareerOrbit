import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Orbit, 
  ArrowRight, 
  CheckCircle, 
  Kanban, 
  Video, 
  Send, 
  BarChart3, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  Star,
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  const handleTryDemo = async () => {
    await login('demo@careerorbit.dev', 'password');
    navigate('/dashboard');
  };

  const features = [
    { title: 'Interactive Kanban Pipeline', desc: 'Drag and drop applications across custom stages with instant stage history logging.', icon: Kanban },
    { title: 'Interview Preparation Hub', desc: 'STAR checklist frameworks, questions to ask, meeting links, and post-interview reflections.', icon: Video },
    { title: 'Automated Follow-Up Engine', desc: 'Never miss a recruiter outreach window. Auto-generate tailored outreach messages.', icon: Send },
    { title: 'Career Intelligence Analytics', desc: 'Identify callback bottlenecks with conversion funnel charts and response rate metrics.', icon: BarChart3 },
    { title: 'Resume & Document CRM', desc: 'Track which resume version and cover letter was submitted for every job application.', icon: FileText },
    { title: 'AI Career Copilot Interface', desc: 'Audit application performance and analyze ATS keyword match against job descriptions.', icon: Sparkles },
  ];

  const testimonials = [
    { name: 'David Kim', role: 'Software Engineer @ Stripe', text: 'CareerOrbit completely eliminated my job application spreadsheet chaos. Managed 42 applications and secured 4 top offers!', rating: 5 },
    { name: 'Ananya Sharma', role: 'Frontend Developer @ NovaTech', text: 'The interview prep checklists and follow-up templates gave me confidence. Highly recommended for freshers!', rating: 5 },
    { name: 'Jordan Rivera', role: 'CS Student @ UT Austin', text: 'The Kanban board and analytics made my summer internship hunt structured and stress-free.', rating: 5 }
  ];

  const faqs = [
    { q: 'Is CareerOrbit free for students and job seekers?', a: 'Yes! CareerOrbit provides a full-featured workspace for active job seekers, including pipeline tracking, follow-ups, and interview prep tools.' },
    { q: 'Can I explore the application without creating an account?', a: 'Absolutely! Click "Explore Demo" to launch the fully pre-seeded demo workspace filled with realistic application data.' },
    { q: 'How does the Follow-up Engine work?', a: 'CareerOrbit monitors days elapsed since your application submission and alerts you when a follow-up email is due, offering pre-filled outreach templates.' },
    { q: 'Does CareerOrbit export data?', a: 'Yes, you can export all your application records, interviews, and contacts at any time in both CSV and JSON formats from Settings.' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Top Header */}
      <header className="h-20 border-b border-border/60 bg-card/60 backdrop-blur-xl sticky top-0 z-40 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-glow-primary">
            <Orbit className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent light:text-slate-900">
              CareerOrbit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleTryDemo}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-accent transition-colors"
          >
            Explore Demo
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary transition-all"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-4 h-4" />
          <span>Intelligent Job Search Command Center</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          Turn Your Job Search Into a{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Winning Strategy.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Track every application, prepare for every interview round, never miss a recruiter follow-up, and understand exactly where your job search is heading.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-primary flex items-center justify-center gap-2 group transition-all"
          >
            <span>Start Tracking Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleTryDemo}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-border bg-card/80 hover:bg-accent text-foreground font-semibold text-sm transition-all"
          >
            Explore Pre-Seeded Demo
          </button>
        </div>

        {/* Hero Interactive Dashboard Preview */}
        <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-4 sm:p-6 shadow-2xl relative max-w-5xl mx-auto overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px]">careerorbit.app/dashboard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-900/60 border border-border/60">
              <p className="text-xs text-muted-foreground">Active Applications</p>
              <p className="text-2xl font-bold text-foreground">32</p>
              <p className="text-[11px] text-emerald-400 mt-1 font-semibold">↑ 18% this month</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-900/60 border border-border/60">
              <p className="text-xs text-muted-foreground">Response Rate</p>
              <p className="text-2xl font-bold text-foreground">68%</p>
              <p className="text-[11px] text-blue-400 mt-1 font-semibold">Top 10% benchmark</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-900/60 border border-border/60">
              <p className="text-xs text-muted-foreground">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-[11px] text-purple-400 mt-1 font-semibold">NovaTech, PixelForge, Finora</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 lg:px-12 py-20 bg-surface-50/50 dark:bg-surface-900/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Everything You Need to Land Your Next Role
            </h2>
            <p className="text-muted-foreground text-sm">
              Designed specifically for software engineers, interns, and professionals seeking clarity in their job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Trusted by Job Seekers</h2>
          <p className="text-xs text-muted-foreground">See how CareerOrbit transforms job search workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">"{t.text}"</p>
              <div>
                <p className="text-xs font-bold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-16 bg-surface-50/50 dark:bg-surface-900/30 border-t border-border max-w-4xl mx-auto rounded-3xl mb-16">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-xl bg-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left text-sm font-semibold flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 lg:px-12 py-20 text-center max-w-5xl mx-auto">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-primary/30 relative overflow-hidden">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">
            Ready to Take Control of Your Career Orbit?
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
            Join thousands of job seekers organizing their search intelligently with CareerOrbit.
          </p>
          <button
            onClick={handleTryDemo}
            className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-glow-primary hover:bg-primary/90 transition-all inline-flex items-center gap-2"
          >
            <span>Launch Live Demo Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
