import express from 'express';
import {applyNewApplication, getApplicationByCode, getPendingApplications, addAnswerToApplicaton, adjustApplicationStatus, deleteApplicationById, getApplicationById} from '../controllers/application.js';
import { checkApplicationExist } from '../middlewares/database/dbErrorCheck.js';
import { getAccessToRoute, getAdminAcess } from '../middlewares/auth/auth.js';

const router = express.Router();

router.post("/apply", applyNewApplication);
router.get("/pendingApplications", getPendingApplications);
router.delete("/deleteApplication/:id", deleteApplicationById);
router.post("/answerApply/:id", [getAccessToRoute, getAdminAcess], addAnswerToApplicaton);
router.post("/adjustStatus/:id", [getAccessToRoute, getAdminAcess], adjustApplicationStatus);
router.get("/:code", checkApplicationExist, getApplicationByCode);
router.get("/:id", checkApplicationExist, getApplicationById);

export default router;
