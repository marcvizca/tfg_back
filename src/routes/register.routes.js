import { Router } from "express";
import { registerUser, changePassword } from "../controllers/register.controller.js"

const router = Router()

router.post('/register', registerUser);

router.put('/changepassword', changePassword);

export default router;