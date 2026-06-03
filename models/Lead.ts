import mongoose, { Schema, model, models } from 'mongoose';

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    occasion: { type: String },
    location: { type: String },
    room: { type: String },
    package: { type: String },
    date: { type: Date },
    guests: { type: Number },
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'lost'],
      default: 'new',
    },
    source: {
      type: String,
      enum: ['booking_wizard', 'contact_page', 'ai_planner', 'whatsapp', 'phone'],
      default: 'booking_wizard',
    },
    notes: { type: String },
    assignedTo: { type: String },
    lastContactedAt: { type: Date },
  },
  { timestamps: true }
);

const Lead = models.Lead || model('Lead', LeadSchema);
export default Lead;