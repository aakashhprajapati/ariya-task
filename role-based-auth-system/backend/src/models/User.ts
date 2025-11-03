import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'client' | 'hr' | 'admin';
  name: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'hr', 'admin'], required: true },
  name: { type: String, required: true },
  company: String,
  phone: String
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);