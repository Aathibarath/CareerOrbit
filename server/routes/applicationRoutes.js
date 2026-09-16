import express from 'express';
import { 
  getApplications, 
  getApplicationById, 
  createApplication, 
  updateApplication, 
  updateApplicationStage, 
  deleteApplication 
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.patch('/:id/status', updateApplicationStage);
router.delete('/:id', deleteApplication);

export default router;
