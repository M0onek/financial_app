import { DataTypes } from 'sequelize';
// import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import Account from './Account';

const User = db.define('user', {
  userId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
    // validate: {
    //   isAlphanumeric: {
    //     msg: 'Provide name with letters and numbers only.',
    //   },
    // },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, //sprawdzic
    // validate: {
    //   isValidEmail(value) {
    //     if (!validator.isEmail(value)) throw new Error('Provide correct email.')
    //   },
    // },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    trim: true,
    // validate: {
    //   is: {
    //     args: [["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]],
    //     msg: 'Provide secure password.'
    //   },
    // },
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  tokens: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: [],
    required: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

User.prototype.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ userId: user.userId.toString() }, 'sec155');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

User.prototype.toJSON = function () {
  const user = this;
  const userObject = user.dataValues;

  userObject.password = undefined;
  userObject.tokens = undefined;
  userObject.accounts = undefined;
  return userObject;
};

User.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ 
    where: {
      email
    },
    include: Account
  });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 8);
  // eslint-disable-next-line no-param-reassign
  user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPassword;
  }
});

export default User;
