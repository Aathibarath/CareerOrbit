import express from 'express';
import { getInterviews, createInterview, updateInterview, toggleChecklistItem, deleteInterview } from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/', getInterviews);
router.post('/', createInterview);
router.put('/:id', updateInterview);
router.patch('/:id/checklist/:itemIndex', toggleChecklistItem);
router.delete('/:id', deleteInterview);

export default router;
