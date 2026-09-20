import { initialContacts } from '../services/DemoSeedService.js';
import { Contact } from '../models/Contact.js';

let memoryContacts = [...initialContacts];

export const getContacts = async (req, res) => {
  try {
    if (req.dbConnected && req.user && req.user.id) {
      const dbContacts = await Contact.find({ userId: req.user.id }).sort({ name: 1 });
      return res.json(dbContacts);
    }
    return res.json(memoryContacts);
  } catch (error) {
    return res.json(memoryContacts);
  }
};

export const createContact = async (req, res) => {
  try {
    const payload = {
      userId: req.user ? req.user.id : 'demo-user-123',
      name: req.body.name || 'New Contact',
      role: req.body.role || 'Tech Recruiter',
      company: req.body.company || 'Company',
      email: req.body.email || '',
      phone: req.body.phone || '',
      linkedIn: req.body.linkedIn || '',
      relationship: req.body.relationship || 'Recruiter',
      lastContactDate: req.body.lastContactDate || new Date(),
      nextFollowUpDate: req.body.nextFollowUpDate || null,
      notes: req.body.notes || ''
    };

    if (req.dbConnected && req.user && req.user.id) {
      const created = await Contact.create(payload);
      return res.status(201).json(created);
    }

    const newContact = {
      id: 'cont-' + Date.now(),
      ...payload
    };
    memoryContacts.unshift(newContact);
    return res.status(201).json(newContact);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create contact' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      const updated = await Contact.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (updated) return res.json(updated);
    }

    const index = memoryContacts.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ message: 'Contact not found' });

    memoryContacts[index] = { ...memoryContacts[index], ...req.body };
    return res.json(memoryContacts[index]);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update contact' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      await Contact.findOneAndDelete({ _id: id, userId: req.user.id });
    }
    memoryContacts = memoryContacts.filter(c => c.id !== id);
    return res.json({ message: 'Contact deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
};

