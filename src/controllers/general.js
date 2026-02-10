import { Op, fn, col } from 'sequelize';


import Experience from "../models/Experience/Experience.js";
import ExperienceTag from "../models/Experience/ExperienceTag.js";
import Study from "../models/Experience/Study.js";
import Recommendation from "../models/Social/Recommendation.js";
import User from '../models/Social/User.js';
import Tag from '../models/Tag.js';


import { GRADUATION } from "../util/enum.js";
import PostTag from '../models/Post/PostTag.js';
import Post from '../models/Post/Post.js';
import Project from '../models/Post/Project.js';


export const getResume = async (req, res, next) => {
  let graduation, recommendations, tagsWithCounts, projetcs;

  try {
    graduation = await Experience.findOne({
      where: {
        orgName: GRADUATION[0], // IFES
      },
      include: [
        {
          model: Tag,
          required: true,
          through: { attributes: [] },
        },
        {
          model: Study,
          required: true,

        },
      ]
    });

    recommendations = await Recommendation.findAll({
      include: [
        {
          model: User,
          required: true,
        }
      ]
    });


    const experienceCounts = await ExperienceTag.findAll({
      attributes: [
        'tagId', 'relationshipType',
        [fn('COUNT', col('tagId')), 'count'],
      ],
      group: ['tagId', 'relationshipType'],
      raw: true,
    });

    const postCounts = await PostTag.findAll({
      attributes: [
        'tagId', 'relationshipType',
        [fn('COUNT', col('tagId')), 'count'],
      ],
      group: ['tagId', 'relationshipType'],
      raw: true,
    });

    const tags = await Tag.findAll({ raw: true });

    const countsMap = {};

    [...experienceCounts, ...postCounts].forEach(item => {
      if (!countsMap[item.tagId]) {
        countsMap[item.tagId] = {
          STUDY: 0,
          WORK: 0,
          PROJECT: 0,
          BLOG: 0,
        };
      }

      countsMap[item.tagId][item.relationshipType] = Number(item.count);
    });

    tagsWithCounts = tags.map(tag => ({
      ...tag,
      counts: countsMap[tag.id] || {
        STUDY: 0,
        WORK: 0,
        PROJECT: 0,
        BLOG: 0,
      },
    }));

    projetcs = Post.findAll({
      include: [
        {
          model: Tag,
          required: true,
          through: { attributes: [] },
        },
        {
          model: Project,
          require: true,
        }
      ]
    });

    console.log('[GET RESUME]');
    res.status(200).json({
      message: 'Fetched Resume successfully.',
      resume: {
        graduation: graduation,
        recommendations: recommendations,
        tags: tagsWithCounts,
        projects: projetcs
      }
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};