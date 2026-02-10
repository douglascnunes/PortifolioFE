import Sequelize from 'sequelize';
import sequelize from '../util/db.js';


const Curriculum = sequelize.define('curriculum', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
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

  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default Curriculum;
