import Sequelize from 'sequelize';
import db from '../config/database';

const IncomeCategory = db.define('incomecategory', {
  accountId: {
    type: Sequelize.UUIDV4,
    references: 'accounts',
    referencesKey: 'accountId',
  },
  categoryId: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    required: true,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

export default IncomeCategory;
