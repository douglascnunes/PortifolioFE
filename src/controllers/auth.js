import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult as expValidatorRes } from 'express-validator';
import { controllerErrorObj } from '../util/error.js';

import User from '../models/Social/User.js';


export const secretLogin = async (req, res, next) => {
  const errors = expValidatorRes(req);
  if (!errors.isEmpty()) {
    return next(controllerErrorObj('Validation failed.', 422, errors));
  }

  const password = req.body.password;
  let loadedUser;

  try {
    loadedUser = await User.findOne({ where: { id: 1 } });

    if (!loadedUser) {
      return next(controllerErrorObj('Admin account not found.', 401, errors));
    };

    // const doMatch = await bcrypt.compare(password, loadedUser.password);
    const doMatch = password === loadedUser.password;
    if (!doMatch) {
      return next(controllerErrorObj('Invalid password.', 401, errors));
    }

    const token = jwt.sign({
      email: loadedUser.email,
      userId: loadedUser.id.toString(),
    }, process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    console.log(`[LOGIN] User < ${loadedUser.name} > (id:${loadedUser.id}) logged in.`);
    res.status(200).json({
      token: token,
      userId: loadedUser.id.toString(),
    });

  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}