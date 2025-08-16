import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
  class Withdrawal extends Model<InferAttributes<Withdrawal>, InferCreationAttributes<Withdrawal>> {
    declare id: number;
    declare user_id_tg: string;
    declare amount: string;
    declare network: string;
    declare wallet_address: string;
    declare status: 'pending' | 'paid' | 'rejected';
    declare hash: string | null;

    static associate(models) {
      // Возможные связи, если надо
    }
  }

  Withdrawal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id_tg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(30, 18),
        allowNull: false,
      },
      network: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      wallet_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'rejected'),
        defaultValue: 'pending',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Withdrawal',
      tableName: 'Withdrawals',
    }
  );

  return Withdrawal;
};
