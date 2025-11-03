export type UserRole = 'client' | 'hr' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Contact {
  id: string;
  clientId: string;
  hrId: string;
  message: string;
  createdAt: string;
}