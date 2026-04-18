import type { Response } from "express";

export const sendSuccess = (res : Response, data: Object, message = "Success", status = 200) =>{
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null,
    })
};

export const sendError = (res : Response, message = "Error", status = 500, error = null) =>{
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error,
    })
};