import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export type DepositInstance = Model<InferAttributes<any>, InferCreationAttributes<any>> & {
  id: number;
  user_id_tg: string;
  amount: string;
  network: string;
  wallet_address: string;
};

export default (sequelize: Sequelize, DataTypes) => {
  class Deposit extends Model<InferAttributes<Deposit>, InferCreationAttributes<Deposit>> {
    declare id: number;
    declare user_id_tg: string;
    declare amount: string;
    declare network: string;
    declare wallet_address: string;

    static associate(models) {
      // Возможные связи, если надо
    }
  }

  Deposit.init(
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
      wallet_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Deposit',
      tableName: 'Deposits',
    }
  );

  return Deposit;
};
