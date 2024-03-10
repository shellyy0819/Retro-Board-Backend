'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Team, {
        targetKey: 'id',
        foreignKey: 'team_id'
      });
      this.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'user_id'
      });
    }
  }
  TeamUser.init(
    {
      team_id: {
        allowNull: false,
        type: DataTypes.UUID
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: 'TeamUser',
      tableName: 'teams_users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return TeamUser;
};
