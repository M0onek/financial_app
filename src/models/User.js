import { DataTypes } from 'sequelize';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';

const User = db.define('user', {
  userId: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  tokens: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    required: true,
  },
  accounts: {
    type: DataTypes.VIRTUAL //tutaj skonczylem 16:00 kursu 114
  }
});

User.prototype.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ userId: user.userId.toString() }, 'sec155');

  user.tokens = [
    ...user.tokens,
    token,
  ];
  await user.save();

  return token;
};

User.prototype.toJSON = function () {
  const user = this;
  const userObject = user.dataValues;

  userObject.password = undefined;
  userObject.tokens = undefined;
  return userObject;
};

User.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ where: { email } });

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
