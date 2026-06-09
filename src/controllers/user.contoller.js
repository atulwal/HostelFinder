import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { User } from "../models/userModel.js";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id)
    const accessToken = user.generateAcccessToken();
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})
    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
}

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if ([name, email, password, role].some((field) => field?.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const existedUser = await User.findOne({ email });
  if (existedUser) throw new ApiError(409, "User already exists");
  
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  
  const createdUser = await User.findByiD(email).select(
    "-password -refreshToken"
  );
  if(!createdUser) throw new ApiError(500, "Something went wrong while registering the user");
  
  return res.status(201).json(
    new ApiRes(200, createdUser, "User registered successfully")
  )
};

const loginUser = async (req, res) => {
  const {email, password} = req.body
  if(!email){
    throw new ApiError(400, " email required");
  }

  const user = await User.findOne({email})
  if(!user) throw new ApiError(404, "User does not exist");
  
  const isPasswordValid = await bcrypt.compare();
  if(!isPasswordVlaid) throw new ApiError(404, "Invalid user credentials");

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiRes(
      200,
      {
        user: loggedInUser, accessToken,
        refreshToken
      },
      "User logged in successfully"
    )
  )
}

export { registerUser, loginUser };


