import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// POST /api/auth/register  — create account
router.post("/register", register);

// POST /api/auth/login     — log in
router.post("/login", login);

// GET /api/auth/me         — get my profile (needs token)
router.get("/me", protect, getMe);

export default router;
