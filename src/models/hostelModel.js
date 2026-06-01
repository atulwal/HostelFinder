import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Owner",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      city: String,
      Street: String,
      area: String,
      state: String,
      required: true,
    },
    rent: {
      type: Number,
      default: 0,
    },
    contact: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Owner",
    },
    foodAvailability: {
      type: Boolean,
      default: false,
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
