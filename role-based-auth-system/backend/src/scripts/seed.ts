import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = [
  {
    email: 'client@demo.com',
    password: 'demo123',
    role: 'client' as const,
    name: 'Demo Client',
    company: 'Client Corp',
    phone: '+1234567890'
  },
  {
    email: 'hr@demo.com',
    password: 'demo123',
    role: 'hr' as const,
    name: 'Demo HR',
    company: 'HR Solutions Inc',
    phone: '+1234567891'
  },
  {
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin' as const,
    name: 'Super Admin',
    company: 'Admin Systems',
    phone: '+1234567892'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create users with hashed passwords
    for (const userData of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      await User.create({
        ...userData,
        password: hashedPassword
      });
      console.log(`Created user: ${userData.email}`);
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();