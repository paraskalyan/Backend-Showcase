import express from 'express';
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from './projects.controller.js';
import { verifyUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verifyUser ,getAllProjects);
router.get('/:id', verifyUser ,getProject);
router.post('/', verifyUser ,createProject);
router.patch('/', verifyUser ,updateProject);
router.delete('/:id', verifyUser ,deleteProject);

export default router;