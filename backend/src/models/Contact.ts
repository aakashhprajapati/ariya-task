import mongoose, { Schema } from 'mongoose';
import { IContact } from '@/types';

const contactSchema = new Schema<IContact>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Client ID is required'],
    },
    hrId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'HR ID is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Compound index to ensure unique client-HR contacts (optional)
contactSchema.index({ clientId: 1, hrId: 1 });

// Index for better query performance
contactSchema.index({ hrId: 1, createdAt: -1 });
contactSchema.index({ clientId: 1 });

export default mongoose.model<IContact>('Contact', contactSchema);