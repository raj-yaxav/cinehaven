import { Schema, model, models } from 'mongoose';

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['contact', 'booking', 'lead', 'system'],
      default: 'system',
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    href: String,
    read: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default models.Notification || model('Notification', NotificationSchema);
