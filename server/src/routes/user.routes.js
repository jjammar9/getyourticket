import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getBookings,
  createBooking,
  cancelBooking,
  createReview,
} from "../controllers/user.controller.js";

const router = Router();

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Wishlist
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, addToWishlist);
router.delete("/wishlist/:listingId", protect, removeFromWishlist);

// Bookings
router.get("/bookings", protect, getBookings);
router.post("/bookings", protect, createBooking);
router.put("/bookings/:id/cancel", protect, cancelBooking);

// Reviews
router.post("/reviews", protect, createReview);

export default router;
