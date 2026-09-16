import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  applicationId: { type: String, default: '' },
  company: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['Todo', 'In Progress', 'Completed'], default: 'Todo' },
  isOverdue: { type: Boolean, default: false }
}, { timestamps: true });

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
