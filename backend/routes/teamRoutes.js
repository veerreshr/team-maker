import express from "express";
import {
    createTeam,getTeamByID,
    getTeam

} from "../controllers/team.js";

import {
  deleteUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  getUserById,
  // getUser,
  updateUser,
} from "../controllers/user.js";

import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.param('TeamId', getTeamByID)

// route to trigger the capture
router.get('/:TeamId', getTeam)

//createTeam Route
router.post('/createteam',protect,createTeam);

//getTeamDetails Route
router.post('/teamdetails',protect,createTeam);

export default router;
