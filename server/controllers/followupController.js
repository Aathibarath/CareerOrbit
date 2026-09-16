import { initialFollowUps } from '../services/DemoSeedService.js';
import { AIService } from '../services/AIService.js';

let memoryFollowUps = [...initialFollowUps];

export const getFollowUps = async (req, res) => {
  res.json(memoryFollowUps);
};

export const createFollowUp = async (req, res) => {
  const newFollowUp = {
    id: 'fol-' + Date.now(),
    applicationId: req.body.applicationId || 'app-1',
    company: req.body.company || 'Company',
    jobTitle: req.body.jobTitle || 'Software Engineer',
    recruiterEmail: req.body.recruiterEmail || '',
    dueDate: req.body.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'Pending',
    templateType: req.body.templateType || 'Recruiter Follow-up',
    messageText: req.body.messageText || `Hi,\n\nI am following up on my application for the ${req.body.jobTitle || 'Software Engineer'} role at ${req.body.company || 'your company'}.\n\nBest regards,\nAlex Morgan`
  };
  memoryFollowUps.unshift(newFollowUp);
  res.status(201).json(newFollowUp);
};

export const updateFollowUp = async (req, res) => {
  const { id } = req.params;
  const index = memoryFollowUps.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).json({ message: 'Follow-up not found' });

  memoryFollowUps[index] = { ...memoryFollowUps[index], ...req.body };
  res.json(memoryFollowUps[index]);
};

export const generateTemplate = async (req, res) => {
  const template = await AIService.generateFollowUp(req.body);
  res.json(template);
};
