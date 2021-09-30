import express from "express";
import { login, registerUser, logout } from "../controllers/auth.js";

import {
  deleteUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  getUserProfileByUsername,
  updateUser,
  getTeamById,
} from "../controllers/user.js";

import { admin, protect } from "../middleware/authMiddleware.js";
import { buildCheckFunction } from "express-validator";
const checkQuery = buildCheckFunction(["query"]);
const router = express.Router();
// router.route("/").post(registerUser).get(protect, admin, getUsers);

// Get data about the User's Team
router.get("/getteams", protect, getTeamById);

router.post("/login", login);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

//Register Route
router.post("/register", registerUser);
//Logout Route
router.get("/logout", logout);

// PARAMS FOR USER ROUTES

router.get(
  "/getuserprofile",
  checkQuery("username").not().isEmpty().trim().escape(),
  getUserProfileByUsername
);

router.put("/:UserId", updateUser);
// router.get('/users',getAllUsers)

export default router;
