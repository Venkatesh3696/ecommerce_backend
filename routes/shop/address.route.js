import { Router } from "express";
import {
  getAddress,
  addAddress,
  deleteAddress,
  fetchAllAddress,
  updateAddress,
} from "../../controllers/shop/address.controller.js";

const router = Router();

router.post("/", addAddress);
router.get("/", fetchAllAddress);
router.get("/:addressId", getAddress);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

export default router;
