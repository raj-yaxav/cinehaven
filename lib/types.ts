import type { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  authProvider: 'google' | 'apple' | 'phone';
  role: 'customer' | 'admin' | 'staff';
  savedPackages: ObjectId[];
  bookings: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoom {
  _id?: ObjectId;
  location: ObjectId;
  name: string;
  slug: string;
  description: string;
  images: string[];
  capacity: { min: number; max: number };
  screenSize: string;
  soundSystem: string;
  features: string[];
  basePrice: number;
  isActive: boolean;
  rating: number;
  reviewCount: number;
}

export interface IBooking {
  _id?: ObjectId;
  bookingId: string;
  user: ObjectId;
  location: ObjectId;
  room: ObjectId;
  package: ObjectId;
  date: Date;
  timeSlot: { start: string; end: string };
  guests: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  createdAt: Date;
  updatedAt: Date;
}
