import { initialCompanies } from '../services/DemoSeedService.js';

let memoryCompanies = [...initialCompanies];

export const getCompanies = async (req, res) => {
  res.json(memoryCompanies);
};

export const createCompany = async (req, res) => {
  const newCompany = {
    id: 'comp-' + Date.now(),
    name: req.body.name,
    industry: req.body.industry || 'Technology',
    website: req.body.website || '',
    location: req.body.location || 'Remote',
    companySize: req.body.companySize || '201-1000',
    rating: req.body.rating || 4.5,
    notes: req.body.notes || '',
    createdAt: new Date()
  };
  memoryCompanies.unshift(newCompany);
  res.status(201).json(newCompany);
};

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const index = memoryCompanies.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Company not found' });
  
  memoryCompanies[index] = { ...memoryCompanies[index], ...req.body };
  res.json(memoryCompanies[index]);
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;
  memoryCompanies = memoryCompanies.filter(c => c.id !== id);
  res.json({ message: 'Company deleted' });
};
