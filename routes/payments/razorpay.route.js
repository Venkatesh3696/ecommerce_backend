import { Router } from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../controllers/payments/order.razorpay.js";

const router = Router();

router.post("/", createRazorpayOrder);
router.post("/verify", verifyRazorpayPayment);

export default router;
