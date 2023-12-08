import { Router } from "express";

import { postMinuts } from "../controllers/minuts.controller.js";

const router = Router()

//router.get('/rpe', getRpeInfo)

router.post('/minuts/postminuts', postMinuts);


//router.get('/', );


export default router;