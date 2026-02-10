import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';

import Tag from '../Tag.js';
import Post from './Post.js';


import { TAG_RELATIONSHIP } from '../../util/enum.js';


const PostTag = sequelize.define('posttag', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  relationshipType: {
    type: Sequelize.ENUM(TAG_RELATIONSHIP),
    defaultValue: TAG_RELATIONSHIP[2], // PROJECT
    allowNull: false,
  },
},
  { timestamps: false }
);


Post.belongsToMany(Tag, { through: PostTag });
Tag.belongsToMany(Post, { through: PostTag });


export default PostTag;
