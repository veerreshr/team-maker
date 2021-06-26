import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import generateToken from "./../utils/generateToken.js";

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
      req.profile=user // req.profile is populated here
      next();
  })
  });
  
  const getUser = (req,res)=>{
    // //Hide senstive infomration from user browser (salt,encry_password)
    // req.profile.salt=undefined;
    // req.profile.encry_password=undefined;
    // req.profile.createdAt=undefined;
    // req.profile.updatedAt=undefined;
    // //Note: We are not making them undefined in the database, we are just making them undefined in the User's profile
  
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

  export {
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    getUser,
    updateUser,
  };
  