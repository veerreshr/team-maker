import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import Team from "./../models/teamModel.js";
import generateToken from "./../utils/generateToken.js";

const createTeam = expressAsyncHandler(async (req, res) => {

    const userid = req.user._id;
    console.log(userid);
    const format = {

        eventname:req.body.eventname,
        name:req.body.name,
        desc:req.body.desc,
        leader:userid,
        preferences:req.body.preferences,
        // "members":req.body.eventname,
        // "request":req.body.eventname
    
    }
    const team = await Team.create(format);
    console.log(team);
    /*   Add team data in the user model   */
        await User.updateOne(
            {_id:userid},
        {
            $set:{
            teams:[team._id],
        }
    }
    )
    
    if (team) {
      res.status(201).json({
        _id: team._id,
        desc: team.desc,
        leader: team.leader,
        members: team.members,
        requests: team.requests,
        preferences: team.preferences,
      });
    } else {
      res.status(400);
      throw new Error("Invalid team data");
    }
  });


  //@middleware to getTeamByID
  //@userToutes.js
  //@Expects TeamId to be Searched
const getTeamByID = (req,res,next,id)=>{
  Team.findById(id).exec((err,team)=>{
      if(err||!team){
          return res.status(400).json({
              error:"No user found in the DB!"
          })
      }
      req.teamProfile=team // req.profile is populated here
      next();
  })
}

//@Controller to return team id details , fetched from  (getTeamByID ~ Middleware)
const getTeam = (req,res)=>{
  return res.json(req.teamProfile)
}


  export {
    createTeam,
    getTeamByID,
    getTeam,
  }