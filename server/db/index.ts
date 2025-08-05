import { DataTypes, Sequelize } from 'sequelize';

import defineUserModel from './models/user';
import defineLevelModel from './models/level';
import defineWithdrawalModel from './models/withdrawal';
import defineTaskModel from './models/task';
import defineUserTaskModel from './models/user-task';

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
  Level: defineLevelModel(sequelize, DataTypes),
  Withdrawal: defineWithdrawalModel(sequelize, DataTypes),
  Task: defineTaskModel(sequelize, DataTypes),
  UserTask: defineUserTaskModel(sequelize, DataTypes),
};

Object.values(models).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});


export { db, models };
