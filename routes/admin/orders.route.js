import { Router } from "express";
import {
  fetchAllOrdersByAdmin,
  getOrderDetailsForAdmin,
} from "../../controllers/admin/orders.controller.js";

const router = Router();

router.get("/", fetchAllOrdersByAdmin);
router.get("/:orderid", getOrderDetailsForAdmin);

export default router;
