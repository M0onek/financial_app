import Sequelize from 'sequelize';
import db from '../config/database';

const Income = db.define('income', {
  incomeId: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  accountId: {
    type: Sequelize.UUIDV4,
    references: 'accounts',
    referencesKey: 'accountId',
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    required: true,
  },
  category: {
    type: Sequelize.UUIDV4,
    references: 'incomeCategory',
    referencesKey: 'categoryId',
  },
  comment: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

export default Income;
