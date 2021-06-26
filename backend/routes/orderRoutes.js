import express from "express";
import {
  addOrderItems,
  getOrders,

} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
export default router;
