import express from "express";
import {
  getEvents,
  addEvent,
  deleteEvents
} from "../controllers/customEvent.js";
import { admin, teamAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/addEvent",protect,admin, addEvent);
router.delete("/deleteEvents",protect,admin, deleteEvents);

export default router;
