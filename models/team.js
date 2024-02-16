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
      // define association here
      team.hasMany(models.user, {
        as: 'team_user_id',
        foreignKey: 'userId',
        sourceKey: 'userId'
      });
    }
  }
  team.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'team',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return team;
};
