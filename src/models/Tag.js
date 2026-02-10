import Sequelize from 'sequelize';
import sequelize from '../util/db.js';


import { TAG_TYPE } from '../util/enum.js';


const Tag = sequelize.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  icon: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(TAG_TYPE),
    allowNull: false,
  }
});


export default Tag;