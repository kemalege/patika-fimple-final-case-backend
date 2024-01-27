import express from 'express';
import auth from './auth.js';
import admin from './admin.js';
import application from './application.js';
import answer from './answer.js';

const router = express.Router();

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/application", application);
router.use("/answer", answer);

export default router;
