import { DataTypes } from 'sequelize';
import db from '../config/database';
import Account from './Account';
import IncomeCategory from './IncomeCategory';

const Income = db.define('income', {
  incomeId: {
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
  //   references: 'IncomeCategory',
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

// Income.belongsTo(Account);//, { foreignKey: 'accountId' });
// Income.hasOne(IncomeCategory);

export default Income;
