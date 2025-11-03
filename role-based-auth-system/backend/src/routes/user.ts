import express from 'express';
import { 
  getHRUsers, 
  getMyContacts, 
  getAllUsers, 
  contactHR 
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Client routes
router.get('/hr', authenticate, authorize('client', 'admin'), getHRUsers);
router.post('/contact', authenticate, authorize('client'), contactHR);

// HR routes
router.get('/my-contacts', authenticate, authorize('hr'), getMyContacts);

// Admin routes
router.get('/all', authenticate, authorize('admin'), getAllUsers);

export default router;