import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';


import User from './User.js';


const Recommendation = sequelize.define('recommendation', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


User.hasMany(Recommendation, { onDelete: 'CASCADE' });
Recommendation.belongsTo(User, { allowNull: false });


export default Recommendation;