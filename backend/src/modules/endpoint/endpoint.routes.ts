import express from 'express';
import { createEndpoint, deleteEndpoint, getAllEndpoints, getEndpoint, updateEndpoint } from './endpoint.controller.js';

const router = express.Router();

router.get('/', getAllEndpoints);
router.get('/:id', getEndpoint);
router.post('/', createEndpoint);
router.patch('/', updateEndpoint);
router.delete('/:id', deleteEndpoint);

export default router;