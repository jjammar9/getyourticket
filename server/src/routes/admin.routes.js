import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getAdminListings,
  createListing,
  updateListing,
  deleteListing,
  getAdminUsers,
  updateUserRole,
  deleteUser,
  updateSiteContent,
} from "../controllers/admin.controller.js";

const router = Router();

// All admin routes require auth + admin role
router.use(protect);
router.use((req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
});

// Listings
router.get("/listings", getAdminListings);
router.post("/listings", createListing);
router.put("/listings/:id", updateListing);
router.delete("/listings/:id", deleteListing);

// Users
router.get("/users", getAdminUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

// Site Content
router.put("/site-content/:key", updateSiteContent);

export default router;
