import express from 'express';
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from './projects.controller.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.patch('/', updateProject);
router.delete('/', deleteProject);

export default router;