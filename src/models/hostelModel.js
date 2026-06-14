import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
      required: true
    },
    description: {
      type: String,
    },
    location: {
      city: String,
      Street: String,
      area: String,
      state: String,
      required: true,
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
      type: mongoose.Schema.Type.ObjectId,
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
