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

  svg: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  },
});


export default Tag;