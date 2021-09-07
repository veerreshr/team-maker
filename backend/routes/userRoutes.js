import express from "express";
import {
  login,
  registerUser,
  logout
} from "../controllers/auth.js";
import {
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getUser,
  getTeamById,
} from "../controllers/user.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getteams", protect, getTeamById);

router.post("/login", login);

router
  .route("/userprofile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/register',registerUser)

router.get('/logout',logout)


// PARAMS FOR USER ROUTES
router.param('UserId', getUserById)

// route to trigger the capture
router.get('/:UserId', getUser)

export default router;
