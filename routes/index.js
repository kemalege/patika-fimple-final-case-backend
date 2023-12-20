import express from 'express';
import auth from './auth.js';
import admin from './admin.js';

const router = express.Router();

router.use("/auth", auth);
router.use("/admin", admin);

export default router;
