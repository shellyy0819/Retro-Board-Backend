'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Board, {
        as: 'boards',
        sourceKey: 'id',
        foreignKey: 'team_id'
      });
      this.belongsToMany(models.User, {
        through: models.TeamUser,
        as: 'team_user',
        foreignKey: 'team_id',
        otherKey: 'user_id',
        targetKey: 'id'
      });
    }
  }
  team.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Team',
      tableName: 'teams',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return team;
};
