import { validationResult as expValidatorRes } from 'express-validator';
import { controllerErrorObj } from '../util/error.js';


import Recommendation from "../models/Social/Recommendation.js";


export const getRecommendations = async (req, res, next) => {

  try {
    const recommendation = await Recommendation.findAll();

    console.log('[GET recommendationS]');
    res.status(200).json({
      message: 'Fetched Recommendations successfully.',
      recommendations: recommendation,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};


export const createRecommendation = async (req, res, next) => {
  const errors = expValidatorRes(req);
  if (!errors.isEmpty()) {
    return next(controllerErrorObj('Validation failed, entered data is incorrect.', 422, errors));
  };

  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;

  try {
    const newRecommendation = await Recommendation.create({
      title: title,
      author: author,
      description: description,
      userId: req.userId,
    });

    console.log('[CREATE recommendation]');
    res.status(201).json({
      message: 'Recommendation created successfully!',
      recommendation: newRecommendation,
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



export const updateRecommendation = async (req, res, next) => {
  const errors = expValidatorRes(req);
  if (!errors.isEmpty()) {
    return next(controllerErrorObj('Validation failed, entered data is incorrect.', 422, errors));
  };

  const recommendationId = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;

  try {
    const recommendation = await Recommendation.findByPk(recommendationId);

    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found.' });
    }

    recommendation.title = title;
    recommendation.author = author;
    recommendation.description = description;

    await recommendation.save();

    console.log('[UPDATE recommendation]');
    res.status(200).json({
      message: 'Recommendation updated successfully!',
      recommendation: recommendation,
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const deleteRecommendation = async (req, res, next) => {
  const recommendationId = req.params.id;
  
  try {
    const recommendation = await Recommendation.findByPk(recommendationId);

    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found.' });
    }

    await recommendation.destroy();

    console.log('[DELETE recommendation]');

    res.status(200).json({
      message: 'Recommendation deleted successfully!',
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};