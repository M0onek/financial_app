import { Sequelize } from 'sequelize';

const db = new Sequelize('financial_app', 'szymon.krzywiecki', '', {
  host: 'localhost',
  dialect: 'postgres',
});

export default db;
