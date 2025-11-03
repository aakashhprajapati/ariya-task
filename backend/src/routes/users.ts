import express from 'express';
import {
  getHRUsers,
  getMyClients,
  getAllUsers,
  getUserProfile,
} from '@/controllers/userController';
import { authenticateToken, requireRole } from '@/middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Client: Get all HR users
router.get('/hrs', requireRole(['client']), getHRUsers);

// HR: Get clients who contacted them
router.get('/my-clients', requireRole(['hr']), getMyClients);

// Admin: Get all users and contacts
router.get('/', requireRole(['admin']), getAllUsers);

// Get current user profile
router.get('/profile', getUserProfile);

export default router;