import express from 'express';
import {applyNewApplication, getApplicationByCode, getPendingApplications, addAnswerToApplicaton, 
    adjustApplicationStatus, deleteApplicationById, getApplicationById, getAllApplications, editApplication, addNewAnswerApplication, getAnswersByApplication} from '../controllers/application.js';
import { checkApplicationExist, checkApplicationExistByCode } from '../middlewares/database/dbErrorCheck.js';
import { getAccessToRoute, getAdminAcess } from '../middlewares/auth/auth.js';
import Application from '../models/Application.js';
import { applicationQueryMiddleware } from '../middlewares/query/applicationQueryMiddleware.js';

const router = express.Router();

router.post("/apply", applyNewApplication);
router.get('/', applicationQueryMiddleware(Application), getAllApplications);
router.get("/pendingApplications", getPendingApplications);
router.get("/:id/answers", getAnswersByApplication);
router.get("/allApplications", getAllApplications);
router.put("/editApplication/:id", checkApplicationExist, editApplication);
router.post("/:id/answerApply", addNewAnswerApplication);
router.delete("/:id/delete", deleteApplicationById);
router.post("/adjustStatus/:id", [getAccessToRoute, getAdminAcess], adjustApplicationStatus);
router.get("/code/:code", checkApplicationExistByCode, getApplicationByCode);
router.get("/:id", checkApplicationExist, getApplicationById);

export default router;
