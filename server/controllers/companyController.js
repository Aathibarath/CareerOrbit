import { initialCompanies } from '../services/DemoSeedService.js';
import { Company } from '../models/Company.js';

let memoryCompanies = [...initialCompanies];

export const getCompanies = async (req, res) => {
  try {
    if (req.dbConnected && req.user && req.user.id) {
      const dbCompanies = await Company.find({ userId: req.user.id }).sort({ name: 1 });
      return res.json(dbCompanies);
    }
    return res.json(memoryCompanies);
  } catch (error) {
    return res.json(memoryCompanies);
  }
};

export const createCompany = async (req, res) => {
  try {
    const payload = {
      userId: req.user ? req.user.id : 'demo-user-123',
      name: req.body.name || 'New Company',
      industry: req.body.industry || 'Technology',
      website: req.body.website || '',
      location: req.body.location || 'Remote',
      companySize: req.body.companySize || '201-1000',
      rating: Number(req.body.rating) || 4.5,
      notes: req.body.notes || ''
    };

    if (req.dbConnected && req.user && req.user.id) {
      const created = await Company.create(payload);
      return res.status(201).json(created);
    }

    const newCompany = {
      id: 'comp-' + Date.now(),
      ...payload,
      createdAt: new Date()
    };
    memoryCompanies.unshift(newCompany);
    return res.status(201).json(newCompany);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create company' });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      const updated = await Company.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (updated) return res.json(updated);
    }

    const index = memoryCompanies.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ message: 'Company not found' });
    
    memoryCompanies[index] = { ...memoryCompanies[index], ...req.body };
    return res.json(memoryCompanies[index]);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update company' });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      await Company.findOneAndDelete({ _id: id, userId: req.user.id });
    }
    memoryCompanies = memoryCompanies.filter(c => c.id !== id);
    return res.json({ message: 'Company deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete company' });
  }
};

