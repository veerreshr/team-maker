import express from "express";
import {
    createTeam, filterByDetails, getMyRequestedTeams, requestToJoinATeam, getMyTeams

} from "../controllers/team.js";

import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();


//createTeam Route
router.post('/createteam',protect,createTeam); 
router.post('/jointeam',protect,requestToJoinATeam); 
router.post('/filterbydetails',protect,filterByDetails); 
router.get('/getmyrequestedteams',protect,getMyRequestedTeams); 
router.get('/getmyteams',protect,getMyTeams);



export default router;
