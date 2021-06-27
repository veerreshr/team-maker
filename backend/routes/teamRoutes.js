import express from "express";
import {
    createTeam, filterByDetails, getMyRequestedTeams, requestToJoinATeam, getMyTeams
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

// router.param('TeamId', getTeamByID)

// route to trigger the capture
// router.get('/:TeamId', getTeam)

//createTeam Route
router.post('/createteam',protect,createTeam); 
router.post('/jointeam',protect,requestToJoinATeam); 
router.post('/filterbydetails',protect,filterByDetails); 
router.get('/getmyrequestedteams',protect,getMyRequestedTeams); 
router.get('/getmyteams',protect,getMyTeams);


//getTeamDetails Route
router.post('/teamdetails',protect,createTeam);

export default router;
