import Sequelize from 'sequelize';
import sequelize from '../util/db.js';


import { TAG_TYPE } from '../util/enum.js';


const Tag = sequelize.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  type: {
    type: Sequelize.ENUM(TAG_TYPE),
    allowNull: false,
  },

  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  filePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  mimeType: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'image/svg+xml',
  },
});


export default Tag;