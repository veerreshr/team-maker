import express from "express";

import {
  deleteOrgs,
  addOrg,
  getOrgs,
} from "../controllers/CustomOrg.js";

const router = express.Router();

router.get("/", getOrgs);
router.post("/addOrg", addOrg);
router.delete("/deleteOrgs", deleteOrgs);

export default router;
