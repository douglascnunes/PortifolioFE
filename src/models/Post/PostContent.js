import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';
import { CONTENT } from '../../util/enum.js';



const PostContent = sequelize.define('postcontent', {
  type: {
    type: Sequelize.ENUM(CONTENT),
    defaultValue: CONTENT[0],
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});


export default PostContent;