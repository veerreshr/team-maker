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
  const getUsers = expressAsyncHandler(async (req, res) => {
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
  // @access  Private/Admin
  
  // const getUserById = expressAsyncHandler(async (req, res) => {
  //   const user = await User.findById(req.params.id).select("-password");
  
  //   if (user) {
  //     res.json(user);
  //   } else {
  //     res.status(404);
  //     throw new Error("User not found");
  //   }
  // });
  
  const getUserById = expressAsyncHandler(async (req, res,id,next) => {
    User.findById(id).exec((err,user)=>{
      if(err||!user){
          return res.status(400).json({
              error:"No user found in the DB!"
          })
      }
      req.profile=user // req.profile is populated here// Note:May be Used later
      next();
  })
  });
  
  const getUser = (req,res)=>{

    return res.json(req.profile)
  
  
  }
  
  // @desc    Update user
  // @route   PUT /api/users/:id
  // @access  Private/Admin
  const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });


  /*
API/USERS/GetTeams


get user info => from auth middleware
user.teams => getData[]
team_data[]=> res.json([team_name, team_id])
  */


const getTeamById = expressAsyncHandler(async (req, res,next) => {
  
  try{
    await User.findById(req.user._id).exec(async(err,user)=>{
      if(err||!user){
          return res.status(400).json({
              error:"No user found in the DB!"
          })
      }else{     const teamIdArray =user.teams;
      let obj_ids = teamIdArray.map(function(id) { return mongoose.Schema.Types.ObjectId(id); });
      
      Team.find({"_id": mongoose.Types.ObjectId("60d77cc94502d9129ca4fe61")}, function (err, record) {
        // Do stuff
        if(err){
          console.log(err)
        }
        else{
          console.log(record);
          res.json(record);
        }
        });

      //return res.json(result);}
  }})
      // const result = await Team.find({"_id":{"$in":[ObjectId("60d77cc94502d9129ca4fe61")]} });
      
      // console.log(result);
      // console.log("2"+teamIdArray);
        
  }catch(err){
    console.log(err)
  }

  });


  export {
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    getUser,
    updateUser,
    getTeamById,
  };
  