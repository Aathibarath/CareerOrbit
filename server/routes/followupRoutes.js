import express from 'express';
import { getFollowUps, createFollowUp, updateFollowUp, generateTemplate } from '../controllers/followupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/', getFollowUps);
router.post('/', createFollowUp);
router.put('/:id', updateFollowUp);
router.post('/generate', generateTemplate);

export default router;
