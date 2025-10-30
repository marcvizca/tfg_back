import { Router } from "express";
import { getTeam, postTeam, joinTeam, getMembersPendents } from '../controllers/teams.controller.js'
const router = Router()

router.get('/team/:id', getTeam)

router.post('/team/create', postTeam);

router.post('/team/join', joinTeam);

router.get('/team/getMembersPendents/:teamId', getMembersPendents);
export default router;