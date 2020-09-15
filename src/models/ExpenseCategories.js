import Sequelize from 'sequelize';
import db from '../config/database';

const ExpenseCategories = db.define('expenseCategory', {
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

export default ExpenseCategories;
