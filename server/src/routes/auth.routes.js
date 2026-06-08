import { Router } from "express";
import { register, login, getMe, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// POST /api/auth/register  — create account
router.post("/register", register);

// POST /api/auth/login     — log in
router.post("/login", login);

// POST /api/auth/forgot-password  — request reset link
router.post("/forgot-password", forgotPassword);

// POST /api/auth/reset-password   — reset password with token
router.post("/reset-password", resetPassword);

// GET /api/auth/me         — get my profile (needs token)
router.get("/me", protect, getMe);

export default router;
