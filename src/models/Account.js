import Sequelize from 'sequelize';
import db from '../config/database';

const Account = db.define('account', {
  userId: {
    type: Sequelize.UUIDV4,
    references: 'users',
    referencesKey: 'userId',
  },
  accountId: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

export default Account;
