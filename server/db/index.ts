import { DataTypes, Sequelize } from 'sequelize';

import defineUserModel from './models/user';

const sequelize = new Sequelize(process.env.NITRO_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});
const db = async (): Promise<Sequelize> => {
  try {
    await sequelize.authenticate();
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

const models = {
  User: defineUserModel(sequelize, DataTypes),
};

export { db, models };
