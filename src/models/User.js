import Sequelize from 'sequelize';
import validator from 'validator';
import db from '../config/database';

const User = db.define('user', {
  userId: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid');
    },
  },
  password: {
    type: Sequelize.STRING,
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

export default User;
