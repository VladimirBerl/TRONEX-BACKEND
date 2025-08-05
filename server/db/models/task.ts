'use strict';
import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
  class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    declare id: number;
    declare title: string;
    declare reward: string;
    declare url: string;
    declare imageFileId: string;
    declare imageUrl: string;
  }

  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reward: {
        type: DataTypes.DECIMAL(30, 18),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageFileId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'Tasks',
    }
  );

  return Task;
};
