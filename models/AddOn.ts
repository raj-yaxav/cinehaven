import mongoose, { model, models, Schema } from 'mongoose';

const AddOnSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['decor', 'food', 'cake', 'photo', 'effects', 'entertainment', 'personalization'], required: true },
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true },
    options: [
      {
        name: { type: String },
        price: { type: Number },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AddOn = models.AddOn || model('AddOn', AddOnSchema);
export default AddOn;
