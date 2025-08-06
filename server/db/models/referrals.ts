import { InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export type ReferralInstance = Model<InferAttributes<any>, InferCreationAttributes<any>> & {
  id: number;
  inviter_id_tg: string;
  invited_id_tg: string;
};

export default (sequelize: Sequelize, DataTypes) => {
  class Referral extends Model {
    declare id: number;
    declare inviter_id_tg: string;
    declare invited_id_tg: string;

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'inviter_id_tg',
        targetKey: 'id_tg',
      });
    }
  }

  Referral.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      inviter_id_tg: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_tg',
        },
      },
      invited_id_tg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id_tg',
        },
      },
    },
    {
      sequelize,
      modelName: 'Referral',
      tableName: 'Referrals',
    }
  );

  return Referral;
};
