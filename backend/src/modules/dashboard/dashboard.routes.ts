import express from "express";
import { getDashboardStats } from "./dashboard.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats", verifyUser, getDashboardStats);

export default router;