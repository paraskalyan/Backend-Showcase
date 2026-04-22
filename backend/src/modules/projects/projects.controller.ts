import type { NextFunction, Request, Response } from "express";
import * as projectService from "../projects/projects.service.js";
import { sendError, sendSuccess } from "../../utils/response.js";

type Params = {
  id: string;
};


export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projects = await projectService.getAllProjects();
    return sendSuccess(res, projects, "Projects fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendError(res, "Project ID is required", 400);
    }
    const project = await projectService.getProject(id);
    if(!project){
      return sendError(res, "Project not found", 404);
    }
    return sendSuccess(res, project, "Project fetched successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await projectService.createProject(req.body);
    return sendSuccess(res, project, "Project created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await projectService.updateProject();
    return sendSuccess(res, project, "Projects updated successfully", 200);
  } catch (error) {
    next(error);
  }
};
export const deleteProject = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendError(res, "Project ID is required", 400);
    }
    const project = await projectService.deleteProject(id);
    return sendSuccess(res, project, "Project deleted successfully", 204);
  } catch (error) {
    next(error);
  }
};
