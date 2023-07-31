import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/orders

router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
