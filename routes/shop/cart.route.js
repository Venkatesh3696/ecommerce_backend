import { Router } from "express";
import {
  addToCart,
  deleteCartItems,
  fetchCartItems,
  updateCartItems,
} from "../../controllers/shop/cart.controller.js";

const router = Router();

router.post("/", addToCart);
router.get("/", fetchCartItems);
router.put("/", updateCartItems);
router.delete("/", deleteCartItems);

export default router;
