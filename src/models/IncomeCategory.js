import { DataTypes } from 'sequelize';
import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import Account from './Account';
import moment from 'moment';

const IncomeCategory = db.define('incomecategory', {
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

// IncomeCategory.belongsTo(Account);//, { foreignKey: 'accountId' });

export default IncomeCategory;
