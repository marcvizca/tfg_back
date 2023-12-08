import { Router } from "express";

import { postRpe, postWellness, getRpeInfo, getWellnessInfo, getRpeByUser, getWellnessByUser } from "../controllers/polls.controller.js";

const router = Router()

//router.get('/rpe', getRpeInfo)

router.post('/poll/rpe', postRpe);

router.post('/poll/wellness', postWellness)

router.get('/poll/getRpeInfo/:teamId/:date', getRpeInfo);

router.get('/poll/getWellnessInfo/:teamId/:date', getWellnessInfo);

router.get('/poll/getRpeByUser/:userId/:teamId/:fromDate/:toDate', getRpeByUser);

router.get('/poll/getWellnessByUser/:userId/:teamId/:fromDate/:toDate', getWellnessByUser);

export default router;