import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import generateToken from "./../utils/generateToken.js";
import Team from "./../models/teamModel.js";
import mongoose from "mongoose";

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
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
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
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
const getUserById = (req, res, next, id) => {
  User.findById(id, {
    name: 1,
    skills: 1,
    languages: 1,
    about: 1,
    email: 1,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in the DB!",
      });
    }
    req.profile = user; // req.profile is populated here
    next();
  });
};
//Uses getUserById Middleware to show data:
const getUser = (req, res) => {
  return res.json(req.profile);
};

//----

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
// const updateUser = expressAsyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

//update User
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
  getUserById,
  getUser,
  updateUser,
  getTeamById,
};
