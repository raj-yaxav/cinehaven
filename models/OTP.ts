import mongoose, { Schema, model, models } from 'mongoose';

const OTPSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    bookingData: { type: Schema.Types.Mixed, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    resendCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = models.OTP || model('OTP', OTPSchema);
export default OTP;