import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      area: { type: String },
      state: { type: String, required: true },
    },
    image: {
      type: [String],
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    roomType: {
      type: String,
      enum: ["male", "female", "co-ed"],
    },
  },
  {
    timestamps: true,
  },
);

const hostelModel = mongoose.model("Hostel", hostelSchema);
export default hostelModel;
