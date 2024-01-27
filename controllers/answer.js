import asyncErrorWrapper from "express-async-handler";
import Answer from "../models/Answer.js";
import Application from "../models/Application.js";

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
        
    const {answer_id} = req.params;

    const {application_id} = req.params;

    // console.log(answer_id, application_id);

    await Answer.findByIdAndDelete(answer_id);

    const application = await Application.findById(application_id);

    application.answers.splice(application.answers.indexOf(answer_id),1);
    // application.answerCount = application.answers.length;

    await application.save();

    return res.status(200)
    .json({
        success: true,
        message : "Answer deleted succesfully"

    });
});

export {deleteAnswer};
