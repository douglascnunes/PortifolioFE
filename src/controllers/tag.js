import { Op, where } from 'sequelize';
import { validationResult as expValidatorRes } from 'express-validator';
import { controllerErrorObj } from '../util/error.js';
import tag from '../models/Tag.js';
import sequelize from '../util/db.js';
import { deleteFile } from '../util/file.js';
import { TAG_TYPE } from '../util/enum.js';



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


export const getSkills = async (req, res, next) => {
  try {
    const skills = await tag.findAll({ where: { type: TAG_TYPE[1] } });

    const formattedSkills = skills.map(skill => {
      const data = skill.toJSON();

      return {
        ...data,
        fileUrl: `http://localhost:3000/uploads/tag/${data.fileName}`
      };
    });

    console.log('[GET SKILLS]');

    res.status(200).json({
      message: 'skills fetched successfully!',
      skills: formattedSkills,
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
  };


  const { name, type } = req.body;
  const tagFile = req.file;

  const transaction = await sequelize.transaction()

  try {
    if (!tagFile) {
      return next(controllerErrorObj('No tag file provided.', 422));
    }

    const newTag = await tag.create({
      name,
      type,
      fileName: tagFile.filename,
      filePath: `src/uploads/tag/${tagFile.filename}`,
      mimeType: tagFile.mimetype,
    }, { transaction });

    await transaction.commit();

    console.log('[CREATE TAG]');

    res.status(201).json({
      message: 'tag created successfully!',
      tag: newTag,
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
  console.log(tagId)

  try {
    const tagToDelete = await tag.findByPk(tagId);
    if (!tagToDelete) {
      return next(controllerErrorObj('tag not found.', 404));
    }

    deleteFile(tagToDelete.filePath);

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