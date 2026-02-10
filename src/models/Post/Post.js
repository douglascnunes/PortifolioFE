import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';


import PostContent from './PostContent.js';
import CommentsSection from '../Social/CommentsSection.js';
import Tag from '../Tag.js';


const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sumary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coverImage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


Post.hasMany(PostContent, { onDelete: 'CASCADE' });
PostContent.belongsTo(Post, { allowNull: false });

Post.hasOne(CommentsSection, { onDelete: "CASCADE" });
CommentsSection.belongsTo(Post, { allowNull: false });




export default Post;