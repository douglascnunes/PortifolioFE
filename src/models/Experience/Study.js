import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';
import Experience from './Experience.js';



const Study = sequelize.define('study', {
  title: {
    type: Sequelize.DATE,
    allowNull: false
  },
  acessUrl: {
    type: Sequelize.DATE,
    allowNull: false
  },

});


Experience.hasOne(Study, { onDelete: "CASCADE" });
Study.belongsTo(Experience, { allowNull: false });


export default Study;