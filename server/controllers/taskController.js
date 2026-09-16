import { initialTasks } from '../services/DemoSeedService.js';

let memoryTasks = [...initialTasks];

export const getTasks = async (req, res) => {
  res.json(memoryTasks);
};

export const createTask = async (req, res) => {
  const newTask = {
    id: 'task-' + Date.now(),
    applicationId: req.body.applicationId || '',
    company: req.body.company || 'General',
    title: req.body.title,
    description: req.body.description || '',
    dueDate: req.body.dueDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: req.body.priority || 'Medium',
    status: req.body.status || 'Todo',
    isOverdue: false
  };
  memoryTasks.unshift(newTask);
  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const index = memoryTasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  memoryTasks[index] = { ...memoryTasks[index], ...req.body };
  res.json(memoryTasks[index]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  memoryTasks = memoryTasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted' });
};
