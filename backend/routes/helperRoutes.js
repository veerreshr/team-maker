import express from "express";
import {
    getArticles
} from "../controllers/helper.js"

const router = express.Router();

router.get("/getarticles", getArticles);

export default router;