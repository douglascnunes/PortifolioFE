import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';

import Tag from './../Tag.js';
import Experience from './Experience.js';


import { TAG_RELATIONSHIP } from '../../util/enum.js';


const ExperienceTag = sequelize.define('experiencetag', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  relationshipType: {
    type: Sequelize.ENUM(TAG_RELATIONSHIP),
    defaultValue: TAG_RELATIONSHIP[0], // STUDY
    allowNull: false,
  },
},
  { timestamps: false }
);


Experience.belongsToMany(Tag, { through: ExperienceTag });
Tag.belongsToMany(Experience, { through: ExperienceTag });


export default ExperienceTag;
