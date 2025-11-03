import { Response } from 'express';
import User from '../models/User';
import Contact from '../models/Contact';
import { AuthRequest } from '../middleware/auth';

export const getHRUsers = async (req: AuthRequest, res: Response) => {
  try {
    const hrUsers = await User.find({ role: 'hr' }).select('-password');
    res.json(hrUsers);
  } catch (error) {
    console.error('Get HR users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyContacts = async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await Contact.find({ hrId: req.user?.userId })
      .populate('clientId', 'name email company phone')
      .sort({ contactedAt: -1 });
    
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    const contacts = await Contact.find()
      .populate('clientId', 'name email')
      .populate('hrId', 'name email');
    
    res.json({ users, contacts });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const contactHR = async (req: AuthRequest, res: Response) => {
  try {
    const { hrId, message } = req.body;
    
    const contact = new Contact({
      clientId: req.user?.userId,
      hrId,
      message: message || `Client wants to connect with you`
    });

    await contact.save();
    
    // Populate the response
    await contact.populate('hrId', 'name email');
    
    res.status(201).json({ 
      message: 'Contact request sent successfully',
      contact 
    });
  } catch (error) {
    console.error('Contact HR error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};