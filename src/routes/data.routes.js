import { Router } from "express";

import {  getACWR4, getActualACWR3, getMI, getMILastWeek } from "../controllers/data.controller.js";

const router = Router()

//router.get('/data/getCargaAguda/:teamId', getCargaAguda);

//router.get('/data/getCargaCronica3/:teamId', getCargaCronica3Week);

//router.get('/data/getCargaCronica4/:teamId', getCargaCronica4Week);

router.get('/data/getACWR4/:teamId', getACWR4);

router.get('/data/getActualACWR3/:teamId', getActualACWR3);

router.get('/data/getMI/:teamId', getMI);

router.get('/data/getMILastWeek/:teamId', getMILastWeek);


export default router;