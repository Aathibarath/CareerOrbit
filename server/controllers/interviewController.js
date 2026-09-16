import { initialInterviews } from '../services/DemoSeedService.js';

let memoryInterviews = [...initialInterviews];

export const getInterviews = async (req, res) => {
  res.json(memoryInterviews);
};

export const createInterview = async (req, res) => {
  const newInterview = {
    id: 'int-' + Date.now(),
    applicationId: req.body.applicationId || 'app-1',
    company: req.body.company || 'NovaTech',
    jobTitle: req.body.jobTitle || 'Software Engineer',
    interviewType: req.body.interviewType || 'Technical Round',
    date: req.body.date || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    time: req.body.time || '10:00 AM',
    meetingLink: req.body.meetingLink || '',
    interviewerName: req.body.interviewerName || '',
    roundNumber: Number(req.body.roundNumber) || 1,
    status: 'Scheduled',
    prepChecklist: [
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
  memoryInterviews.unshift(newInterview);
  res.status(201).json(newInterview);
};

export const updateInterview = async (req, res) => {
  const { id } = req.params;
  const index = memoryInterviews.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Interview not found' });

  memoryInterviews[index] = { ...memoryInterviews[index], ...req.body };
  res.json(memoryInterviews[index]);
};

export const toggleChecklistItem = async (req, res) => {
  const { id, itemIndex } = req.params;
  const interview = memoryInterviews.find(i => i.id === id);
  if (!interview) return res.status(404).json({ message: 'Interview not found' });

  if (interview.prepChecklist[itemIndex]) {
    interview.prepChecklist[itemIndex].completed = !interview.prepChecklist[itemIndex].completed;
  }
  res.json(interview);
};

export const deleteInterview = async (req, res) => {
  const { id } = req.params;
  memoryInterviews = memoryInterviews.filter(i => i.id !== id);
  res.json({ message: 'Interview cancelled/deleted' });
};
