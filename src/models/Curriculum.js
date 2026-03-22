import Sequelize from 'sequelize';
import sequelize from '../util/db.js';


const Curriculum = sequelize.define('curriculum', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  filePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  mimeType: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'application/pdf',
  },

}, {
  timestamps: true,
});

export default Curriculum;
