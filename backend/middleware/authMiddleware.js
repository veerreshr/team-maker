import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
import Team from "./../models/teamModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized ,token failed ");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

const teamAdmin = expressAsyncHandler(async (req, res, next) => {
  if (req.user) {
    const teamid = req.body.teamid || req.query.teamid;
    const isAdmin = await Team.find({
      _id: teamid,
      members: { $elemMatch: { userId: req.user._id, role: "admin" } },
    });
    if (isAdmin && isAdmin.length > 0) next();
    else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, teamAdmin, admin };
