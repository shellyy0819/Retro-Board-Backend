'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.team, {
        through: 'user_team'
      });
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'user',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return user;
};
