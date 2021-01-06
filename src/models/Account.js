import { DataTypes } from 'sequelize';
import db from '../config/database';

const Account = db.define('account', {
  userId: {
    type: DataTypes.UUIDV4,
    references: 'users',
    referencesKey: 'userId',
  },
  accountId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

export default Account;
