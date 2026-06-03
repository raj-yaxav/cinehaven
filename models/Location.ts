import mongoose, { model, models, Schema } from 'mongoose';

const LocationSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    images: [{ type: String }],
    description: { type: String },
    amenities: [{ type: String }],
    isActive: { type: Boolean, default: true },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  },
  { timestamps: true }
);

const Location = models.Location || model('Location', LocationSchema);
export default Location;
