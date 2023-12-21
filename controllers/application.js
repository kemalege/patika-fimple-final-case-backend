import Application from "../models/Application.js";
import asyncErrorWrapper from "express-async-handler";

const applyNewApplication = asyncErrorWrapper(async (req, res, next) => {
        
        const applicationDetails = req.body;
    
        const application = await Application.create({
            ...applicationDetails,
        });
        res.status(200).json({
            success: true,
            data: application,
        });
});

const getApplicationByCode = asyncErrorWrapper(async (req, res, next) => {
    const application = req.data;
    res.status(200).json({
        success: true,
        data: application,
    });
});

export {applyNewApplication, getApplicationByCode};
  