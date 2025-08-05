'use strict';
import { Model, InferAttributes, InferCreationAttributes, Sequelize } from 'sequelize';

export type UserTaskInstance = Model<InferAttributes<any>, InferCreationAttributes<any>> & {
  id: number;
  id_tg: string;
  task_id: number;
  status: 'pending' | 'checking' | 'completed';
  reward_issued: boolean;
};

export default (sequelize: Sequelize, DataTypes) => {
  class UserTask extends Model {
    declare id : number;
    declare id_tg: string;
    declare task_id: number;
    declare status: 'pending' | 'checking' | 'completed';
    declare reward_issued: boolean;

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id_tg', targetKey: 'id_tg' });
      this.belongsTo(models.Task, { foreignKey: 'task_id', targetKey: 'id' });
    }
  }

  UserTask.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tg: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_tg',
        },
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'checking', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
      },
      reward_issued: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserTask',
      tableName: 'UserTasks',
    }
  );

  return UserTask;
};
