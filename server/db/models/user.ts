'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    declare id_tg: string;
    declare username: string;
    declare investment_balance: string;
    declare farm_balance: string;
    declare level: number;
    declare clicks_today: number;
    declare clicks_total: number;
    declare bonus_locked: number;

    static associate(models) {}
  }

  User.init(
    {
      id_tg: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      investment_balance: {
        type: DataTypes.DECIMAL(30, 18),
        defaultValue: 1.0,
      },
      farm_balance: {
        type: DataTypes.DECIMAL(30, 18),
        defaultValue: 0.0,
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      clicks_today: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      clicks_total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bonus_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
