import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index(
  {
    hostel: 1,
    reviewer: 1,
  },
  {
    unique: true,
  },
);
const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
