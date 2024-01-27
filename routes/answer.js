import express from 'express';
import { deleteAnswer } from '../controllers/answer.js';

const router = express.Router({mergeParams:true});

router.delete("/:answer_id/delete", deleteAnswer);

export default router;
 