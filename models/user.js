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
      name: { type: DataTypes.STRING, allowNull: false },
      email_id: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
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
