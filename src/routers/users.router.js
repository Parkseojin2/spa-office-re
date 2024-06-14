import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import  authMiddleware from '../middlewares/require-access-token.middleware.js';
import { UsersController } from '../controllers/users.controller.js';
import { UsersRepository } from '../repositories/users.repository.js';
 


const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersController = new UsersController(usersRepository);



router.get('/profile', authMiddleware, usersController.getUsers);
 

export default router;

