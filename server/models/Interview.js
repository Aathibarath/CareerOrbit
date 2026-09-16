import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const interviewSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  applicationId: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  interviewType: { 
    type: String, 
    enum: ['HR Screening', 'Technical Round', 'Coding Assessment', 'Behavioral', 'System Design', 'Managerial', 'Final Round', 'Other'],
    default: 'Technical Round' 
  },
  date: { type: Date, required: true },
  time: { type: String, default: '10:00 AM' },
  meetingLink: { type: String, default: '' },
  interviewerName: { type: String, default: '' },
  roundNumber: { type: Number, default: 1 },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'], default: 'Scheduled' },
  prepChecklist: [checklistItemSchema],
  questionsToAsk: [{ type: String }],
  notes: { type: String, default: '' },
  reflection: { type: String, default: '' }
}, { timestamps: true });

export const Interview = mongoose.models.Interview || mongoose.model('Interview', interviewSchema);
