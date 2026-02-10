import Sequelize from 'sequelize';
import sequelize from '../../util/db.js';


import { PROJECT_STATE } from '../../util/enum.js';
import Post from './Post.js';


const Project = sequelize.define('project', {
  deployUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  repoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  repoName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.ENUM(PROJECT_STATE),
    defaultValue: PROJECT_STATE[0],
    allowNull: false,
  },
});


Post.hasOne(Project, { onDelete: "CASCADE" });
Project.belongsTo(Post, { allowNull: false });


export default Project;