import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Orbit, Check, ArrowRight, Target, Award, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [industry, setIndustry] = useState('Technology & Software');
  const [workMode, setWorkMode] = useState('Remote');
  const [goal, setGoal] = useState('Get my first job');
  const [volume, setVolume] = useState('1–10');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      completeOnboarding({ targetRole, industry, workMode, goal, volume });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-xl space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === i 
                  ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-glow-primary' 
                  : step > i 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-surface-200 dark:bg-surface-800 text-muted-foreground'
              }`}>
                {step > i ? <Check className="w-4 h-4" /> : i}
              </div>
              {i < 4 && <div className={`w-12 sm:w-20 h-1 rounded-full ${step > i ? 'bg-emerald-500' : 'bg-surface-200 dark:bg-surface-800'}`} />}
            </div>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-card border border-border p-8 rounded-3xl shadow-2xl space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Step 1 of 4</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">What are you targeting?</h2>
              <p className="text-xs text-muted-foreground">Configure your target position criteria to customize your CareerOrbit workspace.</p>
              
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Preferred Work Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Remote', 'Hybrid', 'On-site'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setWorkMode(mode)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          workMode === mode 
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                            : 'bg-surface-50 dark:bg-surface-900 border-border text-muted-foreground'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Step 2 of 4</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">What's your primary goal?</h2>
              <p className="text-xs text-muted-foreground">Select your current job search priority.</p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Get my first job / Graduate placement',
                  'Find a high-growth summer internship',
                  'Switch careers into Software Engineering',
                  'Find a better opportunity / Salary upgrade'
                ].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      goal === g 
                        ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                        : 'bg-surface-50 dark:bg-surface-900 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{g}</span>
                    {goal === g && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Orbit className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Step 3 of 4</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">How many applications are you currently tracking?</h2>
              <p className="text-xs text-muted-foreground">We will pre-configure your dashboard analytics based on your current volume.</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {['0 (Starting fresh)', '1–10 applications', '11–25 applications', '25+ active search'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVolume(v)}
                    className={`p-4 rounded-2xl border text-center text-xs font-semibold transition-all ${
                      volume === v 
                        ? 'bg-primary text-primary-foreground border-primary shadow-glow-primary' 
                        : 'bg-surface-50 dark:bg-surface-900 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-glow-primary animate-bounce">
                <Rocket className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Building Your Workspace</h2>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Configuring your job search pipeline, interview checklists, and analytics metrics for <strong className="text-foreground">{targetRole}</strong>.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-accent"
              >
                Back
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-glow-primary hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <span>{step === 4 ? 'Launch Workspace' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
