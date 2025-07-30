'use strict';
import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export type UserInstance = Model<InferAttributes<any>, InferCreationAttributes<any>> & {
  id_tg: string;
  username: string;
  level: number;
  investment_balance: string;
  farm_balance: string;
  clicks_today: number;
  clicks_today_reset_at: Date;
  farm_balance_reset_at: Date;
};

export default (sequelize: Sequelize, DataTypes) => {
  class User extends Model {
    declare id_tg: string;
    declare username: string;
    declare investment_balance: string;
    declare farm_balance: string;
    declare farm_balance_reset_at: Date;
    declare level: number;
    declare clicks_today: number;
    declare clicks_today_reset_at: Date;
    declare bonus_locked: boolean;

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
        allowNull: false,
      },
      farm_balance: {
        type: DataTypes.DECIMAL(30, 18),
        defaultValue: 0.0,
        allowNull: false,
      },
      farm_balance_reset_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      clicks_today: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      clicks_today_reset_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      bonus_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
