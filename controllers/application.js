import ShortUniqueId from "short-unique-id";
import Application from "../models/Application.js";
import Answer from "../models/Answer.js";
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

const getAllApplications = asyncErrorWrapper(async (req, res, next) => {
    return res.status(200).json(res.queryResults);

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
    // application.status = "solved";
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

const getApplicationById = asyncErrorWrapper(async (req, res, next) => {
    const application = req.data;
    res.status(200).json({
        success: true,
        data: application,
    });
});

const editApplication = asyncErrorWrapper(async (req, res, next) => {
    const applyId = req.params.id;
    const applicationDetails = req.body;

    const application = await Application.findByIdAndUpdate(applyId, applicationDetails, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: application,
    });
});

const deleteApplicationById = asyncErrorWrapper(async (req, res, next) => {
    const applyId = req.params.id;
    await Application.findByIdAndDelete(applyId);
    res.status(200).json({
        success: true,
        message: "Başvuru başarıyla silindi",
    });
});

const addNewAnswerApplication = asyncErrorWrapper(async (req, res, next) => {
    const answer_id = req.params.id;

    console.log(answer_id);
    
    const information = req.body;

    const answer = await Answer.create({
        ...information,
        application : answer_id,
    });

    return res.status(200)
    .json({
        success : true,
        data : answer
    });
});

const getAnswersByApplication = asyncErrorWrapper(async (req, res, next) => {
    const application_id = req.params.id;
    
    const application = await Application.findById(application_id).populate("answers");

    const answers = application.answers;

    return res.status(200).json({
        success: true,
        count: answers.length,
        data: answers
    })
}); 

export {applyNewApplication, getApplicationByCode, getAllApplications, getPendingApplications, addAnswerToApplicaton, getAnswersByApplication,
     adjustApplicationStatus, deleteApplicationById, getApplicationById, editApplication, addNewAnswerApplication};
  