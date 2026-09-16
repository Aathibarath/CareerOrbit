import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  role: { type: String, default: 'Tech Recruiter' },
  company: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  relationship: { type: String, enum: ['Recruiter', 'Hiring Manager', 'Referral / Peer', 'Alumni', 'Executive'], default: 'Recruiter' },
  lastContactDate: { type: Date, default: Date.now },
  nextFollowUpDate: { type: Date },
  notes: { type: String, default: '' }
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
