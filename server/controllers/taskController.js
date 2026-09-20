import { initialTasks } from '../services/DemoSeedService.js';
import { Task } from '../models/Task.js';

let memoryTasks = [...initialTasks];

export const getTasks = async (req, res) => {
  try {
    if (req.dbConnected && req.user && req.user.id) {
      const dbTasks = await Task.find({ userId: req.user.id }).sort({ dueDate: 1 });
      return res.json(dbTasks);
    }
    return res.json(memoryTasks);
  } catch (error) {
    return res.json(memoryTasks);
  }
};

export const createTask = async (req, res) => {
  try {
    const payload = {
      userId: req.user ? req.user.id : 'demo-user-123',
      applicationId: req.body.applicationId || '',
      company: req.body.company || 'General',
      title: req.body.title || 'New Task',
      description: req.body.description || '',
      dueDate: req.body.dueDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: req.body.priority || 'Medium',
      status: req.body.status || 'Todo',
      isOverdue: false
    };

    if (req.dbConnected && req.user && req.user.id) {
      const created = await Task.create(payload);
      return res.status(201).json(created);
    }

    const newTask = {
      id: 'task-' + Date.now(),
      ...payload
    };
    memoryTasks.unshift(newTask);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      const updated = await Task.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (updated) return res.json(updated);
    }

    const index = memoryTasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    memoryTasks[index] = { ...memoryTasks[index], ...req.body };
    return res.json(memoryTasks[index]);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.dbConnected && req.user && req.user.id) {
      await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    }
    memoryTasks = memoryTasks.filter(t => t.id !== id);
    return res.json({ message: 'Task deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete task' });
  }
};

