import type { NextFunction, Request, Response } from "express";
import * as authService from './auth.service.js';

export const signup = async(req: Request, res: Response, next : NextFunction) => {
  try {
    const result = await authService.signup(req.body);
    res.json(result);
  } catch (error) { 
      next(error)
   }
};

export const login = async(req: Request, res: Response) => {
  try {
    const result = await authService.login();
    res.json(result);
  } catch (error) {}
};

export const logout = async(req: Request, res: Response) => {
  try {
    const result = await authService.logout();
    res.json(result);
  } catch (error) {}
};
