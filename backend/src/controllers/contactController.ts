import { Response } from 'express';
import mongoose from 'mongoose';
import Contact from '@/models/Contact';
import User from '@/models/User';
import { AuthRequest, ApiResponse, ContactInput } from '@/types';

export const createContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { hrId, message }: ContactInput = req.body;
    const clientId = req.user!.userId;

    // Validate HR ID format
    if (!mongoose.Types.ObjectId.isValid(hrId)) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid HR user ID',
      };
      res.status(400).json(response);
      return;
    }

    // Check if HR user exists and is actually an HR
    const hrUser = await User.findOne({ 
      _id: hrId, 
      role: 'hr' 
    });
    
    if (!hrUser) {
      const response: ApiResponse = {
        success: false,
        message: 'HR user not found',
      };
      res.status(404).json(response);
      return;
    }

    // Check if contact already exists (optional: prevent duplicate contacts)
    const existingContact = await Contact.findOne({ clientId, hrId });
    if (existingContact) {
      const response: ApiResponse = {
        success: false,
        message: 'You have already contacted this HR professional',
      };
      res.status(409).json(response);
      return;
    }

    // Create new contact
    const contact = new Contact({
      clientId,
      hrId,
      message: message.trim(),
    });

    await contact.save();

    // Populate the contact for response
    await contact.populate('clientId', 'name email');
    await contact.populate('hrId', 'name email');

    const response: ApiResponse = {
      success: true,
      message: 'Contact request sent successfully',
      data: {
        contact: {
          id: contact._id,
          client: contact.clientId,
          hr: contact.hrId,
          message: contact.message,
          createdAt: contact.createdAt,
        },
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Create contact error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error creating contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};

export const getMyContacts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const userRole = req.user!.role;

    let contacts;
    
    if (userRole === 'client') {
      // Clients see contacts they've made
      contacts = await Contact.find({ clientId: userId })
        .populate('hrId', 'name email company phone')
        .sort({ createdAt: -1 });
    } else if (userRole === 'hr') {
      // HRs see contacts made to them
      contacts = await Contact.find({ hrId: userId })
        .populate('clientId', 'name email company phone')
        .sort({ createdAt: -1 });
    } else {
      // Admins can see all contacts (handled in userController)
      const response: ApiResponse = {
        success: false,
        message: 'Use admin endpoint to view all contacts',
      };
      res.status(400).json(response);
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts,
    };

    res.json(response);
  } catch (error: any) {
    console.error('Get my contacts error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error retrieving contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};