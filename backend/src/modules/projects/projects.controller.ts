import type { NextFunction, Request, Response } from "express";
import * as projectService from '../projects/projects.service.js';
import { sendSuccess } from "../../utils/response.js";
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await projectService.getProject();
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
    const project = await projectService.createProject();
    return sendSuccess(res, project, "Projects created successfully", 201);
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await projectService.deleteProject();
    return sendSuccess(res, project, "Projects deleted successfully", 204);
  } catch (error) {
    next(error);
  }
};
