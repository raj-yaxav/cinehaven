import mongoose, { model, models, Schema } from 'mongoose';

const PackageSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tier: { type: String, enum: ['silver', 'gold', 'platinum', 'diamond'], required: true },
    description: { type: String },
    features: [{ type: String }],
    includedAddons: [{ type: Schema.Types.ObjectId, ref: 'AddOn' }],
    priceModifier: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    image: { type: String },
  },
  { timestamps: true }
);

const Package = models.Package || model('Package', PackageSchema);
export default Package;
