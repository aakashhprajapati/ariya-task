import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { ApiResponse, LoginInput, SignupInput } from '@/types';

const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role, company, phone }: SignupInput = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        message: 'User already exists with this email',
      };
      res.status(409).json(response);
      return;
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      role,
      company,
      phone,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString(), user.email, user.role);

    const response: ApiResponse = {
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          company: user.company,
          phone: user.phone,
        },
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Signup error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error creating user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginInput = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid credentials',
      };
      res.status(401).json(response);
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid credentials',
      };
      res.status(401).json(response);
      return;
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.email, user.role);

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          company: user.company,
          phone: user.phone,
        },
      },
    };

    res.json(response);
  } catch (error: any) {
    console.error('Login error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // This should be called after authenticateToken middleware
    const userId = (req as any).user?.userId;
    
    const user = await User.findById(userId);
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
      message: 'User retrieved successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          company: user.company,
          phone: user.phone,
        },
      },
    };

    res.json(response);
  } catch (error: any) {
    console.error('Get me error:', error);
    
    const response: ApiResponse = {
      success: false,
      message: 'Error retrieving user data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    };
    res.status(500).json(response);
  }
};