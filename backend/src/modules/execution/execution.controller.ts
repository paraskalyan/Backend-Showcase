// controllers/execution.controller.ts
import type { NextFunction, Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/response.js";
import * as executionService from './execution.service.js'
export const runExecution = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { endpointId } = req.body;
    const { id } = req.user;
    if (!endpointId) {
      return sendError(res, "EndpointId is required", 400);
    }

    const result = await executionService.runExecution(endpointId, id);

    return sendSuccess(res, result, "", 200);
  } catch (err) {
    next(err);
  }
};
