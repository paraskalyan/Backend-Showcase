import type { NextFunction, Request, Response } from "express";
import * as dashboardService from './dashboard.service.js';
import { sendSuccess } from "../../utils/response.js";

export const getDashboardStats = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.userId;
        const stats = await dashboardService.getDashboardStats(userId); 
        return sendSuccess(res, stats, "Dashboard data fetched successfully", 200);
    } catch (error) {
        next(error)
    }
}