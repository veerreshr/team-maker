import express from "express";
import {
  getEvents,
  addEvent,
  getEventById,
  updateEvent,
  deletePastEvents,
  deleteEvent,
  getScrappedEvents,
} from "../controllers/event.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getEvents/:eventId", getEventById);
router.get("/", getEvents);
router.get("/getScrappedEvents", getScrappedEvents);

router.post("/addEvent", protect, admin, addEvent);

router.put("/updateEvent/:eventId", protect, admin, updateEvent);

router.delete("/deletePastEvents", protect, admin, deletePastEvents);
router.delete("/deleteEvent/:eventId", protect, admin, deleteEvent);

export default router;
