import express from 'express';
import { signup, login, getMe } from '@/controllers/authController';
import { authenticateToken } from '@/middleware/auth';
import { validate } from '@/middleware/validation';
import { loginSchema, signupSchema } from '@/validation/schemas';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', authenticateToken, getMe);

export default router;