import mongoose from 'mongoose';

const followUpSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  applicationId: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  recruiterEmail: { type: String, default: '' },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Sent', 'Skipped'], default: 'Pending' },
  templateType: { type: String, enum: ['Recruiter Follow-up', 'Post-Interview Thank You', 'Application Status Check', 'Network Outreach'], default: 'Recruiter Follow-up' },
  messageText: { type: String, default: '' },
  sentAt: { type: Date }
}, { timestamps: true });

export const FollowUp = mongoose.models.FollowUp || mongoose.model('FollowUp', followUpSchema);
