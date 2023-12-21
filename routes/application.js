import express from 'express';
import {applyNewApplication, getApplicationByCode} from '../controllers/application.js';
import { checkApplicationExist } from '../middlewares/database/dbErrorCheck.js';

const router = express.Router();

router.post("/apply", applyNewApplication);
router.get("/:code", checkApplicationExist, getApplicationByCode);

export default router;
