import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  targetRole: { type: String, default: 'Software Engineer' },
  experienceLevel: { type: String, default: 'Entry Level / Fresher' },
  preferredLocation: { type: String, default: 'Remote / Hybrid' },
  industry: { type: String, default: 'Technology' },
  jobSearchGoal: { type: String, default: 'Get my first job' },
  streakDays: { type: Number, default: 7 },
  onboardingCompleted: { type: Boolean, default: true },
  themePreference: { type: String, enum: ['dark', 'light', 'system'], default: 'dark' },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
