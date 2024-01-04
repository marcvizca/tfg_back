import { Router } from "express";
import { getMember, postMember, deleteMemberPendent, exitTeam } from "../controllers/members.controller.js";

const router = Router()

router.get('/members', getMember);

router.post('/members/post', postMember);

router.delete('/members/denyjoin', deleteMemberPendent);

router.delete('/members/exitTeam', exitTeam);

export default router;