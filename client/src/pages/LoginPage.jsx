import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Orbit, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  const handleDemoLogin = async () => {
    await login('alex@careerorbit.dev', 'demo123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-glow-primary mx-auto cursor-pointer"
          >
            <Orbit className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back to CareerOrbit</h2>
          <p className="text-xs text-muted-foreground">Sign in to manage your job search workspace</p>
        </div>

        {/* Demo Callout */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Reviewing Portfolio / Fast Evaluation?</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Skip registration and launch into the pre-seeded demo workspace in one click.
          </p>
          <button
            onClick={handleDemoLogin}
            className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <span>Try Demo Account (Instant Access)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="alex@careerorbit.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo Mode: Reset instructions sent to email."); }} className="text-[11px] text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-glow-primary hover:brightness-110 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
