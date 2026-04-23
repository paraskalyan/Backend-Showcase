import express from "express";
import { runExecution } from "./execution.controller.js";

const router = express.Router();

router.post("/run", runExecution);

export default router;