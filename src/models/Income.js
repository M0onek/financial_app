import { DataTypes } from 'sequelize';
import db from '../config/database';

const Income = db.define('income', {
  incomeId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  accountId: {
    type: DataTypes.UUIDV4,
    references: 'accounts',
    referencesKey: 'accountId',
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    required: true,
  },
  categoryId: {
    type: DataTypes.UUIDV4,
    references: 'incomeCategory',
    referencesKey: 'categoryId',
  },
  comment: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

export default Income;
