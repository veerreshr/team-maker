import expressAsyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import generateToken from "./../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = expressAsyncHandler(async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // //create token
    // const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // // put token in cookie
    // res.cookie("token",token,{expire:new Date()+9999});
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong "+ error);
  }
});


// @desc    Regsiter new user
// @route   POST /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const {email, username, password, name} = req.body;
  const userExists = await User.findOne({$or: [ { email : email}, { username: username }]});
  if (userExists) {
    res.status(400);
    throw new Error("Username or Email already exists");
  }

  const user = await User.create({email : email, name : name, username : username, password : password});

  if (user) {
    res.status(201).json({
      username : user.username,
      name : user.name,
      email : user.email,
      token : generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//logout
const logout=(req,res)=>{

  res.clearCookie("token");
  res.send('User logout Route');
  res.json({
      message:"User logout Successfully"
  })

}

export {
  login,
  registerUser,
  logout,
};
