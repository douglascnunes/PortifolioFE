import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { body } from 'express-validator';

import * as curriculumController from '../controllers/curriculum.js';
import { uploadCurriculum } from '../middlewares/upload.js';


const router = express.Router();


router.get('/curriculums', curriculumController.getCurriculums);


router.get('/curriculum/active', curriculumController.getActiveCurriculum);


router.patch('/curriculum/:id/active', isAuth, curriculumController.activeCurriculum);


router.post(
  '/curriculum',
  isAuth,
  uploadCurriculum.single('file'),
  [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 40 }),
  ],
  curriculumController.createCurriculum
);


router.delete('/curriculum/:id', isAuth, curriculumController.deleteCurriculum);



export default router;