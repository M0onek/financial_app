import { DataTypes } from 'sequelize';
import db from '../config/database';

const Expense = db.define('expense', {
  expenseId: {
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
    references: 'expenseCategory',
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

export default Expense;
