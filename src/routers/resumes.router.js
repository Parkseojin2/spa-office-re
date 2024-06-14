import express from 'express';
import authMiddleware from '../middlewares/require-access-token.middleware.js';
import { ResumesController } from '../controllers/resumes.controller.js';
import { ResumesService } from '../services/resumes.service.js';
import { ResumesRepository } from '../repositories/resumes.repository.js';

const router = express.Router();

const resumesRepository = new ResumesRepository();
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

router.post('/apply', authMiddleware, resumesController.applyResume);
router.get('/status', authMiddleware, resumesController.getAllResumes);
router.get('/status/:postId', authMiddleware, resumesController.getResumeById);
router.patch('/:postId', authMiddleware, resumesController.updateResume);
router.delete('/delete/:postId', authMiddleware, resumesController.deleteResume);

export default router;
