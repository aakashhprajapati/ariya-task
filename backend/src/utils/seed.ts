import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/config/database';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async (): Promise<void> => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create demo users
    const demoUsers = [
      {
        email: 'client@demo.com',
        password: await bcrypt.hash('password123', 12),
        name: 'John Client',
        role: 'client' as const,
        company: 'Client Corp',
        phone: '+1234567890',
      },
      {
        email: 'hr@demo.com',
        password: await bcrypt.hash('password123', 12),
        name: 'Sarah HR',
        role: 'hr' as const,
        company: 'HR Solutions Inc',
        phone: '+1987654321',
      },
      {
        email: 'admin@demo.com',
        password: await bcrypt.hash('password123', 12),
        name: 'Admin User',
        role: 'admin' as const,
        company: 'System Admin',
        phone: '+1122334455',
      },
      {
        email: 'client2@demo.com',
        password: await bcrypt.hash('password123', 12),
        name: 'Jane Doe',
        role: 'client' as const,
        company: 'Doe Enterprises',
        phone: '+1555666777',
      },
      {
        email: 'hr2@demo.com',
        password: await bcrypt.hash('password123', 12),
        name: 'Mike Johnson',
        role: 'hr' as const,
        company: 'Talent Finders LLC',
        phone: '+1444333222',
      },
    ];

    await User.insertMany(demoUsers);

    console.log('Demo users created successfully!');
    console.log('\nDemo Credentials:');
    console.log('Client: client@demo.com / password123');
    console.log('HR: hr@demo.com / password123');
    console.log('Admin: admin@demo.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();