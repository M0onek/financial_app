import { DataTypes } from 'sequelize';
import db from '../config/database';

const ExpenseCategories = db.define('expensecategory', {
  accountId: {
    type: DataTypes.UUIDV4,
    references: 'accounts',
    referencesKey: 'accountId',
  },
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

export default ExpenseCategories;
