import express from "express";
import { runExecution } from "../controllers/execution.controller";

const router = express.Router();

router.post("/run", runExecution);

export default router;