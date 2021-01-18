import { DataTypes } from 'sequelize';
import db from '../config/database';
import Account from './Account';
import ExpenseCategory from './ExpenseCategory';

const Expense = db.define('expense', {
  expenseId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  // accountId: {
  //   type: DataTypes.UUIDV4,
  //   references: 'Account',
  //   referencesKey: 'accountId',
  // },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    required: true,
  },
  // categoryId: {
  //   type: DataTypes.UUIDV4,
  //   references: 'ExpenseCategory',
  //   referencesKey: 'categoryId',
  // },
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

// Expense.belongsTo(Account);//, { foreignKey: 'accountId' });
// Expense.hasOne(ExpenseCategory);

export default Expense;
