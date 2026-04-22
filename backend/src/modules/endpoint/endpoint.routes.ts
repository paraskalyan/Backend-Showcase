import express from 'express';
import { createEndpoint, deleteEndpoint, getAllEndpoints, updateEndpoint } from './endpoint.controller.js';

const router = express.Router();

router.get('/', getAllEndpoints);
// router.get('/:id', getProject);
router.post('/', createEndpoint);
router.patch('/', updateEndpoint);
router.delete('/', deleteEndpoint);

export default router;