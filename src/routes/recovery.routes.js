import { Router } from "express";
import { recoveryPwd } from "../controllers/recovery.controller.js";

const router = Router();

router.post('/recovery', recoveryPwd);

export default router;