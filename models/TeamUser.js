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
    }
  }
  TeamUser.init(
    {
      team_id: DataTypes.UUID,
      user_id: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'TeamUser',
      tableName: 'team_user',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return TeamUser;
};
