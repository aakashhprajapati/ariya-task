import { Response } from 'express';
import User from '@/models/User';
import Contact from '@/models/Contact';
import { AuthRequest, ApiResponse } from '@/types';

export const getHRUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const hrUsers = await User.find({ role: 'hr' })
      .select('-password')
      .sort({ name: 1 });

    const response: ApiResponse = {
      success: true,
      message: 'HR users retrieved successfully',
      data: hrUsers,
    };

    res.json(response);
  } catch (error: any) {
    console.error('Get HR users error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error retrieving HR users',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};

export const getMyClients = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const hrId = req.user!.userId;

    const contacts = await Contact.find({ hrId })
      .populate('clientId', 'name email company phone')
      .sort({ createdAt: -1 });

    const clients = contacts.map(contact => ({
      ...(contact.clientId as any).toObject(),
      contactId: contact._id,
      contactMessage: contact.message,
      contactDate: contact.createdAt,
    }));

    const response: ApiResponse = {
      success: true,
      message: 'Clients retrieved successfully',
      data: clients,
    };

    res.json(response);
  } catch (error: any) {
    console.error('Get my clients error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error retrieving clients',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    const contacts = await Contact.find()
      .populate('clientId', 'name email role')
      .populate('hrId', 'name email role')
      .sort({ createdAt: -1 });

    const response: ApiResponse = {
      success: true,
      message: 'All data retrieved successfully',
      data: {
        users,
        contacts: contacts.map(contact => ({
          id: contact._id,
          client: contact.clientId,
          hr: contact.hrId,
          message: contact.message,
          createdAt: contact.createdAt,
        })),
      },
    };

    res.json(response);
  } catch (error: any) {
    console.error('Get all users error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error retrieving all data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'User not found',
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'User profile retrieved successfully',
      data: { user },
    };

    res.json(response);
  } catch (error: any) {
    console.error('Get user profile error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error retrieving user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};