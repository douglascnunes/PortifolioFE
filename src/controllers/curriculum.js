import { Op } from 'sequelize';
import { validationResult as expValidatorRes } from 'express-validator';
import { controllerErrorObj } from '../util/error.js';
import Curriculum from '../models/Currriculum.js';
import sequelize from '../util/db.js';


export const getCurriculums = async (req, res, next) => {
  try {
    const curriculums = await Curriculum.findAll();

    console.log('[GET CURRICULUMS]');

    res.status(200).json({
      message: 'Curriculums fetched successfully!',
      curriculums,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const getActiveCurriculum = async (req, res, next) => {
  try {
    const activeCurriculum = await Curriculum.findOne({ where: { isActive: true } });

    if (!activeCurriculum) {
      return next(controllerErrorObj('No active curriculum found.', 404));
    }

    console.log('[GET ACTIVE CURRICULUM]');

    res.status(200).json({
      message: 'Active curriculum fetched successfully!',
      curriculum: activeCurriculum,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



export const activeCurriculum = async (req, res, next) => {
  const curriculumId = req.params.id;

  const transaction = await sequelize.transaction()

  try {
    const curriculumToActivate = await Curriculum.findByPk(curriculumId);
    if (!curriculumToActivate) {
      return next(controllerErrorObj('Curriculum not found.', 404));
    }


    await Curriculum.update({ isActive: false }, { where: {}, transaction });
    curriculumToActivate.isActive = true;
    await curriculumToActivate.save({ transaction });

    await transaction.commit();

    res.status(200).json({
      message: 'Curriculum activated successfully!',
      curriculum: curriculumToActivate,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



export const createCurriculum = async (req, res, next) => {
  const errors = expValidatorRes(req);
  if (!errors.isEmpty()) {
    return next(controllerErrorObj('Validation failed, entered data is incorrect.', 422, errors));
  };


  const { name } = req.body;
  const curriculumFile = req.file;

  const transaction = await sequelize.transaction()

  try {
    if (!curriculumFile) {
      return next(controllerErrorObj('No curriculum file provided.', 422));
    }

    const newCurriculum = await Curriculum.create({
      name,
      fileName: curriculumFile.filename,
      filePath: `/uploads/curriculums/${curriculumFile.filename}`,
      mimeType: curriculumFile.mimetype,
      isActive: false,
    }, { transaction });


    await Curriculum.update({ isActive: false }, { where: {}, transaction });
    newCurriculum.isActive = true;
    await newCurriculum.save({ transaction });

    await transaction.commit();



    console.log('[CREATE curriculum]');

    res.status(201).json({
      message: 'Curriculum created successfully!',
      curriculum: newCurriculum,
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




export const deleteCurriculum = async (req, res, next) => {
  const curriculumId = req.params.id;

  try {
    const curriculumToDelete = await Curriculum.findByPk(curriculumId);
    if (!curriculumToDelete) {
      return next(controllerErrorObj('Curriculum not found.', 404));
    }

    if (curriculumToDelete.isActive) {
      const newestCurriculum = await Curriculum.findOne({
        where: {
          id: { [Op.ne]: curriculumId }
        },
        order: [['createdAt', 'DESC']]
      });

      if (newestCurriculum) {
        newestCurriculum.isActive = true;
        await newestCurriculum.save();
      }
    }

    await curriculumToDelete.destroy();

    console.log('[DELETE CURRICULUM]', curriculumId);

    res.status(200).json({
      message: 'Curriculum deleted successfully!',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};