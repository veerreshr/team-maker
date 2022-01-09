import express from "express";
import { login, registerUser, logout } from "../controllers/auth.js";

import {
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
} from "../controllers/user.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { buildCheckFunction } from "express-validator";

const checkQuery = buildCheckFunction(["query"]);
const router = express.Router();

// Get data about the User's Team
// router.get("/getteams", protect, getTeamById);

router.post("/login", login);
router.post("/register", registerUser);
router.get("/logout", logout);

router.get("/profile", getUserProfileByUsername);

router
  .route("/profile/basicinformation")
  .get(getBasicInformation)
  .put(protect, updateBasicInformation);

router.route("/profile/skills").get(getSkills).put(protect, updateSkills);

router
  .route("/profile/languages")
  .get(getLanguages)
  .put(protect, updateLanguages);

router
  .route("/profile/education")
  .get(getEducation)
  .put(protect, updateEducation);
router.route("/profile/education/:id").delete(protect, deleteEducation);

router
  .route("/profile/experience")
  .get(getExperience)
  .put(protect, updateExperience);
router.route("/profile/experience/:id").delete(protect, deleteExperience);

router
  .route("/profile/certification")
  .get(getCertifications)
  .put(protect, updateCertifications);
router
  .route("/profile/certification/:id")
  .delete(protect, deleteCertifications);

router
  .route("/profile/awardsandachievements")
  .get(getAchievements)
  .put(protect, updateAchievements);
router
  .route("/profile/awardsandachievements/:id")
  .delete(protect, deleteAchievements);

router.get("/getrequests", protect, getRequests);

router.post("/rejectrequest", protect, rejectRequest);

router.get("/getmyteams", protect, getMyTeams);

router.get("/getteambyid", protect, getTeamById);

router.delete("/cancelrequest", protect, cancelRequestSent);

//Register Route
router.post("/register", registerUser);
//Logout Route
router.get("/logout", logout);
router.route("/profile/projects").get(getProjects).put(protect, updateProjects);
router.route("/profile/projects/:id").delete(protect, deleteProjects);

export default router;
