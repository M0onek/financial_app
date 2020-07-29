import Sequelize from 'sequelize';
import db from '../config/database';

const User = db.define('user', {
  id: {
    type: Sequelize.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email address is not valid',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default User;
