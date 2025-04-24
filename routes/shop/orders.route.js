import { Router } from "express";
import {
  createNewOrder,
  fetchAllOrders,
  getOrderDetails,
  updateShoppingOrder,
} from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/", createNewOrder);
router.get("/", fetchAllOrders);
router.get("/:orderid", getOrderDetails);
router.put("/:orderid", updateShoppingOrder);

export default router;
