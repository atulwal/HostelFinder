import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import Hostel from "../models/hostelModel.js"

const createHostel = async (req, res) => {
    const {name, owner, description, location, rent, contact} = req.body;
    
}

/*
const Hostel = require("../models/Hostel");

exports.createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create({ ...req.body, owner: req.user._id });
    res.status(201).json(hostel);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().populate("owner", "name email");
    res.json(hostels);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).populate("owner", "name email");
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });
    res.json(hostel);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });
    if (hostel.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your hostel!" });

    const updated = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });
    if (hostel.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your hostel!" });

    await hostel.deleteOne();
    res.json({ message: "Hostel deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
*/