import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';



const Experience = sequelize.define('experience', {
  initialDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  finalDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  icon: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  orgName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});


export default Experience;