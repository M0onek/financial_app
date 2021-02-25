import { DataTypes } from 'sequelize';
import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Account from './Account';
import Expense from './Expense';

const ExpenseCategory = db.define('expensecategory', {
  // accountId: {
  //   type: DataTypes.UUIDV4,
  //   references: 'Account',
  //   referencesKey: 'accountId',
  // },
  categoryId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(50),
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

// ExpenseCategory.belongsTo(Account);//, { foreignKey: 'accountId' });

export default ExpenseCategory;
