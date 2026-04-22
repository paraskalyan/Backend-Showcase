import type { NextFunction, Request, Response } from "express";
import * as endpointService from "./endpoint.service.js";
import { sendSuccess } from "../../utils/response.js";
export const getAllEndpoints = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.query;

    if (!projectId || Array.isArray(projectId) || typeof projectId !== "string") {
      return res.status(400).json({
        error: { message: "Invalid projectId" },
      });
    }

    const endpoints = await endpointService.getAllEndpoints(projectId);

    return sendSuccess(res, endpoints, "Endpoints fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const createEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const endpoint = await endpointService.createEndpoint(req.body);
    return sendSuccess(res, endpoint, "Endpoint created successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const updateEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
   const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        error: { message: "Invalid ID" },
      });
    }

    const updated = await endpointService.updateEndpoint(id, req.body);
    return sendSuccess(res, updated, "Endpoint updated successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const deleteEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        error: { message: "Invalid ID" },
      });
    }

    await endpointService.deleteEndpoint(id);
    return sendSuccess(res, {}, "Endpoint deleted successfully", 204);
  } catch (error) {
    next(error);
  }
};
