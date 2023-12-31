import ShortUniqueId from "short-unique-id";
import Application from "../models/Application.js";
import asyncErrorWrapper from "express-async-handler";

const applyNewApplication = asyncErrorWrapper(async (req, res, next) => {
    const uid = new ShortUniqueId({ length: 10});
    const uidCode = uid.rnd()
        
        const applicationDetails = req.body;
    
        const application = await Application.create({
            code : uidCode,
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

const getPendingApplications = asyncErrorWrapper(async (req, res, next) => {
    const pendingApplications = await Application.find({ status: "pending" });
    res.status(200).json({
        success: true,
        data: pendingApplications,
    });
});

const addAnswerToApplicaton = asyncErrorWrapper(async (req, res, next) => {
    
    const applyId = req.params.id;
    const {answer} = req.body
  
    const application = await Application.findById(applyId);
  
    application.answers.push(answer);
    application.status = "solved";
    await application.save();
  
    res.status(200).json({
        success: true,
        data: application,
    });
});

const adjustApplicationStatus = asyncErrorWrapper(async (req, res, next) => {
    
    const applyId = req.params.id;

    const {status} = req.body
  
    const application = await Application.findById(applyId);

    application.status = status
    await application.save();
  
    res.status(200).json({
        success: true,
        data: application,
    });
});

export {applyNewApplication, getApplicationByCode, getPendingApplications, addAnswerToApplicaton, adjustApplicationStatus};
  