import { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    occasion: String,

    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },

    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },

    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },

    date: Date,

    guests: Number,

    specialRequests: String,
    source: {
      type: String,
      default: "direct",
    },
    notes: String,

    otp: String,

    otpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "converted", "lost"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Lead || model("Lead", LeadSchema);
