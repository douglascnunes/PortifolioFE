import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';


const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


Comment.hasMany(Comment, {
  as: 'replies',
  foreignKey: 'parentId',
});

Comment.belongsTo(Comment, {
  as: 'parent',
  foreignKey: 'parentId',
});



export default Comment;