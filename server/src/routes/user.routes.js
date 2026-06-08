import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  getWishlistLists,
  getWishlistList,
  createWishlistList,
  deleteWishlistList,
  addToWishlistList,
  removeFromWishlistList,
  getBookings,
  createBooking,
  cancelBooking,
  createReview,
} from "../controllers/user.controller.js";

const router = Router();

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Wishlist Lists
router.get("/wishlist-lists", protect, getWishlistLists);
router.get("/wishlist-lists/:id", protect, getWishlistList);
router.post("/wishlist-lists", protect, createWishlistList);
router.delete("/wishlist-lists/:id", protect, deleteWishlistList);

// Wishlist Items
router.post("/wishlist-lists/:listId/items", protect, addToWishlistList);
router.delete("/wishlist-lists/:listId/items/:listingId", protect, removeFromWishlistList);

// Bookings
router.get("/bookings", protect, getBookings);
router.post("/bookings", protect, createBooking);
router.put("/bookings/:id/cancel", protect, cancelBooking);

// Reviews
router.post("/reviews", protect, createReview);

export default router;
