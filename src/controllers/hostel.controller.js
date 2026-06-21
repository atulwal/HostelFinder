import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Hostel from "../models/hostelModel.js";

const createHostel = async (req, res) => {
  const { name, ownerName, description, location, rent, contact } = req.body;

  if (!name || !owner || !location || !rent || !contant) {
    throw new ApiError(400, "All field sare required");
  }

  let imageUrls = [];

  if(req.files && res.files.length > 0){
    const uploadPromises = req.files.map(file =>
      uploadToCloudinary(file.buffer)
    )
    imageUrls = await Promise.all(uploadPromises)
  }

  const hostel = await Hostel.create({
    name,
    ownerName,
    description,
    location,
    rent,
    image: imageUrls,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiRes(200, hostel, "Hostel listed successfully"));
};

const getAllHostels = async (req, res) => {
  const { location, rent } = req.query; // URL params (/:id) → for identifying ONE specific resource → /hostels/64abc123 Request body → for sending data to create/update something Query params → for optional, combinable filters on a GET request

  const filter = {};
  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (minPrice || maxPrice) {
    filter.rent = {};
    if (minPrice) filter.rent.$gte = Number(minPrice);
    if (maxPrice) filter.rent.$lte = Number(maxPrice);
  }

  const hostels = await Hostel.find(filter)
    .populate("ownerName", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiRes(200, hostels, "Hostels fetched successfully"));
};

const getHostelById = async (req, res) => {
  const { id } = req.params;
  const hostel = await Hostel.findById(id).populate("owner", "name email");

  if (!hostel) throw new ApiError(404, "Hostel not found");

  return res
    .status(200)
    .json(new ApiRes(200, hostel, "Hostel fetched successfully"));
};

const updateHostel = async (req, res) => {
  const { id } = req.params;
  const hostel = await Hostel.findById(id).populate("owner", "name email");

  if (!hostel) throw new ApiError(404, "Hostel not found");

  if (hostel.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only update your own hostels");
  }
  const allowedUpdates = {
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
  };
  Object.keys(allowedUpdates).forEach(
    (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key],
  );

  const updatedHostel = await Hostel.findByIdAndUpdate(id, allowedUpdates, {
    new: true,
    runValidators: true,
  });

  return res
    .status(200)
    .json(new ApiRes(200, updatedHostel, "Hostel updated successfully"));
};

const deleteHostel = async (req, res) => {
  const { id } = req.params;
  const hostel = await Hostel.findById(id);
  if (!hostel) {
    throw new ApiError(404, "Hostel not found");
  }

  if (hostel.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only delete your own hostels");
  }

  await hostel.deleteOne();

  return res
  .status(200)
  .json(new ApiRes(200, {}, "Hostel deleted successfully"))
};

export {
  createHostel,
  updateHostel,
  deleteHostel,
  getAllHostels,
  getHostelById
}

/*

*/
