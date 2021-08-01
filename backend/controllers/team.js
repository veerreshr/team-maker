import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import Team from "./../models/teamModel.js";

//api/teams/:id
//private route
//@Expects id to be Searched
const getTeamByID = (req, res) => {
  try {
    Team.findById(req.params.id).exec(async (err, team) => {
      if (err || !team) {
        return res.status(400).json({
          error: "No user found in the DB!",
        });
      }
      const members = await User.find(
        { _id: { $in: team.members } },
        { name: 1 }
      );
      const requests = await User.find(
        { _id: { $in: team.requests } },
        { name: 1 }
      );
      team.requests = requests;
      team.members = members;
      res.json(team); // req.profile is populated here
    });
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
};

const createTeam = expressAsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const format = {
    eventname: req.body.eventname,
    name: req.body.name,
    desc: req.body.desc,
    leader: userid,
    preferences: {
      languages: req.body.preferences.languages,
      skills: req.body.preferences.skills,
    },
    members: [userid],
  };
  const team = await Team.create(format);
  await User.updateOne(
    { _id: userid },
    {
      $push: {
        teams: team._id,
      },
    }
  );
  if (team) {
    res.status(201).json(team);
  } else {
    res.status(400);
    throw new Error("Invalid team data");
  }
  /*   Add team data in the user model   */
});

const requestToJoinATeam = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const teamid = req.body.teamid;
    const teams = await User.find({ _id: userid, "teams._id": teamid });
    if (teams) {
      res.status(400);
      throw new Error("Already a part of this team");
    } else {
      const team = await Team.findById(teamid);
      const user = await User.findById(userid);
      await User.updateOne({ _id: userid }, { $push: { requests: team } });
      await Team.updateOne({ _id: teamid }, { $push: { requests: user } });
      res.send("Request sent");
    }
    //team id  ,user => user.token  ==> teamId already present in teams , if present throw an error saying already in the team else append in to that list of requests
    //append it into requests in team model => +userID
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
});

const filterByDetails = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const eventname = req.body.eventname;
    const languages = req.body.languages.split(",");
    const skills = req.body.skills.split(",");
    const user = await User.findById(userid);
    let langRegEx = [];
    let skillsRegEx = [];
    languages.forEach(function (opt) {
      langRegEx.push(new RegExp(opt, "i"));
    });
    skills.forEach(function (opt) {
      skillsRegEx.push(new RegExp(opt, "i"));
    });
    if (langRegEx.length > 0) {
      if (skillsRegEx.length > 0) {
        const teams = await Team.find(
          {
            _id: { $nin: [...user.requests, ...user.teams] },
            eventname: new RegExp(eventname, "i"),
            "preferences.languages": { $all: langRegEx },
            "preferences.skills": { $all: skillsRegEx },
          },
          { name: 1, eventname: 1, preferences: 1, desc: 1 }
        );

        res.json(teams);
      } else {
        const teams = await Team.find(
          {
            _id: { $nin: [...user.requests, ...user.teams] },
            eventname: new RegExp(eventname, "i"),
            "preferences.languages": { $all: langRegEx },
          },
          { name: 1, eventname: 1, preferences: 1, desc: 1 }
        );

        res.json(teams);
      }
    } else {
      if (skillsRegEx.length > 0) {
        const teams = await Team.find(
          {
            _id: { $nin: [...user.requests, ...user.teams] },
            eventname: new RegExp(eventname, "i"),
            "preferences.skills": { $all: skillsRegEx },
          },
          { name: 1, eventname: 1, preferences: 1, desc: 1 }
        );

        res.json(teams);
      } else {
        const teams = await Team.find(
          {
            _id: { $nin: [...user.requests, ...user.teams] },
            eventname: new RegExp(eventname, "i"),
          },
          { name: 1, eventname: 1, preferences: 1, desc: 1 }
        );

        res.json(teams);
      }
    }

    //event name , languages, skills ,user => user.token filter=> filter + member , requests list
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
});

const getMyRequestedTeams = expressAsyncHandler(async (req, res) => {
  try {
    //user.requests => teamsid => [...teaminfo]
    const userid = req.user._id;
    const user = await User.findById(userid);
    const requestedTeams = await Team.find({ _id: { $in: user.requests } });
    res.json(requestedTeams);
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
});

const getMyTeams = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid, { teams: 1 });
    const teams = await Team.find(
      { _id: { $in: user.teams } },
      { name: 1, eventname: 1, desc: 1 }
    );
    res.json(teams);
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
});

export {
  createTeam,
  requestToJoinATeam,
  filterByDetails,
  getMyRequestedTeams,
  getMyTeams,
  getTeamByID,
};
