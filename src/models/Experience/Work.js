import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';
import Experience from './Experience.js';



const Work = sequelize.define('work', {
  position: {
    type: Sequelize.STRING,
    allowNull: false
  },
  periodType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
});


Experience.hasOne(Work, { onDelete: "CASCADE" });
Work.belongsTo(Experience, { allowNull: false });


export default Work;