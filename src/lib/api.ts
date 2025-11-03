import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// Users API
export const usersAPI = {
  getHRUsers: () => api.get('/users/hr'),
  getMyContacts: () => api.get('/users/my-contacts'),
  getAllUsers: () => api.get('/users/all'),
};

// Contact API
export const contactAPI = {
  contactHR: (data: { hrId: string; message: string }) => 
    api.post('/contacts', data),
};