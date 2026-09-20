import { initialApplications } from '../services/DemoSeedService.js';
import { Application } from '../models/Application.js';

// Global state in-memory cache for ultra-responsive local execution
let memoryApplications = [...initialApplications];

export const getApplications = async (req, res) => {
  try {
    if (req.dbConnected && req.user && req.user.id) {
      const apps = await Application.find({ userId: req.user.id }).sort({ updatedAt: -1 });
      return res.json(apps);
    }
    return res.json(memoryApplications);
  } catch (error) {
    console.error('[Applications Get Error]', error);
    return res.json(memoryApplications);
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      const dbApp = await Application.findOne({ _id: id, userId: req.user.id });
      if (dbApp) return res.json(dbApp);
    }
    const app = memoryApplications.find(a => a.id === id || a._id?.toString() === id);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.json(app);
  } catch (error) {
    return res.status(404).json({ message: 'Application not found' });
  }
};

export const createApplication = async (req, res) => {
  try {
    const appPayload = {
      userId: req.user ? req.user.id : 'demo-user-123',
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
        { title: 'Application Created', description: `Created application for ${req.body.jobTitle || 'Role'} at ${req.body.company || 'Company'}`, type: 'created', date: new Date() }
      ]
    };

    if (req.dbConnected && req.user && req.user.id) {
      const createdDbApp = await Application.create(appPayload);
      return res.status(201).json(createdDbApp);
    }

    const newApp = {
      id: 'app-' + Date.now(),
      ...appPayload,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryApplications.unshift(newApp);
    return res.status(201).json(newApp);
  } catch (error) {
    console.error('[Application Create Error]', error);
    return res.status(500).json({ message: 'Failed to create application' });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.dbConnected && req.user && req.user.id) {
      const updatedDbApp = await Application.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (updatedDbApp) return res.json(updatedDbApp);
    }

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
  } catch (error) {
    console.error('[Application Update Error]', error);
    return res.status(500).json({ message: 'Failed to update application' });
  }
};

export const updateApplicationStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;

    if (req.dbConnected && req.user && req.user.id) {
      const existingApp = await Application.findOne({ _id: id, userId: req.user.id });
      if (existingApp) {
        const oldStage = existingApp.stage;
        existingApp.stage = stage;
        if (oldStage !== stage) {
          existingApp.timeline.unshift({
            title: 'Pipeline Stage Updated',
            description: `Moved from ${oldStage} → ${stage}`,
            type: 'stage_change',
            date: new Date()
          });
        }
        await existingApp.save();
        return res.json(existingApp);
      }
    }

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
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update stage' });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      await Application.findOneAndDelete({ _id: id, userId: req.user.id });
    }
    memoryApplications = memoryApplications.filter(a => a.id !== id && a._id?.toString() !== id);
    return res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete application' });
  }
};

