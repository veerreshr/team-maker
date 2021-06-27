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
  // const { name, email, password,skills,languages,about } = req.body;
  const {email}= req.body;
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // const user = await User.create({ name, email, password,skills,languages,about });
  const user = await User.create(req.body);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      skills:user.skills,
      languages:user.languages,
      gender:user.gender,
      location:user.location,
      college:user.college,
      certification:user.certification,
      teams: user.teams,
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
