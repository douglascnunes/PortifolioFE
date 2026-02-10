import express from 'express';
import { body } from 'express-validator';


import * as authController from '../controllers/auth.js';


const router = express.Router();


router.post('/secretlogin', [
  // body('email', 'Senha ou Email* inválido.')
  //   .custom((email) => {
  //     return true;
  //   })
  //   .trim()
  //   .normalizeEmail()
  //   .isEmail(),
  body('password', 'Senha* ou Email inválido.')
    .trim()
    .isLength({ min: 4, max: 30 }),
], authController.secretLogin);


export default router;