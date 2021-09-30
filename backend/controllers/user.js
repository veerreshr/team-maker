import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import Team from "./../models/teamModel.js";
import mongoose from "mongoose";

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      photo: user.photo,
      name: user.name,
      email: user.email,
      username: user.username,
      workTitle: user.workTitle,
      bio: user.bio,
      toolsAndTech: user.toolsAndTech,
      socialLinks: user.socialLinks,
      languages: user.languages,
      experience: user.experience,
      education: user.education,
      certifications: user.certifications,
      achievements: user.achievements,
      projects: user.projects,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.photo = req.body.photo || user.photo;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.workTitle = req.body.workTitle || user.workTitle;
    user.bio = req.body.bio || user.bio;
    user.toolsAndTech = req.body.toolsAndTech || user.toolsAndTech;
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
    user.languages = req.body.languages || user.languages;
    user.experience = req.body.experience || user.experience;
    user.education = req.body.education || user.education;
    user.certifications = req.body.certifications || user.certifications;
    user.achievements = req.body.achievements || user.achievements;
    user.projects = req.body.projects || user.projects;
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true },
      (err, userRes) => {
        if (err) {
          res.status(400);
          throw new Error("Update Unsuccessful");
        }
        res.json(userRes);
      }
    );
  } else {
    res.status(404);
    throw new Error("User not found");
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
//middleware
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
    res.json(user);
  });
};

const updateUser = (req, res) => {
  //Model.findOneAndReplace({ _id: id }, update, options, callback).
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, UseFindAndModify: false },
    (err, user) => {
      if (err) {
        return resp.status(400).res.json({
          error: "You are not authorized to update",
        });
      }
      //Hide senstive infomration from user browser (salt,encry_password)
      // user.salt=undefined;
      // user.encry_password=undefined;
      // user.createdAt=undefined;
      // user.updatedAt=undefined;
      res.json(user);
    }
  );
};

/*
API/USERS/GetTeams


get user info => from auth middleware
user.teams => getData[]
team_data[]=> res.json([team_name, team_id])
  */

const getTeamById = expressAsyncHandler(async (req, res, next) => {
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
});

export {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserProfileByUsername,
  updateUser,
  getTeamById,
};
