import Sequelize from 'sequelize';
import db from '../config/database';

const IncomeCategories = db.define('incomeCategory', {
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
});

export default IncomeCategories;
