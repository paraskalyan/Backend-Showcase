import express from "express";
import { getDashboardStats } from "./dashboard.controller.js";

const router = express.Router();

router.post("/stats", getDashboardStats);

export default router;