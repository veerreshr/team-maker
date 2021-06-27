import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import Team from "./../models/teamModel.js";
import generateToken from "./../utils/generateToken.js";
import { response } from "express";



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

const createTeam = expressAsyncHandler(async (req, res) => {

    const userid = req.user._id;
    console.log(userid);
    const format = {

        eventname:req.body.eventname,
        name:req.body.name,
        desc:req.body.desc,
        leader:userid,
        preferences:req.body.preferences,
        members:[userid],
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
      const userid = req.user._id;
      const teamid = req.body.teamid;
      const teams = await User.find({_id : userid ,"teams._id" : teamid});
      if(teams){
        res.status(400);
        throw new Error("Already a part of this team");
      } else {
        const team = await Team.findById(teamid);
        const user = await User.findById(userid);
        await User.updateOne({_id: userid}, {$push : {requests : team}});
        await Team.updateOne({_id: teamid}, {$push : {requests : user}});
        res.send("Request sent");
      }
      //team id  ,user => user.token  ==> teamId already present in teams , if present throw an error saying already in the team else append in to that list of requests
      //append it into requests in team model => +userID
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong : "+error);
    }
  })


  const filterByDetails=expressAsyncHandler(async (req, res) => {
    try {
      const userid = req.user._id;
      const eventname = req.body.eventname;
      // const {eventname, languages, skills} = req.body;
      const skills = req.body.skills;
      const languages = req.body.languages;
      const user = await User.findById(userid);
      const teams = await Team.find({"eventname": eventname});
      // {"_id" : {$nin : [...user.requests,...user.teams]}}
      // 'preferences.skills': { $all: user.skills }}, { 'preferences.languages': { $all: user.languages }}
      res.json(teams);
      //event name , languages, skills ,user => user.token filter=> filter + member , requests list
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong : "+error);
    }
  })


const getMyRequestedTeams=expressAsyncHandler(async (req, res) => {
  try {
    //user.requests => teamsid => [...teaminfo]
    const userid = req.user._id;
    const user = await User.findById(userid);
    const requestedTeams = await Team.find({_id : { $in : user.requests}});
    res.json(requestedTeams);
  } catch (error) {
    res.status(400);
      throw new Error("Something went wrong : "+error);
  }
})

const getMyTeams = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    const teams = await Team.find({_id : { $in : user.teams}});
    res.json(teams);
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
})


  export {
    createTeam,requestToJoinATeam,filterByDetails,getMyRequestedTeams,getMyTeams,getTeamByID,getTeam
  }