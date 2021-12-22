import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
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
    throw new Error("Something went wrong : \n" + error);
  }
};

const createTeam = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const teamName = req.body.name;
    const teamExists = await Team.findOne({ name: teamName });
    if (teamExists) {
      res.status(400);
      throw new Error("This team name is not available");
    }
    const user = await User.findById(userid);
    const format = {
      name: teamName,
      description: req.body.description,
      password: req.body.password,
      events_participating: [],
      preferences: {
        languages: req.body.preferences.languages,
        skills: req.body.preferences.skills,
      },
      members: [{ userId: userid, userName: user.name, role: "admin" }],
      requests_received: [],
      requests_sent: []
    };
    const team = await Team.create(format);
    await User.updateOne(
      { _id: userid },
      {
        $push: {
          teams: {
            teamId: team._id,
            teamName: teamName
          }
        },
      }
    );
    if (team) {
      res.status(201).json({
        id: team._id,
        name: team.name,
        description: team.description,
        members: team.members,
      });
    } else {
      res.status(400);
      throw new Error("Invalid team data");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : \n" + error);
  }
  /*   Add team data in the user model   */
});

const searchTeam = expressAsyncHandler(async (req, res) => {
  try {
    const teamName = req.body.name;
    const matches = await Team.find({ name: { $regex: new RegExp(teamName.toLowerCase(), "i") } });
    let teams = [];
    matches.forEach((match) => {
      const members = match.members;
      const admins = [];
      members.forEach((member) => {
        if (member.role === "admin") admins.push(member.userName);
      });
      teams.push({
        name: match.name,
        desc: match.description,
        admins: admins,
      });
    });
    res.json(teams);
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
});

const sendRequest = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const teamid = req.body.teamid;
    const teams = await User.find({ _id: userid, teams: { teamId : teamid } });
    const sentRequests = await User.find({ _id: userid, "requests_sent.teamId": teamid});
    if (teams && teams.length > 0) {
      res.status(400);
      throw new Error("Already a part of this team");
    } else if (sentRequests && sentRequests.length > 0) {
      res.status(400);
      throw new Error("Already sent a request to this team");
    } else {
      const team = await Team.findById(teamid);
      const user = await User.findById(userid);
      await Team.updateOne({ _id: teamid }, { $push: { requests_received: { userId: userid, userName: user.name } } });
      await User.updateOne({ _id: userid }, { $push: { requests_sent: { teamId: team._id, teamName: team.name } } });
      res.json({status: "Success", requests: user.requests_sent});
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

const joinTeamById = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const teamid = req.body.teamid;
    const password = req.body.password;
    if (teamid && password) {
      const teams = await User.find({ _id: userid, teams: { teamId : teamid } });
      if (teams && teams.length > 0) {
        res.status(400);
        throw new Error("Already a part of this team");
      } else {
        const sentRequests = await User.find({ _id: userid, requests_sent: { teamId : teamid } });
        const team = await Team.findById(teamid);
        if (team.matchPassword(password)) {
          const user = await User.findById(userid);
          if (sentRequests) {
            await Team.updateOne({ _id: teamid }, { $pull: { requests_received: { userId: userid } } });
            await User.updateOne({ _id: userid }, { $pull: { requests_sent: { teamId : teamid } } });
          }
          await Team.updateOne({ _id: teamid }, { $push: { members: { userId: userid, userName: user.name } } });
          await User.updateOne({ _id: userid }, { $push: { teams: { teamId: team._id, teamName: team.name } } });
          res.json({status: "Success", requests: user.teams});
        } else {
          res.status(401);
          throw new Error("Invalid password");
        }
      }
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

const getRequests = expressAsyncHandler(async (req, res) => {
  try {
    const teamid = req.body.teamid;
    const team = await Team.findById(teamid);
    if (team) {
      res.json(team.requests_received);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

const handleRequest = expressAsyncHandler(async (req, res) => {
  try {
    const teamid = req.body.teamid;
    const status = req.body.status;
    const userid = req.body.userid;
    const team = await Team.findById(teamid);
    const user = await User.findById(userid);
    if (team && user) {
      if (status === "accept") {
        await Team.updateOne({ _id: teamid }, { $push: { members: { userId: userid, userName: user.name } }, $pull: { requests_received: { userId: userid } } }, { new: true });
        await User.updateOne({ _id: userid }, { $push: { teams: { teamId: team._id, teamName: team.name } }, $pull: { requests_sent: { teamId : teamid } } }, { new: true });
        res.json({ status: "Success", requests: team.requests_received });
      } else if (status === "reject") {
        await Team.updateOne({ _id: teamid }, { $pull: { requests_received: { userId: userid } } });
        await User.updateOne({ _id: userid }, { $pull: { requests_sent: { teamId : teamid } } }, { new: true });
        res.json({ status: "Success", requests: team.requests_received });
      } else {
        res.status(400);
        throw new Error("Invalid status");
      }
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

const removeMember = expressAsyncHandler(async (req, res) => {
  try {
    const teamid = req.body.teamid;
    const userid = req.body.userid;
    const team = await Team.findById(teamid);
    if (team) {
      await Team.updateOne({ _id: teamid }, { $pull: { members: { userId: userid } } }, { new: true });
      await User.updateOne({ _id: userid }, { $pull: { teams: { teamId : teamid } } });
      res.json({ status: "Member removed", members: team.members });
    } else {
      res.status(400);
      throw new Error("Invalid team");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

const editDetails = expressAsyncHandler(async (req, res) => {
  try {
    const teamid = req.body.teamid;
    const team = await Team.findById(teamid);
    if (team) {
      team.name = req.body.name || team.name;
      team.description = req.body.description || team.description;
      team.events_participating = req.body.events_participating || team.events_participating;
      if (req.body.preferences) {
        team.preferences.languages = req.body.preferences.languages || team.preferences.languages;
        team.preferences.skills = req.body.preferences.skills || team.preferences.skills;
      }
      Team.findByIdAndUpdate(
        { _id: team._id },
        { $set: team },
        { new: true },
        (err, teamRes) => {
          if (err) {
            res.status(400);
            throw new Error("Update Unsuccessful");
          }
          res.json({
            name: teamRes.name,
            description: teamRes.description,
            events_participating: teamRes.events_participating,
            preferences: teamRes.preferences,
          });
        }
      );
    } else {
      res.status(400);
      throw new Error("Invalid team");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

const updatePassword = expressAsyncHandler(async (req, res) => {
  try {
    const teamid = req.body.teamid;
    const team = await Team.findById(teamid);
    if (team) {
      const currentPassword = req.body.current_password;
      let newPassword = req.body.new_password;
      if (await team.matchPassword(currentPassword)) {
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, salt);
        Team.findByIdAndUpdate(
          { _id: teamid },
          { $set: { password: newPassword } },
          (err, teamRes) => {
            if (err) {
              res.status(400);
              throw new Error("Update Unsuccessful");
            }
            res.json({
              name: teamRes.name,
              description: teamRes.description,
              events_participating: teamRes.events_participating
            });
          }
        );
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    } else {
      res.status(400);
      throw new Error("Invalid team");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
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
  searchTeam,
  sendRequest,
  joinTeamById,
  getRequests,
  handleRequest,
  removeMember,
  editDetails,
  updatePassword,
  filterByDetails,
  getMyRequestedTeams,
  getMyTeams,
  getTeamByID,
};
