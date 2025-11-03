import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  clientId: mongoose.Types.ObjectId;
  hrId: mongoose.Types.ObjectId;
  message: string;
  contactedAt: Date;
}

const contactSchema = new Schema<IContact>({
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  contactedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IContact>('Contact', contactSchema);