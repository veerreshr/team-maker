import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import Team from "./../models/teamModel.js";
import mongoose from "mongoose";

// @desc    Get user basic information
// @route   GET /api/users/profile/basicinformation?_id=123456
// @access  Public

const getBasicInformation = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json({
      photo: user.photo,
      name: user.name,
      tagLine: user.tagLine,
      bio: user.bio,
      location: user.location,
      socialLinks: user.socialLinks,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user basic information
// @route   PUT /api/users/profile/basicinformation
// @access  Private

const updateBasicInformation = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.photo = req.body.photo || user.photo;
    user.name = req.body.name || user.name;
    user.tagLine = req.body.tagLine || user.tagLine;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    if (req.body.socialLinks) {
      user.socialLinks.linkedIn =
        req.body.socialLinks.linkedIn || user.socialLinks.linkedIn;
      user.socialLinks.twitter =
        req.body.socialLinks.twitter || user.socialLinks.twitter;
      user.socialLinks.github =
        req.body.socialLinks.github || user.socialLinks.github;
      user.socialLinks.medium =
        req.body.socialLinks.medium || user.socialLinks.medium;
      user.socialLinks.devTo =
        req.body.socialLinks.devTo || user.socialLinks.devTo;
      user.socialLinks.hashnode =
        req.body.socialLinks.hashnode || user.socialLinks.hashnode;
      user.socialLinks.leetCode =
        req.body.socialLinks.leetCode || user.socialLinks.leetCode;
      user.socialLinks.hackerRank =
        req.body.socialLinks.hackerRank || user.socialLinks.hackerRank;
      user.socialLinks.other =
        req.body.socialLinks.other || user.socialLinks.other;
    }
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json({
          photo: userRes.photo,
          name: userRes.name,
          tagLine: userRes.tagLine,
          bio: userRes.bio,
          location: userRes.location,
          socialLinks: userRes.socialLinks,
        });
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Get user skills
// @route   GET /api/users/profile/skills?_id=123456
// @access  Public

const getSkills = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.toolsAndTech);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user skills
// @route   PUT /api/users/profile/skills
// @access  Private

const updateSkills = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.toolsAndTech = req.body.toolsAndTech || user.toolsAndTech;
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.toolsAndTech);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Get user languages
// @route   GET /api/users/profile/languages?_id=123456
// @access  Public

const getLanguages = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.languages);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user languages
// @route   PUT /api/users/profile/languages
// @access  Private

const updateLanguages = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.languages = req.body.languages || user.languages;
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.languages);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Get user education
// @route   GET /api/users/profile/education?_id=123456
// @access  Public

const getEducation = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.education);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user education
// @route   PUT /api/users/profile/education
// @access  Private

const updateEducation = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.education) {
      if (req.body.education.schoolName && req.body.education.startDate) {
        let found = false;
        if (req.body.education._id) {
          user.education.forEach((pos, idx) => {
            if (pos._id == req.body.education._id) {
              found = true;
              user.education[idx] = req.body.education;
            }
          });
        }
        if (!found) {
          user.education.push(req.body.education);
        }
      } else {
        res.status(400);
        throw new Error(
          "Please fill all the mandatory fields : School Name, Start Date"
        );
      }
    }
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.education);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Delete user education
// @route   DELETE /api/users/profile/education/:id
// @access  Private

const deleteEducation = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { education: { _id: req.params.id } } },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.education);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to delete");
  }
});

// @desc    Get user experience
// @route   GET /api/users/profile/experience?_id=123456
// @access  Public

const getExperience = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.experience);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user experience
// @route   PUT /api/users/profile/experience
// @access  Private

const updateExperience = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.experience) {
      if (
        req.body.experience.title &&
        req.body.experience.company &&
        req.body.experience.startDate
      ) {
        let found = false;
        if (req.body.experience._id) {
          user.experience.forEach((pos, idx) => {
            if (pos._id == req.body.experience._id) {
              found = true;
              user.experience[idx] = req.body.experience;
            }
          });
        }
        if (!found) {
          user.experience.push(req.body.experience);
        }
      } else {
        res.status(400);
        throw new Error(
          "Please fill all mandatory fields : Title, Company, Start Date"
        );
      }
    }
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.experience);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Delete user experience
// @route   DELETE /api/users/profile/experience/:id
// @access  Private

const deleteExperience = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { experience: { _id: req.params.id } } },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.experience);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to delete");
  }
});

// @desc    Get user certifications
// @route   GET /api/users/profile/certification?_id=123456
// @access  Public

const getCertifications = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.certifications);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user certification
// @route   PUT /api/users/profile/certification
// @access  Private

const updateCertifications = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.certifications) {
      if (
        req.body.certifications.name &&
        req.body.certifications.issuingOrg &&
        req.body.certifications.issueDate
      ) {
        let found = false;
        if (req.body.certifications._id) {
          user.certifications.forEach((pos, idx) => {
            if (pos._id == req.body.certifications._id) {
              found = true;
              user.certifications[idx] = req.body.certifications;
            }
          });
        }
        if (!found) {
          user.certifications.push(req.body.certifications);
        }
      } else {
        res.status(400);
        throw new Error(
          "Please fill all the mandatory fields : Certification Name, issuing Organisation Name, Issue Date"
        );
      }
    }
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.certifications);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Delete user certification
// @route   DELETE /api/users/profile/certification/:id
// @access  Private

const deleteCertifications = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { certifications: { _id: req.params.id } } },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.certifications);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to delete");
  }
});

// @desc    Get user's awards & achievements
// @route   GET /api/users/profile/awardsandachievements?_id=123456
// @access  Public

const getAchievements = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.achievements);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user's awards & achievements
// @route   PUT /api/users/profile/awardsandachievements
// @access  Private

const updateAchievements = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.achievements) {
      if (req.body.achievements.title) {
        let found = false;
        if (req.body.achievements._id) {
          user.achievements.forEach((pos, idx) => {
            if (pos._id == req.body.achievements._id) {
              found = true;
              user.achievements[idx] = req.body.achievements;
            }
          });
        }
        if (!found) {
          user.achievements.push(req.body.achievements);
        }
      } else {
        res.status(400);
        throw new Error(
          "Title field cannot be empty, Please fill all necessary details"
        );
      }
    }
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.achievements);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Delete user's awards & achievements
// @route   DELETE /api/users/profile/awardsandachievements/:id
// @access  Private

const deleteAchievements = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { achievements: { _id: req.params.id } } },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.achievements);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to delete");
  }
});

// @desc    Get user's projects
// @route   GET /api/users/profile/projects?_id=123456
// @access  Public

const getProjects = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(`${req.query._id}`);
  if (user) {
    res.json(user.projects);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user's projects
// @route   PUT /api/users/profile/projects
// @access  Private

const updateProjects = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.projects) {
      if (req.body.projects.title && req.body.projects.startDate) {
        let found = false;
        if (req.body.projects._id) {
          user.projects.forEach((pos, idx) => {
            if (pos._id == req.body.projects._id) {
              found = true;
              user.projects[idx] = req.body.projects;
            }
          });
        }
        if (!found) {
          user.projects.push(req.body.projects);
        }
      } else {
        res.status(400);
        throw new Error(
          "Please fill all the mandatory fields : Project Title, Start Date"
        );
      }
    }
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.projects);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to update");
  }
});

// @desc    Delete user's projects
// @route   DELETE /api/users/profile/projects/:id
// @access  Private

const deleteProjects = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { projects: { _id: req.params.id } } },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.projects);
      }
    );
  } else {
    res.status(404);
    throw new Error("Not authorized to delete");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserProfileByUsername = (req, res) => {
  User.find(
    { username: `${req.query.username}` },
    {
      photo: 1,
      name: 1,
      email: 1,
      username: 1,
      workTitle: 1,
      bio: 1,
      toolsAndTech: 1,
      about: 1,
      socialLinks: 1,
      languages: 1,
      experience: 1,
      education: 1,
      certifications: 1,
      achievements: 1,
      projects: 1,
    }
  ).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Profile not found",
      });
    }
    res.json(user[0]);
  });
};

// @desc    Get user's sent requests
// @route   GET /api/users/getrequests
// @access  Private

const getRequests = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user.requests_sent);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Reject an user's request received
// @route   POST /api/users/rejectrequest
// @access  Private

const rejectRequest = expressAsyncHandler(async (req, res) => {
  try {
    const teamid = req.body.teamid;
    const userid = req.user._id;
    const team = await Team.findById(teamid);
    const user = await User.findById(userid);
    if (team && user) {
      await Team.updateOne(
        { _id: teamid },
        { $pull: { requests_sent: { userId: userid } } }
      );
      await User.updateOne(
        { _id: userid },
        { $pull: { requests_received: { teamId: teamid } } },
        { new: true }
      );
      res.json(user.requests_received);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong :\n" + error);
  }
});

// @desc    Get user's teams
// @route   GET /api/users/getmyteams
// @access  Private

const getMyTeams = expressAsyncHandler(async (req, res) => {
  const teams = await User.findById(req.user._id, { _id: 0, teams: 1 });
  if (teams) {
    res.json(teams?.teams);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get a team details by entering the id
// @route   GET /api/users/getteambyid
// @access  Private

const getTeamById = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const team = await Team.findById(`${req.query.teamid}`);
  if (team) {
    const isAdmin = team.members?.some(
      (member) => member.role == "admin" && `${member.userId}` == userId
    );
    res.json({
      id: team._id,
      teamName: team.name,
      description: team.description,
      eventsParticipating: team.events_participating,
      members: team.members,
      isAdmin: isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

// @desc    Cancel a request sent out by user
// @route   DELETE /api/users/cancelrequest
// @access  Private

const cancelRequestSent = expressAsyncHandler(async (req, res) => {
  const teamid = req.query.teamid;
  const userid = req.user._id;
  const team = await Team.findById(teamid);
  const user = await User.findById(userid);
  if (team && user) {
    await Team.findByIdAndUpdate(
      teamid,
      { $pull: { requests_received: { userId: userid } } },
      { new: true }
    );
    User.findByIdAndUpdate(
      userid,
      { $pull: { requests_sent: { teamId: teamid } } },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes.requests_sent);
      }
    );
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

/*
API/USERS/GetTeams


get user info => from auth middleware
user.teams => getData[]
team_data[]=> res.json([team_name, team_id])
  */

/* const getTeamById = expressAsyncHandler(async (req, res, next) => {
  try {
    await User.findById(req.user._id).exec(async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user found in the DB!",
        });
      } else {
        const teamIdArray = user.teams;
        let obj_ids = teamIdArray.map(function (id) {
          return mongoose.Schema.Types.ObjectId(id);
        });

        Team.find(
          { _id: mongoose.Types.ObjectId("60d77cc94502d9129ca4fe61") },
          function (err, record) {
            // Do stuff
            if (err) {
              console.log(err);
            } else {
              console.log(record);
              res.json(record);
            }
          }
        );

        //return res.json(result);}
      }
    });
    // const result = await Team.find({"_id":{"$in":[ObjectId("60d77cc94502d9129ca4fe61")]} });

    // console.log(result);
    // console.log("2"+teamIdArray);
  } catch (err) {
    console.log(err);
  }
}); */

export {
  getAllUsers,
  getBasicInformation,
  updateBasicInformation,
  getSkills,
  updateSkills,
  getLanguages,
  updateLanguages,
  getEducation,
  updateEducation,
  deleteEducation,
  getExperience,
  updateExperience,
  deleteExperience,
  getCertifications,
  updateCertifications,
  deleteCertifications,
  getAchievements,
  updateAchievements,
  deleteAchievements,
  getProjects,
  updateProjects,
  deleteProjects,
  getRequests,
  rejectRequest,
  getMyTeams,
  cancelRequestSent,
  deleteUser,
  getUserProfileByUsername,
  getTeamById,
};
