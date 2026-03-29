import { Op, where } from 'sequelize';
import { validationResult as expValidatorRes } from 'express-validator';
import { controllerErrorObj } from '../util/error.js';
import tag from '../models/Tag.js';
import sequelize from '../util/db.js';
import { deleteFile } from '../util/file.js';
import { TAG_TYPE } from '../util/enum.js';
import Tag from '../models/Tag.js';
import { normalizeSvg } from '../util/controller/tag.js';



export const getTags = async (req, res, next) => {
  try {
    const tags = await tag.findAll();

    console.log('[GET TAGS]');

    res.status(200).json({
      message: 'tags fetched successfully!',
      tags,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




export const getTechs = async (req, res, next) => {
  try {
    const techs = await tag.findAll({ where: { type: TAG_TYPE[0] } }); // TECH

    console.log('[GET TECHS]');

    res.status(200).json({
      message: 'techs fetched successfully!',
      tags: techs,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




export const getSkills = async (req, res, next) => {
  try {
    const skills = await tag.findAll({ where: { type: TAG_TYPE[1] } }); // SKILL

    console.log('[GET SKILLS]');

    res.status(200).json({
      message: 'skills fetched successfully!',
      tags: skills,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



export const createTag = async (req, res, next) => {
  const errors = expValidatorRes(req);
  if (!errors.isEmpty()) {
    return next(controllerErrorObj('Validation failed, entered data is incorrect.', 422, errors));
  }

  const { name, type, svg } = req.body;

  const transaction = await sequelize.transaction();

  try {
    if (!svg) {
      return next(controllerErrorObj('No SVG provided.', 422));
    }

    const newTag = await tag.create({
      name,
      type,
      svg: normalizeSvg(svg),
    }, { transaction });

    await transaction.commit();

    console.log('[CREATE TAG]');

    res.status(201).json({
      message: 'tag created successfully!',
      tag: newTag,
    });

  } catch (err) {
    await transaction.rollback();

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const updateTag = async (req, res, next) => {
  const errors = expValidatorRes(req);
  if (!errors.isEmpty()) {
    return next(controllerErrorObj('Validation failed, entered data is incorrect.', 422, errors));
  };

  const tagId = req.params.id;
  const name = req.body.name;
  const svg = req.body.svg;

  try {
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found.' });
    }

    tag.name = name;
    tag.svg = normalizeSvg(svg);

    await tag.save();

    console.log('[UPDATE tag]');

    res.status(200).json({
      message: 'Tag updated successfully!',
      tag: tag,
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



export const deleteTag = async (req, res, next) => {
  const tagId = req.params.id;

  try {
    const tagToDelete = await tag.findByPk(tagId);
    if (!tagToDelete) {
      return next(controllerErrorObj('tag not found.', 404));
    }

    await tagToDelete.destroy();

    console.log('[DELETE tag]', tagId);

    res.status(200).json({
      message: 'tag deleted successfully!',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};