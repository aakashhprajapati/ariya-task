import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiResponse } from '@/types';

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const response: ApiResponse = {
          success: false,
          message: 'Validation failed',
          error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        };
        res.status(400).json(response);
        return;
      }
      
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
      };
      res.status(400).json(response);
    }
  };
};

export const handleAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};