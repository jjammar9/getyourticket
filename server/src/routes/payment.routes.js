import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createPaymentIntent } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-payment-intent", protect, createPaymentIntent);

export default router;
