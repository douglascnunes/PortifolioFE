import express from 'express';

import * as generalController from '../controllers/general.js';


const router = express.Router();

router.get('/general', generalController.getResume);

export default router;