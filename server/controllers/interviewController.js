import { initialInterviews } from '../services/DemoSeedService.js';
import { Interview } from '../models/Interview.js';

let memoryInterviews = [...initialInterviews];

export const getInterviews = async (req, res) => {
  try {
    if (req.dbConnected && req.user && req.user.id) {
      const dbInterviews = await Interview.find({ userId: req.user.id }).sort({ date: 1 });
      return res.json(dbInterviews);
    }
    return res.json(memoryInterviews);
  } catch (error) {
    return res.json(memoryInterviews);
  }
};

export const createInterview = async (req, res) => {
  try {
    const payload = {
      userId: req.user ? req.user.id : 'demo-user-123',
      applicationId: req.body.applicationId || 'app-1',
      company: req.body.company || 'NovaTech',
      jobTitle: req.body.jobTitle || 'Software Engineer',
      interviewType: req.body.interviewType || 'Technical Round',
      date: req.body.date || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: req.body.time || '10:00 AM',
      meetingLink: req.body.meetingLink || '',
      interviewerName: req.body.interviewerName || '',
      roundNumber: Number(req.body.roundNumber) || 1,
      status: req.body.status || 'Scheduled',
      prepChecklist: req.body.prepChecklist || [
        { text: 'Research company core products & mission', completed: false },
        { text: 'Study job description & technical requirements', completed: false },
        { text: 'Prepare 60-second self-introduction', completed: false },
        { text: 'Prepare STAR method behavioral stories', completed: false },
        { text: 'Formulate questions to ask interviewers', completed: false }
      ],
      questionsToAsk: req.body.questionsToAsk || ['What does a typical day look like for an engineer on this team?'],
      notes: req.body.notes || '',
      reflection: ''
    };

    if (req.dbConnected && req.user && req.user.id) {
      const created = await Interview.create(payload);
      return res.status(201).json(created);
    }

    const newInterview = {
      id: 'int-' + Date.now(),
      ...payload
    };
    memoryInterviews.unshift(newInterview);
    return res.status(201).json(newInterview);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create interview' });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      const updated = await Interview.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (updated) return res.json(updated);
    }

    const index = memoryInterviews.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Interview not found' });

    memoryInterviews[index] = { ...memoryInterviews[index], ...req.body };
    return res.json(memoryInterviews[index]);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update interview' });
  }
};

export const toggleChecklistItem = async (req, res) => {
  try {
    const { id, itemIndex } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      const interview = await Interview.findOne({ _id: id, userId: req.user.id });
      if (interview && interview.prepChecklist[itemIndex]) {
        interview.prepChecklist[itemIndex].completed = !interview.prepChecklist[itemIndex].completed;
        await interview.save();
        return res.json(interview);
      }
    }

    const interview = memoryInterviews.find(i => i.id === id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });

    if (interview.prepChecklist[itemIndex]) {
      interview.prepChecklist[itemIndex].completed = !interview.prepChecklist[itemIndex].completed;
    }
    return res.json(interview);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to toggle checklist item' });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      await Interview.findOneAndDelete({ _id: id, userId: req.user.id });
    }
    memoryInterviews = memoryInterviews.filter(i => i.id !== id);
    return res.json({ message: 'Interview cancelled/deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete interview' });
  }
};

