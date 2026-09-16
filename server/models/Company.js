import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  industry: { type: String, default: 'Technology' },
  website: { type: String, default: '' },
  location: { type: String, default: 'Global' },
  companySize: { type: String, enum: ['1-50', '51-200', '201-1000', '1000-5000', '5000+'], default: '201-1000' },
  rating: { type: Number, default: 4.5 },
  logoUrl: { type: String, default: '' },
  notes: { type: String, default: '' },
}, { timestamps: true });

export const Company = mongoose.models.Company || mongoose.model('Company', companySchema);
