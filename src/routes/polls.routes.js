import { Router } from "express";

import { postPoll } from "../controllers/polls.controller.js";

const router = Router()

//router.get('/rpe', getRpeInfo)

router.post('/poll', postPoll);


export default router;