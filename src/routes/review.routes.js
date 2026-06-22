import express from "express"
import {addReview, getAllReviews, deleteReview} from "../controllers/review.controller.js"
import {protect} from "../middlewares/auth.middleware.js"

const router = express.Router;

router.get("/", getAllReviews);
router.post("/", addReview);
router.delete("/:id", deleteReview);

export default router;