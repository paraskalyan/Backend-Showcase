import type { NextFunction, Request, Response } from "express";
import * as dashboardService from './dashboard.service.js';

export const getDashboardStats = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await dashboardService.getDashboardStats(); 
    } catch (error) {
        
    }
}