import mongoose, { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    avatar: { type: String },
    authProvider: { type: String, enum: ['google', 'apple', 'phone'], required: true },
    role: { type: String, enum: ['customer', 'admin', 'staff'], default: 'customer' },
    savedPackages: [{ type: Schema.Types.ObjectId, ref: 'Package' }],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);
export default User;
