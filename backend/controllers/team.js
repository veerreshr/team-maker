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
      res.status(201).json(team);
    } else {
      res.status(400);
      throw new Error("Invalid team data");
    }
  });


  const requestToJoinATeam=expressAsyncHandler(async (req, res) => {
    try {
      //team id  ,user => user.token  ==> teamId already present in teams , if present throw an error saying already in the team else append in to that list of requests
      //append it into requests in team model => +userID
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong : "+error);
    }
  })


  const filterByDetails=expressAsyncHandler(async (req, res) => {
    try {
      //event name , languages, skills ,user => user.token filter=> filter + member , requests list
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong : "+error);
    }
  })


const getMyRequestedTeams=expressAsyncHandler(async (req, res) => {
  try {
    //user.requests => teamsid => [...teaminfo]
  } catch (error) {
    res.status(400);
      throw new Error("Something went wrong : "+error);
  }
})


  export {
    createTeam,requestToJoinATeam,filterByDetails,getMyRequestedTeams
  }