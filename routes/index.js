import express from 'express';
import auth from './auth.js';
import admin from './admin.js';
import application from './application.js';

const router = express.Router();

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/application", application);

export default router;
