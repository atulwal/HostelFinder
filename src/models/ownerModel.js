import mongoose from "mongoose";

const ownerModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contact: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ownerModel = mongoose.model("Owner", ownerSchema);
export default ownerModel;
