import { Sequelize } from 'sequelize';

const db = new Sequelize('financial_app', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

export default db;

// const db = new Sequelize('financial_app', 'szymon.krzywiecki', '', { <--------------- for mac
// const db = new Sequelize('financial_app', 'postgres', 'postgres', { <---------------- for windows
