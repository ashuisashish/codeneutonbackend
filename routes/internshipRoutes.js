import express from 'express';
import { createInternship, getAllInternships } from '../controllers/internshipController.js';

const router = express.Router();

router.post('/create', createInternship);
router.get('/all', getAllInternships);

export default router;
