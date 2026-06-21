import express from "express";
import { protect, ownerOnly } from "../middleware/authMiddleware.js";
import {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
} from "../controllers/hostel.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getAllHostels);
router.get("/home", protect, ownerOnly);
router.get("/:id", getHostelById);

router.post(
  "/",
  protect,
  ownerOnly,
  upload.array("images", 5),
  createHostel,
);

router.put(
  "/:id",
  protect,
  ownerOnly,
  upload.array("images", 5),
  updateHostel,
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteHostel
)

export default router;
