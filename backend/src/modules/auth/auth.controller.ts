import type { Request, Response } from "express";
import * as authService from './auth.service.js';

export const signup = async(req: Request, res: Response) => {
  try {
    const result = await authService.signup();
    res.json(result);
  } catch (error) {  }
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
