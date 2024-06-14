import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();
const authController = new AuthController();

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

export default router;
