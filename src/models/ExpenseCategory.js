import { DataTypes } from 'sequelize';
import db from '../config/database';
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
