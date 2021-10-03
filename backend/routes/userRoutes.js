import express from "express";
import {
  login,
  registerUser,
  logout,
  
} from "../controllers/auth.js";

import {
  deleteUser,
  getUserProfile,
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
  getUserById,
  getUser,
  updateUser,
  getTeamById,
} from "../controllers/user.js";

import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();
// router.route("/").post(registerUser).get(protect, admin, getUsers);


// Get data about the User's Team 
router.get("/getteams",protect,getTeamById);

router.post("/login", login);
router
  .route("/profile/")
  .get(getUserProfile);

// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

router
  .route("/profile/basicinformation")
  .get(getBasicInformation)
  .put(protect, updateBasicInformation);

router
  .route("/profile/skills")
  .get(getSkills)
  .put(protect, updateSkills);

router
  .route("/profile/languages")
  .get(getLanguages)
  .put(protect, updateLanguages);

router
  .route("/profile/education")
  .get(getEducation)
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

router
  .route("/profile/experience")
  .get(getExperience)
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

router
  .route("/profile/certification")
  .get(getCertifications)
  .put(protect, updateCertifications)
  .delete(protect, deleteCertifications);

router
  .route("/profile/awardsandachievements")
  .get(getAchievements)
  .put(protect, updateAchievements)
  .delete(protect, deleteAchievements);

router
  .route("/profile/projects")
  .get(getProjects)
  .put(protect, updateProjects)
  .delete(protect, deleteProjects);

//Register Route
router.post('/register',registerUser)
//Logout Route
router.get  ('/logout',logout)


// PARAMS FOR USER ROUTES

router.param('UserId', getUserById)

// route to trigger the capture
router.get('/:UserId', getUser)

router.put('/:UserId', updateUser)
// router.get('/users',getAllUsers)


export default router;
