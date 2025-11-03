export type UserRole = 'client' | 'hr' | 'admin';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
import { Request } from 'express';
import { Document, ObjectId } from 'mongoose';

export type UserRole = 'client' | 'hr' | 'admin';

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact {
  _id: ObjectId;
  clientId: ObjectId;
  hrId: ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Validation types
export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
  phone?: string;
}

export interface ContactInput {
  hrId: string;
  message: string;
}
export interface IContact {
  _id: string;
  clientId: string;
  hrId: string;
  message: string;
  createdAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}