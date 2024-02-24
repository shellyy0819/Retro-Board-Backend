'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Team, {
        through: models.TeamUser,
        as: 'team_user',
        foreignKey: 'user_id',
        otherKey: 'team_id',
        targetKey: 'id'
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email_id: DataTypes.STRING,
      test: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return User;
};
