import mongoose, { model, models, Schema } from 'mongoose';

const RoomSchema = new Schema(
  {
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: [{ type: String }],
    capacity: {
      min: { type: Number, default: 2 },
      max: { type: Number, required: true },
    },
    screenSize: { type: String, default: 'Large' },
    soundSystem: { type: String, default: 'Premium Dolby' },
    features: [{ type: String }],
     categories: {

      type: [String],

      default: ['birthday'],

      validate: {

        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,

        message: 'At least one category is required',

      },

    },
    basePrice: { type: Number, required: true },
    pricePerExtraPerson: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = models.Room || model('Room', RoomSchema);
export default Room;
