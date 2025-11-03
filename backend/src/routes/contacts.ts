import express from 'express';
import { createContact, getMyContacts } from '@/controllers/contactController';
import { authenticateToken, requireRole } from '@/middleware/auth';
import { validate } from '@/middleware/validation';
import { contactSchema } from '@/validation/schemas';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Client: Contact HR
router.post('/', requireRole(['client']), validate(contactSchema), createContact);

// Get contacts for current user (client or hr)
router.get('/my-contacts', getMyContacts);

export default router;