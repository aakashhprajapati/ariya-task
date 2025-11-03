import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const signupSchema = z.object({
  body: z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    role: z.enum(['client', 'hr', 'admin'], {
      errorMap: () => ({ message: 'Role must be client, hr, or admin' }),
    }),
    company: z.string().max(100, 'Company name is too long').optional(),
    phone: z.string().regex(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number').optional(),
  }),
});

export const contactSchema = z.object({
  body: z.object({
    hrId: z.string().min(1, 'HR ID is required'),
    message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});