import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { body } from 'express-validator';

import * as tagController from '../controllers/tag.js';
import { uploadTag } from '../middlewares/upload.js';
import { TAG_TYPE } from '../util/enum.js';


const router = express.Router();


router.get('/tags', tagController.getTags);

router.get('/skills', tagController.getSkills);



router.post(
  '/tag',
  isAuth,
  uploadTag.single('file'),
  [
    body('name')
      .trim()
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 40 }),
    body('type')
      .isString()
      .custom((value) => {
        if (!TAG_TYPE[1] === value) {
          throw new Error('Invalid importance value.');
        }
        return true;
      }),
  ],
  tagController.createTag
);


router.delete('/tag/:id', isAuth, tagController.deleteTag);



export default router;