import Review from "../models/reviewModel.js";
import Hostel from "../models/hostelModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";

const addReview = async (req, res) => {
  try {
    const { id: hostelId } = req.params;
    const { rating, comment } = req.body;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel) throw new ApiError(404, "Hostel not found");

    if (hostel.ownerName.toString() === req.user._id.toString()) {
      throw new ApiError(400, "You are not allowed to perform this operation");
    }
    const review = await Review.create({
      hostel: hostelId,
      reviewer: req.user._id,
      rating,
      comment,
    });

    return res
      .status(200)
      .json(new ApiRes(201, review, "Review added successfully"));
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "You are not allowed to add more than 1 reiew");
    }
  }
};

const getAllReviews = async (req, res) => {
  const { id: hostelId } = req.params;

  const reviews = await Review.find({ hostel: hostelId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, current) => sum + current, 0) / reviews.length
      : 0;

  return res.status(200).json(
    new ApiRes(
      201,
      {
        reviews,
        totalReviews: reviews.length,
        avgRating,
      },
      "Reviews fetched successfully",
    ),
  );
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (review.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to perform this operation");
  }

  await review.deleteOne();

  return res
    .status(200)
    .json(new ApiRes(200, {}, "Review deleted successfully"));
};
