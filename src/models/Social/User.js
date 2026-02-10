import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';


const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  icon: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});


export default User;