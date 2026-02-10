import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';
import Comment from './Comment.js';


const CommentsSection = sequelize.define('commentssection', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
},
  { timestamps: false }
);


CommentsSection.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(CommentsSection, { allowNull: false });


export default CommentsSection;