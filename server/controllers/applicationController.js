import { initialApplications } from '../services/DemoSeedService.js';
import { Application } from '../models/Application.js';

// Global state in-memory cache for ultra-responsive local execution
let memoryApplications = [...initialApplications];

export const getApplications = async (req, res) => {
  try {
    if (req.dbConnected) {
      const apps = await Application.find({ userId: req.user.id }).sort({ updatedAt: -1 });
      if (apps.length > 0) return res.json(apps);
    }
    return res.json(memoryApplications);
  } catch (error) {
    return res.json(memoryApplications);
  }
};

export const getApplicationById = async (req, res) => {
  const { id } = req.params;
  const app = memoryApplications.find(a => a.id === id || a._id?.toString() === id);
  if (!app) {
    return res.status(404).json({ message: 'Application not found' });
  }
  return res.json(app);
};

export const createApplication = async (req, res) => {
  const newApp = {
    id: 'app-' + Date.now(),
    userId: req.user.id,
    company: req.body.company || 'New Company',
    jobTitle: req.body.jobTitle || 'Software Engineer',
    jobUrl: req.body.jobUrl || '',
    location: req.body.location || 'Remote',
    workMode: req.body.workMode || 'Remote',
    employmentType: req.body.employmentType || 'Full-Time',
    salaryMin: Number(req.body.salaryMin) || 0,
    salaryMax: Number(req.body.salaryMax) || 0,
    currency: req.body.currency || 'USD',
    applicationDate: req.body.applicationDate || new Date(),
    deadline: req.body.deadline || null,
    stage: req.body.stage || 'Applied',
    priority: req.body.priority || 'Medium',
    source: req.body.source || 'LinkedIn',
    recruiterName: req.body.recruiterName || '',
    recruiterEmail: req.body.recruiterEmail || '',
    recruiterLinkedIn: req.body.recruiterLinkedIn || '',
    jobDescription: req.body.jobDescription || '',
    notes: req.body.notes || '',
    resumeUsed: req.body.resumeUsed || 'Software Engineer Resume.pdf',
    coverLetterUsed: req.body.coverLetterUsed || 'Standard Cover Letter.pdf',
    tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? req.body.tags.split(',') : ['New']),
    isFavorite: Boolean(req.body.isFavorite),
    isArchived: false,
    timeline: [
      { id: 't-' + Date.now(), title: 'Application Created', description: `Created application for ${req.body.jobTitle} at ${req.body.company}`, type: 'created', date: new Date() }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  memoryApplications.unshift(newApp);
  return res.status(201).json(newApp);
};

export const updateApplication = async (req, res) => {
  const { id } = req.params;
  const index = memoryApplications.findIndex(a => a.id === id || a._id?.toString() === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }

  const existing = memoryApplications[index];
  const oldStage = existing.stage;
  const updatedStage = req.body.stage || oldStage;

  const updated = {
    ...existing,
    ...req.body,
    updatedAt: new Date()
  };

  if (oldStage !== updatedStage) {
    updated.timeline = [
      ...(updated.timeline || []),
      {
        id: 't-' + Date.now(),
        title: `Stage Moved → ${updatedStage}`,
        description: `Status changed from ${oldStage} to ${updatedStage}`,
        type: 'stage_change',
        date: new Date()
      }
    ];
  }

  memoryApplications[index] = updated;
  return res.json(updated);
};

export const updateApplicationStage = async (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;
  
  const index = memoryApplications.findIndex(a => a.id === id || a._id?.toString() === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }

  const oldStage = memoryApplications[index].stage;
  memoryApplications[index].stage = stage;
  memoryApplications[index].updatedAt = new Date();
  
  if (oldStage !== stage) {
    memoryApplications[index].timeline.unshift({
      id: 't-' + Date.now(),
      title: `Pipeline Stage Updated`,
      description: `Moved from ${oldStage} → ${stage}`,
      type: 'stage_change',
      date: new Date()
    });
  }

  return res.json(memoryApplications[index]);
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  memoryApplications = memoryApplications.filter(a => a.id !== id && a._id?.toString() !== id);
  return res.json({ message: 'Application deleted successfully' });
};
