import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { body } from 'express-validator';

import * as recommendationController from '../controllers/recommendation.js';


const router = express.Router();

router.get('/recommendations', recommendationController.getRecommendations);

router.post('/recommendation', isAuth, [
  body('title')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 40 }),
  body('author')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 40 }),
  body('description')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 10, max: 255 }),
],
  recommendationController.createRecommendation);


router.put('/recommendation/:id', isAuth, [
  body('title')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 20 }),
  body('author')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 20 }),
  body('description')
    .trim()
    .isString()
    .notEmpty()
    .isLength({ min: 10, max: 200 }),
],
  recommendationController.updateRecommendation);


router.delete('/recommendation/:id', isAuth, recommendationController.deleteRecommendation);



  
export default router;