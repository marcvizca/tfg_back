import { Router } from "express";
import { getMember, postMember, deleteMemberPendent } from "../controllers/members.controller.js";

const router = Router()

router.get('/members', getMember);

router.post('/members/post', postMember);

router.delete('/members/denyjoin', deleteMemberPendent);

export default router;