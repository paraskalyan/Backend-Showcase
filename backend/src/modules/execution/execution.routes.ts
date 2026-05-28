import express from "express";
import { runExecution } from "./execution.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/run", verifyUser, runExecution);

export default router;