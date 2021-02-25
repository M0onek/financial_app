import { DataTypes } from 'sequelize';
import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const Account = db.define('account', {
  // userId: {
  //   type: DataTypes.UUIDV4,
  //   references: 'User',
  //   referencesKey: 'userId',
  // },
  accountId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: DataTypes.UUIDV4,
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

export default Account;
