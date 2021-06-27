import express from "express";
import {
    createTeam, filterByDetails, getMyRequestedTeams, requestToJoinATeam,

} from "../controllers/team.js";

import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();


//createTeam Route
router.post('/createteam',protect,createTeam); 
router.post('/jointeam',protect,requestToJoinATeam); 
router.post('/filterbydetails',protect,filterByDetails); 
router.post('/getmyrequestedteams',protect,getMyRequestedTeams); 




export default router;
