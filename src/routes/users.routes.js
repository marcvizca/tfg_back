import { Router } from "express";

import {getUsers, createUser, getUser, deleteUser, updateUser, getUserTeams } from '../controllers/users.controller.js'

const router = Router()

router.get('/user', getUsers)

router.get('/user/:id', getUser)

router.post('/user', createUser)

router.delete('/user/:id', deleteUser)

router.put('/user/:id', updateUser) //valorar si fer patch enlloc de put

router.get('/user/:id/teams', getUserTeams)

export default router;