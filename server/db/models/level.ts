import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
  class Level extends Model<InferAttributes<Level>, InferCreationAttributes<Level>> {
    declare level: number;
    declare price: string; // DECIMAL → string (в JS)
    declare percent: number;

    static associate(models) {
      // Возможные связи, если надо
    }
  }

  Level.init(
    {
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.DECIMAL(30, 18),
        allowNull: false,
      },
      percent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Level',
      tableName: 'Levels',
    }
  );

  return Level;
};
