import express from 'express';
import { getInsights, generateFollowUp, analyzeResumeMatch, askCopilot } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/insights', getInsights);
router.post('/followup', generateFollowUp);
router.post('/resume-match', analyzeResumeMatch);
router.post('/copilot', askCopilot);

export default router;
