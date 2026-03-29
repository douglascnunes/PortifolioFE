import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { body } from 'express-validator';

import * as tagController from '../controllers/tag.js';
import { uploadTag } from '../middlewares/upload.js';
import { TAG_TYPE } from '../util/enum.js';

const router = express.Router();


router.get('/tags', tagController.getTags);

router.get('/techs', tagController.getTechs);

router.get('/skills', tagController.getSkills);


router.post('/tag',
  isAuth,
  [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 40 }),

    body('type')
      .isString()
      .custom((value) => {
        if (!TAG_TYPE.includes(value)) {
          throw new Error('Invalid tag type.');
        }
        return true;
      }),

    body('svg')
      .isString()
      .notEmpty()
      .custom((value) => {
        if (!value.includes('<svg') || !value.includes('</svg>')) {
          throw new Error('Invalid SVG format.');
        }
        if (value.includes('<script')) {
          throw new Error('SVG cannot contain scripts.');
        }
        return true;
      }),
  ],
  tagController.createTag
);


router.put('/tag/:id',
  isAuth,
  [
    body('name')
      .optional()
      .trim()
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 40 }),

    body('type')
      .optional()
      .isString()
      .custom((value) => {
        if (!TAG_TYPE.includes(value)) {
          throw new Error('Invalid tag type.');
        }
        return true;
      }),
    body('svg')
      .optional()
      .isString()
      .notEmpty()
      .custom((value) => {
        if (!value.includes('<svg') || !value.includes('</svg>')) {
          throw new Error('Invalid SVG format.');
        }
        if (value.includes('<script')) {
          throw new Error('SVG cannot contain scripts.');
        }
        return true;
      }),
  ],
  tagController.updateTag
);

router.delete('/tag/:id', isAuth, tagController.deleteTag);



export default router;