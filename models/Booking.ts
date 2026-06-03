import mongoose, { model, models, Schema } from 'mongoose';

const BookingSchema = new Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lead: { type: Schema.Types.ObjectId, ref: 'Lead' },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    date: { type: Date, required: true },
    timeSlot: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    availabilitySlot: { type: Schema.Types.ObjectId, ref: 'AvailabilitySlot' },
    guests: { type: Number, required: true },
    addOns: [
      {
        addon: { type: Schema.Types.ObjectId, ref: 'AddOn' },
        quantity: { type: Number, default: 1 },
        options: { type: Schema.Types.Mixed },
      },
    ],
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    bookingStatus: {
      type: String,
      enum: ['pending_otp', 'confirmed', 'cancelled', 'completed', 'no_show'],
      default: 'pending_otp',
    },
    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    specialRequests: { type: String },
    splitPayment: {
      enabled: { type: Boolean, default: false },
      link: { type: String },
      participants: [
        {
          name: { type: String },
          amount: { type: Number },
          paid: { type: Boolean, default: false },
        },
      ],
    },
    emailSent: { type: Boolean, default: false },
    emailSentAt: { type: Date },
  },
  { timestamps: true }
);

const Booking = models.Booking || model('Booking', BookingSchema);
export default Booking;
