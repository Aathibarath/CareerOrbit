import mongoose from 'mongoose';

const timelineEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['created', 'stage_change', 'interview_scheduled', 'followup_sent', 'note_added', 'assessment_received'], default: 'stage_change' },
  date: { type: Date, default: Date.now }
});

const applicationSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobUrl: { type: String, default: '' },
  location: { type: String, default: 'Remote' },
  workMode: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], default: 'Remote' },
  employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'], default: 'Full-Time' },
  salaryMin: { type: Number, default: 0 },
  salaryMax: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  applicationDate: { type: Date, default: Date.now },
  deadline: { type: Date },
  stage: { 
    type: String, 
    enum: ['Wishlist', 'Applied', 'Screening', 'Assessment', 'Interview', 'Final Interview', 'Offer', 'Accepted', 'Rejected', 'Withdrawn'], 
    default: 'Applied' 
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  source: { type: String, enum: ['LinkedIn', 'Company Website', 'Indeed', 'Referral', 'College Placement', 'Job Fair', 'Recruiter', 'Other'], default: 'LinkedIn' },
  recruiterName: { type: String, default: '' },
  recruiterEmail: { type: String, default: '' },
  recruiterLinkedIn: { type: String, default: '' },
  jobDescription: { type: String, default: '' },
  notes: { type: String, default: '' },
  resumeUsed: { type: String, default: 'Software Engineer Resume v2' },
  coverLetterUsed: { type: String, default: 'Tailored Tech Cover Letter' },
  tags: [{ type: String }],
  isFavorite: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  timeline: [timelineEventSchema]
}, { timestamps: true });

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
