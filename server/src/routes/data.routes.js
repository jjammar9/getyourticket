import { Router } from "express";
import {
  getListings,
  getListingById,
  getCountries,
  getCountryBySlug,
  getCategories,
  getReviews,
  getSiteContent,
  getAllSiteContent,
  subscribeNewsletter,
  getListingAvailability,
} from "../controllers/data.controller.js";

const router = Router();

// Listings
router.get("/listings", getListings);
router.get("/listings/:id", getListingById);
router.get("/listings/:id/availability", getListingAvailability);

// Countries
router.get("/countries", getCountries);
router.get("/countries/:slug", getCountryBySlug);

// Categories
router.get("/categories", getCategories);

// Reviews
router.get("/reviews", getReviews);

// Site Content
router.get("/site-content", getAllSiteContent);
router.get("/site-content/:key", getSiteContent);

// Newsletter
router.post("/newsletter/subscribe", subscribeNewsletter);

export default router;
