import { initialContacts } from '../services/DemoSeedService.js';

let memoryContacts = [...initialContacts];

export const getContacts = async (req, res) => {
  res.json(memoryContacts);
};

export const createContact = async (req, res) => {
  const newContact = {
    id: 'cont-' + Date.now(),
    name: req.body.name,
    role: req.body.role || 'Tech Recruiter',
    company: req.body.company || 'Company',
    email: req.body.email || '',
    phone: req.body.phone || '',
    linkedIn: req.body.linkedIn || '',
    relationship: req.body.relationship || 'Recruiter',
    lastContactDate: new Date(),
    nextFollowUpDate: req.body.nextFollowUpDate || null,
    notes: req.body.notes || ''
  };
  memoryContacts.unshift(newContact);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const index = memoryContacts.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Contact not found' });

  memoryContacts[index] = { ...memoryContacts[index], ...req.body };
  res.json(memoryContacts[index]);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  memoryContacts = memoryContacts.filter(c => c.id !== id);
  res.json({ message: 'Contact deleted' });
};
