import { model, models, Schema } from 'mongoose';

const AvailabilitySlotSchema = new Schema(
  {
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: Date, required: true },
    dateString: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'blocked', 'booked', 'maintenance'],
      default: 'available',
    },
    priceOverride: { type: Number },
    note: { type: String },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  },
  { timestamps: true }
);

AvailabilitySlotSchema.index({ room: 1, dateString: 1, start: 1, end: 1 }, { unique: true });

export default models.AvailabilitySlot || model('AvailabilitySlot', AvailabilitySlotSchema);
