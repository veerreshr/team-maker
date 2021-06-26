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


  export {
    createTeam,
  }